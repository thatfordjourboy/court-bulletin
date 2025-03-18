export interface Notice {
  id: string;
  type: 'GENERAL_NOTICES' | 'ANNOUNCEMENTS' | 'PRACTICE_DIRECTION' | 'ESTATE_NOTICES' | 'JUDICIAL_NOTICES' | 'SUBSTITUTED_SERVICE_NOTICES';
  title: string;
  suitNumber: string;
  servedDate: string;
  servedTime: string;
  court: string;
  division?: string;
  expiryDate: string;
}

// Helper function to generate future date
const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const mockNotices: Notice[] = [
  {
    id: '1',
    type: 'GENERAL_NOTICES',
    title: 'GBA Notice to all Lawyers',
    suitNumber: 'J5/05/2024',
    servedDate: '2024-01-02',
    servedTime: '5:00 pm',
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(4)
  },
  {
    id: '2',
    type: 'ANNOUNCEMENTS',
    title: 'Appointment of Supreme Court Justices',
    suitNumber: 'J5/05/2024',
    servedDate: '2024-01-02',
    servedTime: '5:00 pm',
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(4)
  },
  {
    id: '3',
    type: 'PRACTICE_DIRECTION',
    title: 'Practice Direction - Virtual Court Session',
    suitNumber: 'J5/05/2024',
    servedDate: '2024-01-02',
    servedTime: '5:00 pm',
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(4)
  },
  {
    id: '4',
    type: 'ESTATE_NOTICES',
    title: 'Dom v. The Republic',
    suitNumber: 'J5/05/2024',
    servedDate: '2024-01-02',
    servedTime: '5:00 pm',
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(4)
  },
  {
    id: '5',
    type: 'JUDICIAL_NOTICES',
    title: 'Notice of Court Vacation',
    suitNumber: 'J5/06/2024',
    servedDate: '2024-01-03',
    servedTime: '3:00 pm',
    court: 'Supreme Court',
    expiryDate: getFutureDate(7)
  },
  {
    id: '6',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'Substituted Service in Case No. 123/2024',
    suitNumber: 'J5/07/2024',
    servedDate: '2024-01-04',
    servedTime: '2:00 pm',
    court: 'Circuit Court',
    expiryDate: getFutureDate(10)
  }
]; 