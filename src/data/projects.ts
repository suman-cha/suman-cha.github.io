import generatedResearch from './research.generated.json';

export interface PublicProject {
  id: string;
  name: string;
  summary: string;
  repository: string;
  repositoryLabel: string;
  contributions: string[];
  languages: string[];
  relatedPublicationId?: string;
}

interface GeneratedProject {
  id: string;
  name: string;
  summary: string;
  repository: {
    label: string;
    href: string;
  };
  contributions: string[];
  technologies: string[];
  relatedPublicationId: string;
}

interface GeneratedProjectGroup {
  category: string;
  projects: GeneratedProject[];
}

interface GeneratedResearchData {
  schemaVersion: number;
  projectGroups: GeneratedProjectGroup[];
}

const data: GeneratedResearchData = generatedResearch;
const expectedIds = ['fuse', 'moms', 'cond2st', 'mc-perm-power'] as const;
const generatedProjects = data.projectGroups.flatMap((group) => group.projects);
const projectsById = new Map(generatedProjects.map((project) => [project.id, project]));

if (data.schemaVersion !== 1) {
  throw new Error(`Unsupported research data schema: ${data.schemaVersion}`);
}

if (
  generatedProjects.length !== expectedIds.length
  || projectsById.size !== expectedIds.length
  || expectedIds.some((id) => !projectsById.has(id))
) {
  throw new Error(
    `research.generated.json must contain exactly these four public projects: ${expectedIds.join(', ')}`,
  );
}

export const publicProjects: PublicProject[] = expectedIds.map((id) => {
  const project = projectsById.get(id);
  if (!project) {
    throw new Error(`Missing public project: ${id}`);
  }

  return {
    id: project.id,
    name: project.name,
    summary: project.summary,
    repository: project.repository.href,
    repositoryLabel: project.repository.label,
    contributions: [...project.contributions],
    languages: [...project.technologies],
    relatedPublicationId: project.relatedPublicationId || undefined,
  };
});
