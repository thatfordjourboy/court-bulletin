export enum NoticeType {
  SUBSTITUTED_SERVICE_NOTICES = 'SUBSTITUTED_SERVICE_NOTICES',
  ESTATE_NOTICES = 'ESTATE_NOTICES',
  GENERAL_NOTICES = 'GENERAL_NOTICES',
  JUDICIAL_NOTICES = 'JUDICIAL_NOTICES',
  PRACTICE_DIRECTION = 'PRACTICE_DIRECTION',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS'
}

export interface Notice {
  id: string;
  type: NoticeType;
  title: string;
  suitNumber?: string;
  referenceNumber?: string;
  servedDate: string;
  servedTime: string;
  court: string;
  division?: string;
  expiryDate: string;
  content: string;
  signatory: string;
  signatoryTitle: string;
  bulletinVolume: string;
  parties?: {
    applicant: {
      name: string;
      type: string;
    };
    respondent: {
      name: string;
      type: string;
    };
  };
  orderImages?: string[];
} 