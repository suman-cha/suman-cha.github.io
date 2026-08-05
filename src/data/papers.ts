export interface PaperLink {
  label: string;
  href: string;
}

export interface ScholarPaper {
  title: string;
  authors: string;
  year: number;
  venue: string;
  status?: string;
  distinction?: string;
  links?: PaperLink[];
}

export const scholarPapers: ScholarPaper[] = [
  {
    title: 'FUSE: Feature-Wise Unified Specialization with Cross-Column Exchange for Mixed-Type Tabular Flow Matching',
    authors: 'Suman Cha et al.',
    year: 2027,
    venue: 'AAAI Conference on Artificial Intelligence',
    status: 'Submitted to AAAI 2027',
  },
  {
    title: 'Real-Time Win Probability Prediction in Battle Royale Games via Survival Analysis',
    authors: 'Suman Cha et al.',
    year: 2027,
    venue: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining · ADS Track',
    status: 'Submitted to KDD 2027 ADS Track',
  },
  {
    title: 'More Permutations Do Not Always Increase Power: Non-monotonicity in Monte Carlo Permutation Tests',
    authors: 'Suman Cha, Seongchan Lee, Antonin Schrab, Ilmun Kim',
    year: 2026,
    venue: 'Statistical Science',
    status: 'Submitted',
    distinction: 'Q1 journal',
    links: [
      { label: 'arXiv:2605.03886', href: 'https://arxiv.org/abs/2605.03886' },
    ],
  },
  {
    title: 'Learning Majority-to-Minority Transformations with MMD and Triplet Loss for Imbalanced Classification',
    authors: 'Suman Cha, Hyunjoong Kim',
    year: 2026,
    venue: 'Information Sciences · 123929',
    status: 'Published',
    distinction: 'Q1 journal',
    links: [
      { label: 'Publisher', href: 'https://www.sciencedirect.com/science/article/pii/S0020025526008601' },
      { label: 'arXiv:2509.11511', href: 'https://arxiv.org/abs/2509.11511' },
    ],
  },
  {
    title: 'General Frameworks for Conditional Two-Sample Testing',
    authors: 'Seongchan Lee, Suman Cha, Ilmun Kim',
    year: 2024,
    venue: 'Biometrika',
    status: 'Submitted',
    distinction: 'Leading statistics journal · Q1',
    links: [
      { label: 'arXiv:2410.16636', href: 'https://arxiv.org/abs/2410.16636' },
    ],
  },
];
