export interface BulletinDocument {
  id: string;
  title: string;
  date: string;
  documentType: string;
  volume: string;
  totalPages: number;
  pages: Array<{
    pageNumber: number;
    content: string;
  }>;
}

export const mockBulletins: BulletinDocument[] = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  title: `Ghana Court Bulletin, Vol. ${i + 1}`,
  date: new Date(2024, 0, (i + 1) * 7).toISOString(),
  documentType: 'PDF',
  volume: String(i + 1),
  totalPages: Math.floor(Math.random() * 8) + 5, // Random number of pages between 5 and 12
  pages: Array.from({ length: Math.floor(Math.random() * 8) + 5 }, (_, j) => ({
    pageNumber: j + 1,
    content: `Sample content for page ${j + 1} of bulletin ${i + 1}`
  }))
})); 