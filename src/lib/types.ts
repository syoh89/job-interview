export type DocumentCategory = "technical" | "general";

export type DocumentType = "questions" | "studies";

export type DocumentMetadata = {
  title: string;
  createdAt: string;
  updatedAt: string;
  keywords: string[];
  category: DocumentCategory;
};

export type DocumentListItem = DocumentMetadata & {
  slug: string;
  type: DocumentType;
};

export type DocumentContent = DocumentListItem & {
  html: string;
  raw: string;
};
