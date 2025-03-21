export type AnnouncementType = 'GENERAL_NOTICES' | 'JUDICIAL_NOTICES' | 'PRACTICE_DIRECTION';

export interface Announcement {
  id: string;
  title: string;
  type: AnnouncementType;
  date: string;
  description: string;
  court: string;
  division?: string;
  referenceNumber?: string;
  servedDate?: string;
  servedTime?: string;
  expiryDate?: string;
}

// Helper function to generate recent dates
const getRecentDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Helper function to generate old dates (more than 1 year ago)
const getOldDate = (yearsAgo: number, monthOffset: number = 0): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearsAgo);
  date.setMonth(date.getMonth() - monthOffset);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Helper function to generate reference numbers
const generateReferenceNumber = (type: AnnouncementType, id: string): string => {
  const prefix = type === 'GENERAL_NOTICES' ? 'GN' : 
                type === 'JUDICIAL_NOTICES' ? 'JN' : 'PD';
  return `${prefix}/${id}/2024`;
};

// Helper function to generate served time
const generateServedTime = (): string => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const period = Math.random() > 0.5 ? 'AM' : 'PM';
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Generate mock announcements with appropriate titles
export const mockAnnouncements: Announcement[] = [
  // Recent announcements (less than 1 year old)
  {
    id: '1',
    title: 'Bar Association Meeting',
    type: 'GENERAL_NOTICES',
    date: getRecentDate(5),
    description: 'Notice of upcoming Bar Association meeting to discuss legal practice matters.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('GENERAL_NOTICES', '001'),
    servedDate: getRecentDate(5),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
  },
  {
    id: '2',
    title: 'Court Vacation Notice',
    type: 'JUDICIAL_NOTICES',
    date: getRecentDate(10),
    description: 'Notice regarding the upcoming court vacation period and arrangements.',
    court: 'High Court',
    division: 'Civil Division',
    referenceNumber: generateReferenceNumber('JUDICIAL_NOTICES', '002'),
    servedDate: getRecentDate(10),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
  },
  {
    id: '3',
    title: 'Practice Direction No. 2 of 2024',
    type: 'PRACTICE_DIRECTION',
    date: getRecentDate(15),
    description: 'Practice direction on the conduct of proceedings in the Court of Appeal.',
    court: 'Court of Appeal',
    referenceNumber: generateReferenceNumber('PRACTICE_DIRECTION', '003'),
    servedDate: getRecentDate(15),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
  },
  // Archived announcements (more than 1 year old)
  {
    id: '4',
    title: 'Legal Year Opening 2022',
    type: 'JUDICIAL_NOTICES',
    date: getOldDate(2),
    description: 'Notice for the opening of Legal Year 2022 ceremonies and events.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('JUDICIAL_NOTICES', '004'),
    servedDate: getOldDate(2),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
  },
  {
    id: '5',
    title: 'Court Dress Code Guidelines',
    type: 'GENERAL_NOTICES',
    date: getOldDate(3),
    description: 'Updated guidelines on appropriate court attire for legal practitioners.',
    court: 'High Court',
    division: 'Civil Division',
    referenceNumber: generateReferenceNumber('GENERAL_NOTICES', '005'),
    servedDate: getOldDate(3),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString()
  },
  {
    id: '6',
    title: 'Practice Direction No. 1 of 2020',
    type: 'PRACTICE_DIRECTION',
    date: getOldDate(4),
    description: 'Practice direction on case management and hearing procedures.',
    court: 'Court of Appeal',
    referenceNumber: generateReferenceNumber('PRACTICE_DIRECTION', '006'),
    servedDate: getOldDate(4),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString()
  },
  {
    id: '7',
    title: 'Admission of Advocates and Solicitors',
    type: 'JUDICIAL_NOTICES',
    date: getOldDate(5),
    description: 'Notice for the admission of advocates and solicitors to the Bar.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('JUDICIAL_NOTICES', '007'),
    servedDate: getOldDate(5),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 4)).toISOString()
  },
  {
    id: '8',
    title: 'Court Registry Operating Hours',
    type: 'GENERAL_NOTICES',
    date: getOldDate(6),
    description: 'Notice of revised operating hours for all court registries.',
    court: 'High Court',
    division: 'Civil Division',
    referenceNumber: generateReferenceNumber('GENERAL_NOTICES', '008'),
    servedDate: getOldDate(6),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString()
  },
  // Additional archived announcements
  {
    id: '9',
    title: 'Legal Year Closing 2021',
    type: 'JUDICIAL_NOTICES',
    date: getOldDate(2, 6),
    description: 'Notice for the closing ceremonies of Legal Year 2021.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('JUDICIAL_NOTICES', '009'),
    servedDate: getOldDate(2, 6),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
  },
  {
    id: '10',
    title: 'Practice Direction No. 3 of 2021',
    type: 'PRACTICE_DIRECTION',
    date: getOldDate(2, 8),
    description: 'Practice direction on remote hearing procedures and protocols.',
    court: 'Court of Appeal',
    referenceNumber: generateReferenceNumber('PRACTICE_DIRECTION', '010'),
    servedDate: getOldDate(2, 8),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
  },
  {
    id: '11',
    title: 'Court Library Access Guidelines',
    type: 'GENERAL_NOTICES',
    date: getOldDate(3, 2),
    description: 'Updated guidelines for accessing and using court library resources.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('GENERAL_NOTICES', '011'),
    servedDate: getOldDate(3, 2),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString()
  },
  {
    id: '12',
    title: 'Judicial Case Management System Update',
    type: 'JUDICIAL_NOTICES',
    date: getOldDate(3, 4),
    description: 'Notice regarding updates to the judicial case management system.',
    court: 'High Court',
    division: 'Civil Division',
    referenceNumber: generateReferenceNumber('JUDICIAL_NOTICES', '012'),
    servedDate: getOldDate(3, 4),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString()
  },
  {
    id: '13',
    title: 'Practice Direction No. 2 of 2021',
    type: 'PRACTICE_DIRECTION',
    date: getOldDate(2, 10),
    description: 'Practice direction on electronic filing of court documents.',
    court: 'Court of Appeal',
    referenceNumber: generateReferenceNumber('PRACTICE_DIRECTION', '013'),
    servedDate: getOldDate(2, 10),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
  },
  {
    id: '14',
    title: 'Court Interpreter Services',
    type: 'GENERAL_NOTICES',
    date: getOldDate(4, 2),
    description: 'Guidelines for requesting and utilizing court interpreter services.',
    court: 'High Court',
    division: 'Criminal Division',
    referenceNumber: generateReferenceNumber('GENERAL_NOTICES', '014'),
    servedDate: getOldDate(4, 2),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString()
  },
  {
    id: '15',
    title: 'Judicial Appointments 2020',
    type: 'JUDICIAL_NOTICES',
    date: getOldDate(4, 6),
    description: 'Notice of judicial appointments and assignments.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('JUDICIAL_NOTICES', '015'),
    servedDate: getOldDate(4, 6),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString()
  },
  {
    id: '16',
    title: 'Practice Direction No. 1 of 2019',
    type: 'PRACTICE_DIRECTION',
    date: getOldDate(5),
    description: 'Practice direction on court mediation procedures.',
    court: 'High Court',
    division: 'Civil Division',
    referenceNumber: generateReferenceNumber('PRACTICE_DIRECTION', '016'),
    servedDate: getOldDate(5),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 4)).toISOString()
  },
  {
    id: '17',
    title: 'Court Technology Guidelines',
    type: 'GENERAL_NOTICES',
    date: getOldDate(5, 3),
    description: 'Guidelines for using technology in court proceedings.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('GENERAL_NOTICES', '017'),
    servedDate: getOldDate(5, 3),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 4)).toISOString()
  },
  {
    id: '18',
    title: 'Legal Year Opening 2019',
    type: 'JUDICIAL_NOTICES',
    date: getOldDate(5, 6),
    description: 'Notice for the opening of Legal Year 2019 ceremonies and events.',
    court: 'Supreme Court',
    division: 'General Division',
    referenceNumber: generateReferenceNumber('JUDICIAL_NOTICES', '018'),
    servedDate: getOldDate(5, 6),
    servedTime: generateServedTime(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() - 4)).toISOString()
  }
]; 