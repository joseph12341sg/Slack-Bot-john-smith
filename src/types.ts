export interface CaseStudyConfig {
  clientName: string;
  clientLogo: string;
  location: string;
  niche: string;
  challenges: string[];
  solutionPillars?: {
    title: string;
    description?: string;
  }[];
  results: {
    newClients: number;
    additionalRevenue: number;
    paybackMonths: number;
  };
  testimonial: {
    quote: string;
    name: string;
    firm: string;
  };
  backgroundMusic?: string;
}

export type AspectRatio = "landscape" | "square";
