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

// Helper function to generate random time
const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() > 0.5 ? 'am' : 'pm';
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

// Helper function to generate random date in 2024
const getRandomDate = () => {
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `2024-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

// Helper function to generate random court
const getRandomCourt = () => {
  const courts = [
    'High Court',
    'Supreme Court',
    'Circuit Court',
    'District Court',
    'Court of Appeal',
    'Commercial Court',
    'Labour Court',
    'Family Court'
  ];
  return courts[Math.floor(Math.random() * courts.length)];
};

// Helper function to generate random division
const getRandomDivision = () => {
  const divisions = [
    'Commercial Division',
    'Criminal Division',
    'Civil Division',
    'Land Division',
    'Industrial Division',
    'Probate Division',
    'Family Division',
    'Financial Division'
  ];
  return Math.random() > 0.5 ? divisions[Math.floor(Math.random() * divisions.length)] : undefined;
};

// Helper function to generate random notice type
const getRandomNoticeType = () => {
  const types = [
    'GENERAL_NOTICES',
    'ANNOUNCEMENTS',
    'PRACTICE_DIRECTION',
    'ESTATE_NOTICES',
    'JUDICIAL_NOTICES',
    'SUBSTITUTED_SERVICE_NOTICES'
  ];
  return types[Math.floor(Math.random() * types.length)] as Notice['type'];
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
    court: 'Supreme Court',
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
    division: 'General Jurisdiction',
    expiryDate: getFutureDate(4)
  },
  {
    id: '4',
    type: 'ESTATE_NOTICES',
    title: 'Estate of Late Justice Anin - Probate Notice',
    suitNumber: 'J5/05/2024',
    servedDate: '2024-01-02',
    servedTime: '5:00 pm',
    court: 'High Court',
    division: 'Probate and Administration Division',
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
    title: 'Republic v. John Doe - Criminal Case',
    suitNumber: 'HCCR/123/2024',
    servedDate: '2024-01-04',
    servedTime: '2:00 pm',
    court: 'High Court',
    division: 'Criminal Division',
    expiryDate: getFutureDate(10)
  },
  {
    id: '7',
    type: 'GENERAL_NOTICES',
    title: 'Land Title Registration Notice',
    suitNumber: 'HLC/11/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Land Court',
    expiryDate: getFutureDate(15)
  },
  {
    id: '8',
    type: 'ANNOUNCEMENTS',
    title: 'New Court Complex Opening Ceremony',
    suitNumber: 'J9/12/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(20)
  },
  {
    id: '9',
    type: 'PRACTICE_DIRECTION',
    title: 'Matrimonial Causes Filing Guidelines',
    suitNumber: 'HCMD/13/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Divorce and Matrimonial Division',
    expiryDate: getFutureDate(25)
  },
  {
    id: '10',
    type: 'ESTATE_NOTICES',
    title: 'Estate of Late Chief Justice - Probate Notice',
    suitNumber: 'HCPA/14/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Probate and Administration Division',
    expiryDate: getFutureDate(30)
  },
  {
    id: '11',
    type: 'JUDICIAL_NOTICES',
    title: 'Industrial Dispute Resolution Guidelines',
    suitNumber: 'HCLD/15/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Labour Division',
    expiryDate: getFutureDate(12)
  },
  {
    id: '12',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'Human Rights Case 456/2024',
    suitNumber: 'HCHR/16/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Human Rights Division',
    expiryDate: getFutureDate(18)
  },
  {
    id: '13',
    type: 'GENERAL_NOTICES',
    title: 'Bar Association Annual Conference',
    suitNumber: 'J14/17/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(22)
  },
  {
    id: '14',
    type: 'ANNOUNCEMENTS',
    title: 'Commercial Court Special Session',
    suitNumber: 'HCCD/18/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(28)
  },
  {
    id: '15',
    type: 'PRACTICE_DIRECTION',
    title: 'Financial Cases Filing Protocol',
    suitNumber: 'HCFD/19/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Financial Division',
    expiryDate: getFutureDate(35)
  },
  {
    id: '16',
    type: 'ESTATE_NOTICES',
    title: 'Multiple Beneficiaries Estate Case',
    suitNumber: 'HCPA/20/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Probate and Administration Division',
    expiryDate: getFutureDate(40)
  },
  {
    id: '17',
    type: 'JUDICIAL_NOTICES',
    title: 'Land Acquisition Proceedings',
    suitNumber: 'HLC/21/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Land Court',
    expiryDate: getFutureDate(45)
  },
  {
    id: '18',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'International Service Request - Case 101/2024',
    suitNumber: 'J19/22/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'International Division',
    expiryDate: getFutureDate(50)
  },
  {
    id: '19',
    type: 'GENERAL_NOTICES',
    title: 'Law Reports Publication Update',
    suitNumber: 'J20/23/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(55)
  },
  {
    id: '20',
    type: 'ANNOUNCEMENTS',
    title: 'New Legal Year Opening Ceremony',
    suitNumber: 'J21/24/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(60)
  },
  {
    id: '21',
    type: 'GENERAL_NOTICES',
    title: 'Mandatory E-Filing System Training Sessions',
    suitNumber: 'J22/25/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: getRandomCourt(),
    division: getRandomDivision(),
    expiryDate: getFutureDate(30)
  },
  {
    id: '22',
    type: 'ANNOUNCEMENTS',
    title: 'Chief Justice Annual Address to the Bar',
    suitNumber: 'J23/26/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(25)
  },
  {
    id: '23',
    type: 'PRACTICE_DIRECTION',
    title: 'Updated Guidelines for Remote Court Hearings',
    suitNumber: 'J24/27/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'All Courts',
    expiryDate: getFutureDate(45)
  },
  {
    id: '24',
    type: 'ESTATE_NOTICES',
    title: 'Estate of Former Chief Justice - Probate Notice',
    suitNumber: 'J25/28/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Probate Division',
    expiryDate: getFutureDate(60)
  },
  {
    id: '25',
    type: 'JUDICIAL_NOTICES',
    title: 'Revised Court Fees and Charges 2024',
    suitNumber: 'J26/29/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'All Courts',
    expiryDate: getFutureDate(90)
  },
  {
    id: '26',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'International Corporate Dispute - Service Notice',
    suitNumber: 'J27/30/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Commercial Court',
    division: 'International Division',
    expiryDate: getFutureDate(40)
  },
  {
    id: '27',
    type: 'GENERAL_NOTICES',
    title: 'Court Library System Upgrade Notice',
    suitNumber: 'J28/31/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: getRandomCourt(),
    expiryDate: getFutureDate(15)
  },
  {
    id: '28',
    type: 'ANNOUNCEMENTS',
    title: 'Appointment of New Court Registrars',
    suitNumber: 'J29/32/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: getRandomCourt(),
    expiryDate: getFutureDate(20)
  },
  {
    id: '29',
    type: 'PRACTICE_DIRECTION',
    title: 'Guidelines for Filing Constitutional Matters',
    suitNumber: 'J30/33/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(75)
  },
  {
    id: '30',
    type: 'ESTATE_NOTICES',
    title: 'Multiple Beneficiaries Estate Distribution Notice',
    suitNumber: 'J31/34/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Probate Division',
    expiryDate: getFutureDate(50)
  },
  {
    id: '31',
    type: 'JUDICIAL_NOTICES',
    title: 'Court Premises Renovation Schedule',
    suitNumber: 'J32/35/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: getRandomCourt(),
    expiryDate: getFutureDate(100)
  },
  {
    id: '32',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'Cross-Border Litigation Service Notice',
    suitNumber: 'J33/36/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'International Division',
    expiryDate: getFutureDate(45)
  },
  {
    id: '33',
    type: 'GENERAL_NOTICES',
    title: 'Court Security Protocol Updates',
    suitNumber: 'J34/37/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'All Courts',
    expiryDate: getFutureDate(30)
  },
  {
    id: '34',
    type: 'ANNOUNCEMENTS',
    title: 'Legal Year Calendar 2024-2025',
    suitNumber: 'J35/38/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(120)
  },
  {
    id: '35',
    type: 'PRACTICE_DIRECTION',
    title: 'New Rules for Commercial Arbitration',
    suitNumber: 'J36/39/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Commercial Court',
    expiryDate: getFutureDate(60)
  },
  {
    id: '36',
    type: getRandomNoticeType(),
    title: 'Judicial Ethics Committee Formation',
    suitNumber: 'J37/40/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'Supreme Court',
    expiryDate: getFutureDate(45)
  },
  {
    id: '37',
    type: getRandomNoticeType(),
    title: 'Court Technology Innovation Program',
    suitNumber: 'J38/41/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: getRandomCourt(),
    division: getRandomDivision(),
    expiryDate: getFutureDate(80)
  },
  {
    id: '38',
    type: getRandomNoticeType(),
    title: 'Legal Aid Services Expansion Notice',
    suitNumber: 'J39/42/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: getRandomCourt(),
    expiryDate: getFutureDate(40)
  },
  {
    id: '39',
    type: getRandomNoticeType(),
    title: 'Court Mediation Program Launch',
    suitNumber: 'J40/43/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: getRandomCourt(),
    division: getRandomDivision(),
    expiryDate: getFutureDate(70)
  },
  {
    id: '40',
    type: getRandomNoticeType(),
    title: 'Judicial Staff Training Programs',
    suitNumber: 'J41/44/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'All Courts',
    expiryDate: getFutureDate(55)
  },
  {
    id: '41',
    type: 'JUDICIAL_NOTICES',
    title: 'Criminal Appeal Hearing Notice',
    suitNumber: 'HCCR/157/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Criminal Division',
    expiryDate: getFutureDate(30)
  },
  {
    id: '42',
    type: 'GENERAL_NOTICES',
    title: 'Land Title Dispute - Accra Central',
    suitNumber: 'HLC/203/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Land Court',
    expiryDate: getFutureDate(45)
  },
  {
    id: '43',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'Divorce Petition Notice',
    suitNumber: 'HCMD/89/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Divorce and Matrimonial Division',
    expiryDate: getFutureDate(60)
  },
  {
    id: '44',
    type: 'ESTATE_NOTICES',
    title: 'Letters of Administration Application',
    suitNumber: 'HCPA/167/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Probate and Administration Division',
    expiryDate: getFutureDate(40)
  },
  {
    id: '45',
    type: 'JUDICIAL_NOTICES',
    title: 'Trade Union Dispute Resolution',
    suitNumber: 'HCLD/112/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Labour Division',
    expiryDate: getFutureDate(30)
  },
  {
    id: '46',
    type: 'PRACTICE_DIRECTION',
    title: 'Constitutional Rights Case Hearing',
    suitNumber: 'HCHR/78/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Human Rights Division',
    expiryDate: getFutureDate(25)
  },
  {
    id: '47',
    type: 'ANNOUNCEMENTS',
    title: 'Banking Sector Litigation Notice',
    suitNumber: 'HCCD/145/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(35)
  },
  {
    id: '48',
    type: 'GENERAL_NOTICES',
    title: 'Securities Trading Dispute',
    suitNumber: 'HCFD/92/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Financial Division',
    expiryDate: getFutureDate(50)
  },
  {
    id: '49',
    type: 'JUDICIAL_NOTICES',
    title: 'Civil Case Management Conference',
    suitNumber: 'HCGJ/134/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'General Jurisdiction',
    expiryDate: getFutureDate(20)
  },
  {
    id: '50',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'Murder Trial Proceedings',
    suitNumber: 'HCCR/198/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Criminal Division',
    expiryDate: getFutureDate(15)
  },
  {
    id: '51',
    type: 'GENERAL_NOTICES',
    title: 'Land Registration Appeal',
    suitNumber: 'HLC/221/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Land Court',
    expiryDate: getFutureDate(40)
  },
  {
    id: '52',
    type: 'PRACTICE_DIRECTION',
    title: 'Child Custody Case Hearing',
    suitNumber: 'HCMD/156/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Divorce and Matrimonial Division',
    expiryDate: getFutureDate(30)
  },
  {
    id: '53',
    type: 'ESTATE_NOTICES',
    title: 'Contested Will Proceedings',
    suitNumber: 'HCPA/189/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Probate and Administration Division',
    expiryDate: getFutureDate(55)
  },
  {
    id: '54',
    type: 'JUDICIAL_NOTICES',
    title: 'Workplace Discrimination Case',
    suitNumber: 'HCLD/167/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Labour Division',
    expiryDate: getFutureDate(45)
  },
  {
    id: '55',
    type: 'ANNOUNCEMENTS',
    title: 'Freedom of Expression Case',
    suitNumber: 'HCHR/143/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Human Rights Division',
    expiryDate: getFutureDate(35)
  },
  {
    id: '56',
    type: 'GENERAL_NOTICES',
    title: 'Corporate Merger Dispute',
    suitNumber: 'HCCD/178/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(60)
  },
  {
    id: '57',
    type: 'PRACTICE_DIRECTION',
    title: 'Investment Fund Litigation',
    suitNumber: 'HCFD/134/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Financial Division',
    expiryDate: getFutureDate(40)
  },
  {
    id: '58',
    type: 'JUDICIAL_NOTICES',
    title: 'Complex Civil Litigation',
    suitNumber: 'HCGJ/187/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'General Jurisdiction',
    expiryDate: getFutureDate(50)
  },
  {
    id: '59',
    type: 'SUBSTITUTED_SERVICE_NOTICES',
    title: 'Armed Robbery Trial Notice',
    suitNumber: 'HCCR/212/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Criminal Division',
    expiryDate: getFutureDate(25)
  },
  {
    id: '60',
    type: 'GENERAL_NOTICES',
    title: 'Property Boundary Dispute',
    suitNumber: 'HLC/245/2024',
    servedDate: getRandomDate(),
    servedTime: getRandomTime(),
    court: 'High Court',
    division: 'Land Court',
    expiryDate: getFutureDate(45)
  }
]; 