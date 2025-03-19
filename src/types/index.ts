export type NoticeType = 'PRACTICE_DIRECTION' | 'JUDICIAL_NOTICES' | 'SUBSTITUTED_SERVICE_NOTICES' | 'ESTATE_NOTICES' | 'ANNOUNCEMENT';

export type Notice = {
  id: string;
  title: string;
  type: NoticeType;
  content: string;
  suitNumber?: string;
  servedDate?: string;
  servedTime?: string;
  applicant?: string;
  respondent?: string;
  division?: string;
  court?: string;
  expiryDate?: string;
  signatory?: string;
  signatoryTitle?: string;
  createdAt: string;
  updatedAt: string;
} 