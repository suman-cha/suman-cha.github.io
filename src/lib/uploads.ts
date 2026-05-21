const uploadFiles = import.meta.glob<string>('../../public/uploads/**/*', {
  query: '?url',
  import: 'default',
  eager: true,
});

export type UploadKind =
  | 'pdf'
  | 'html'
  | 'markdown'
  | 'image'
  | 'data'
  | 'code'
  | 'archive'
  | 'file';

export interface UploadEntry {
  title: string;
  href: string;
  extension: string;
  kind: UploadKind;
  projectSlug: string | null;
  path: string;
}

const kindLabels: Record<UploadKind, string> = {
  pdf: 'PDF',
  html: 'HTML',
  markdown: 'MD',
  image: 'Image',
  data: 'Data',
  code: 'Code',
  archive: 'Archive',
  file: 'File',
};

export function getKindLabel(kind: UploadKind) {
  return kindLabels[kind];
}

export function getUploads() {
  return Object.entries(uploadFiles).reduce<UploadEntry[]>((entries, [sourcePath]) => {
    const relativePath = toUploadPath(sourcePath);
    const parts = relativePath.split('/');

    if (!relativePath || parts.some((part) => part.startsWith('.'))) return entries;

    const filename = parts.at(-1) ?? '';
    const topLevel = parts[0] ?? '';
    const projectSlug = topLevel && topLevel !== '_general' ? topLevel : null;
    const extension = extensionFromFilename(filename);

    entries.push({
      title: titleFromFilename(filename),
      href: `/uploads/${parts.map(encodeURIComponent).join('/')}`,
      extension,
      kind: kindFromExtension(extension),
      projectSlug,
      path: relativePath,
    });

    return entries;
  }, []).sort((a, b) => {
    const byProject = (a.projectSlug ?? '_general').localeCompare(b.projectSlug ?? '_general');
    if (byProject !== 0) return byProject;
    return a.title.localeCompare(b.title);
  });
}

export function groupUploadsByKind(entries: UploadEntry[]) {
  return entries.reduce<Record<UploadKind, UploadEntry[]>>((groups, entry) => {
    groups[entry.kind] = groups[entry.kind] ?? [];
    groups[entry.kind].push(entry);
    return groups;
  }, {} as Record<UploadKind, UploadEntry[]>);
}

export function getPaperUploads() {
  return getUploads().filter((entry) => entry.path.startsWith('papers/'));
}

function toUploadPath(sourcePath: string) {
  const marker = '/public/uploads/';
  if (sourcePath.includes(marker)) return sourcePath.split(marker).at(-1) ?? '';
  return sourcePath.replace('../../public/uploads/', '');
}

function extensionFromFilename(filename: string) {
  const match = filename.match(/\.([^.]+)$/);
  return match?.[1]?.toLowerCase() ?? 'file';
}

function titleFromFilename(filename: string) {
  const stem = filename.replace(/\.[^.]+$/, '');
  return stem
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function kindFromExtension(extension: string): UploadKind {
  if (extension === 'pdf') return 'pdf';
  if (extension === 'html' || extension === 'htm') return 'html';
  if (extension === 'md' || extension === 'markdown') return 'markdown';
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(extension)) return 'image';
  if (['csv', 'json', 'parquet', 'xlsx', 'xls'].includes(extension)) return 'data';
  if (['py', 'r', 'js', 'ts', 'tsx', 'jsx', 'ipynb'].includes(extension)) return 'code';
  if (['zip', 'tar', 'gz', 'tgz'].includes(extension)) return 'archive';
  return 'file';
}
