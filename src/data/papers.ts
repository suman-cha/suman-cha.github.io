export interface ScholarPaper {
  title: string;
  authors: string;
  year: number;
  venue: string;
  arxivId: string;
  arxivHref: string;
}

export const scholarPapers: ScholarPaper[] = [
  {
    title: 'More Permutations Do Not Always Increase Power: Non-monotonicity in Monte Carlo Permutation Tests',
    authors: 'Suman Cha, Seongchan Lee, Antonin Schrab, Ilmun Kim',
    year: 2026,
    venue: 'arXiv preprint',
    arxivId: '2605.03886',
    arxivHref: 'https://arxiv.org/abs/2605.03886',
  },
  {
    title: 'Learning Majority-to-Minority Transformations with MMD and Triplet Loss for Imbalanced Classification',
    authors: 'Suman Cha, Hyunjoong Kim',
    year: 2025,
    venue: 'arXiv preprint',
    arxivId: '2509.11511',
    arxivHref: 'https://arxiv.org/abs/2509.11511',
  },
  {
    title: 'General Frameworks for Conditional Two-Sample Testing',
    authors: 'Seongchan Lee, Suman Cha, Ilmun Kim',
    year: 2024,
    venue: 'arXiv preprint',
    arxivId: '2410.16636',
    arxivHref: 'https://arxiv.org/abs/2410.16636',
  },
];
