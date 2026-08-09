import generatedResearch from './research.generated.json';

export interface PaperLink {
  label: string;
  href: string;
}

export interface PaperAuthor {
  name: string;
  markers: string[];
  isSelf: boolean;
}

export interface PaperAuthorNote {
  marker: string;
  text: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  year: number;
  venue: string;
  status?: string;
  authors: PaperAuthor[];
  authorNotes: PaperAuthorNote[];
  links: PaperLink[];
}

interface GeneratedPublication extends ResearchPaper {
  order: number;
  status: string;
}

interface GeneratedResearchData {
  schemaVersion: number;
  sourceDigest: string;
  publications: GeneratedPublication[];
}

const data: GeneratedResearchData = generatedResearch;
const expectedIds = [
  'fuse',
  'battle-royale-win-probability',
  'mc-perm-power',
  'moms',
  'cond2st',
] as const;

const publicationsById = new Map(data.publications.map((publication) => [publication.id, publication]));
if (data.schemaVersion !== 1) {
  throw new Error(`Unsupported research data schema: ${data.schemaVersion}`);
}

if (
  data.publications.length !== expectedIds.length
  || publicationsById.size !== expectedIds.length
  || expectedIds.some((id) => !publicationsById.has(id))
) {
  throw new Error(
    `research.generated.json must contain exactly these five publications: ${expectedIds.join(', ')}`,
  );
}

export const researchPapers: ResearchPaper[] = data.publications
  .slice()
  .sort((left, right) => left.order - right.order)
  .map(({ order: _order, ...publication }) => ({
    ...publication,
    authors: publication.authors.map((author) => ({
      ...author,
      markers: [...author.markers],
    })),
    authorNotes: publication.authorNotes.map((note) => ({ ...note })),
    links: publication.links.map((link) => ({ ...link })),
  }));

export const researchSourceDigest = data.sourceDigest;

// Kept as a compatibility alias for any downstream import not yet migrated.
export const scholarPapers = researchPapers;
