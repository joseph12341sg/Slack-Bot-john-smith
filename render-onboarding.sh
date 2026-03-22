#!/usr/bin/env bash
# ============================================================
# North Star Solutions — Onboarding Video Render Script
# ============================================================
# Usage:
#   ./render-onboarding.sh client-config.json
#   ./render-onboarding.sh src/onboarding/config/clientConfig.json
#   ./render-onboarding.sh --batch clients/       # Render all JSON files in directory
# ============================================================

set -euo pipefail

DEFAULT_BRAND='{
  "bgDark": "#0E1116",
  "cardBg": "#161B22",
  "accentBlue": "#5B7C99",
  "goldHighlight": "#D4A843",
  "white": "#FFFFFF",
  "textSecondary": "#8B949E"
}'

BATCH_MODE=false
INPUT_PATH=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --batch) BATCH_MODE=true; INPUT_PATH="$2"; shift 2 ;;
    *) INPUT_PATH="$1"; shift ;;
  esac
done

if [[ -z "$INPUT_PATH" ]]; then
  echo "Usage: ./render-onboarding.sh <client-config.json>"
  echo "       ./render-onboarding.sh --batch <directory-of-configs/>"
  exit 1
fi

render_client() {
  local config_file="$1"
  local client_json
  client_json=$(cat "$config_file")

  local client_name
  client_name=$(echo "$client_json" | jq -r '.clientName')
  local safe_name
  safe_name=$(echo "$client_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')

  local output_dir="out/onboarding"
  mkdir -p "$output_dir"
  local output_file="${output_dir}/${safe_name}-welcome.mp4"

  local props_json
  props_json=$(jq -n --argjson client "$client_json" --argjson brand "$DEFAULT_BRAND" \
    '{ client: $client, brand: $brand }')

  echo "🎬 Rendering onboarding video for: $client_name"
  echo "   Config: $config_file"
  echo "   Output: $output_file"
  echo ""

  npx remotion render src/index.ts "Onboarding-Welcome" "$output_file" \
    --props="$props_json" \
    --codec=h264

  echo ""
  echo "✅ Done: $output_file"
  echo ""
}

if $BATCH_MODE; then
  if [[ ! -d "$INPUT_PATH" ]]; then
    echo "Error: '$INPUT_PATH' is not a directory"
    exit 1
  fi

  count=0
  for config_file in "$INPUT_PATH"/*.json; do
    [[ -f "$config_file" ]] || continue
    render_client "$config_file"
    count=$((count + 1))
  done

  echo "========================================="
  echo "✅ Batch complete! Rendered $count videos."
  echo "   Output: ./out/onboarding/"
  echo "========================================="
else
  if [[ ! -f "$INPUT_PATH" ]]; then
    echo "Error: '$INPUT_PATH' not found"
    exit 1
  fi
  render_client "$INPUT_PATH"
fi
