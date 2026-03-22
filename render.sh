#!/usr/bin/env bash
# ============================================================
# North Star Solutions — Remotion Batch Render Script
# ============================================================
# Usage:
#   ./render.sh                      # Render all compositions with default config
#   ./render.sh --config variation-tax-season  # Render a specific variation
#   ./render.sh --comp Ad30s-Feed    # Render a specific composition only
#   ./render.sh --all-variations     # Render ALL variations × ALL compositions
# ============================================================

set -euo pipefail

VARIATIONS_FILE="src/config/variations.json"
DEFAULT_BRAND='{
  "bgDark": "#0E1116",
  "cardBg": "#161B22",
  "accentBlue": "#5B7C99",
  "goldHighlight": "#D4A843",
  "white": "#FFFFFF",
  "textSecondary": "#8B949E"
}'

COMPOSITIONS=("Ad30s-Feed" "Ad30s-Story" "Ad15s-Feed" "Ad15s-Story")
SELECTED_CONFIG=""
SELECTED_COMP=""
ALL_VARIATIONS=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --config) SELECTED_CONFIG="$2"; shift 2 ;;
    --comp)   SELECTED_COMP="$2"; shift 2 ;;
    --all-variations) ALL_VARIATIONS=true; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

render_composition() {
  local comp_id="$1"
  local variation_id="$2"
  local props_json="$3"

  local output_dir="out/${variation_id}"
  mkdir -p "$output_dir"
  local output_file="${output_dir}/${comp_id}.mp4"

  echo "🎬 Rendering ${comp_id} [${variation_id}] → ${output_file}"

  npx remotion render src/index.ts "$comp_id" "$output_file" \
    --props="$props_json" \
    --codec=h264
}

build_props() {
  local variation_json="$1"
  # Merge brand colors into the config prop
  echo "{\"config\": $(echo "$variation_json" | jq ". + {brand: $DEFAULT_BRAND}" | jq 'del(.id)')}"
}

if $ALL_VARIATIONS; then
  # Render every variation × every composition
  variation_count=$(jq length "$VARIATIONS_FILE")
  for ((i=0; i<variation_count; i++)); do
    variation=$(jq ".[$i]" "$VARIATIONS_FILE")
    vid=$(echo "$variation" | jq -r '.id')
    props=$(build_props "$variation")
    for comp in "${COMPOSITIONS[@]}"; do
      render_composition "$comp" "$vid" "$props"
    done
  done
elif [[ -n "$SELECTED_CONFIG" ]]; then
  variation=$(jq ".[] | select(.id == \"$SELECTED_CONFIG\")" "$VARIATIONS_FILE")
  if [[ -z "$variation" ]]; then
    echo "Error: Variation '$SELECTED_CONFIG' not found in $VARIATIONS_FILE"
    exit 1
  fi
  props=$(build_props "$variation")
  comps=("${COMPOSITIONS[@]}")
  [[ -n "$SELECTED_COMP" ]] && comps=("$SELECTED_COMP")
  for comp in "${comps[@]}"; do
    render_composition "$comp" "$SELECTED_CONFIG" "$props"
  done
else
  # Default: render first variation (default) for all or selected composition
  variation=$(jq '.[0]' "$VARIATIONS_FILE")
  vid=$(echo "$variation" | jq -r '.id')
  props=$(build_props "$variation")
  comps=("${COMPOSITIONS[@]}")
  [[ -n "$SELECTED_COMP" ]] && comps=("$SELECTED_COMP")
  for comp in "${comps[@]}"; do
    render_composition "$comp" "$vid" "$props"
  done
fi

echo ""
echo "✅ Rendering complete! Output files are in the ./out/ directory."
