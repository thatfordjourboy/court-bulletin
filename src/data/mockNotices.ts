import { Notice, NoticeType } from '@/types/notice';

// Helper function to generate future date
const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Helper function to generate old date (more than 1 year ago)
const getOldDate = (yearOffset: number = 1) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearOffset);
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

// Helper function to generate deterministic court based on index
const getRandomCourt = (index: number) => {
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
  return courts[index % courts.length];
};

// Helper function to generate deterministic division based on index
const getRandomDivision = (index: number) => {
  const divisions = [
    'Criminal Division',
    'Land Court',
    'Divorce and Matrimonial Division',
    'Probate and Administration Division',
    'Labour Division',
    'Human Rights Division',
    'Commercial Division',
    'Financial Division',
    'General Jurisdiction'
  ];
  return divisions[index % divisions.length];
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

// Helper function to generate deterministic signatory based on index
const getRandomSignatory = (index: number) => {
  const signatories = [
    'Justice Kwame Asante',
    'Justice Sarah Mensah',
    'Justice Michael Osei',
    'Justice Abena Addo',
    'Justice Kwaku Mensah',
    'Justice Akua Sarpong',
    'Justice Kofi Owusu',
    'Justice Adwoa Boateng'
  ];
  return signatories[index % signatories.length];
};

// Helper function to generate deterministic signatory title based on index
const getRandomSignatoryTitle = (index: number) => {
  const titles = [
    'Chief Justice',
    'Justice of the Supreme Court',
    'Justice of the Court of Appeal',
    'Justice of the High Court',
    'Registrar of the Supreme Court',
    'Registrar of the High Court',
    'Deputy Registrar',
    'Assistant Registrar'
  ];
  return titles[index % titles.length];
};

// Helper function to generate random title
const getRandomTitle = (type: Notice['type']) => {
  if (type === 'SUBSTITUTED_SERVICE_NOTICES') {
    const plaintiffs = [
      'The Special Prosecutor',
      'The Republic',
      'The Attorney General',
      'Ghana Revenue Authority',
      'Bank of Ghana'
    ];
    const defendants = [
      'Anthony Gyasi',
      'John Mensah',
      'Kwame Addo',
      'Samuel Owusu',
      'Grace Asante',
      'Pacific Industries Ltd',
      'Sunrise Enterprises'
    ];
    const plaintiff = plaintiffs[Math.floor(Math.random() * plaintiffs.length)];
    const defendant = defendants[Math.floor(Math.random() * defendants.length)];
    return `${plaintiff} v. ${defendant}`;
  }

  const subjects = [
    'Virtual Court Session',
    'Legal Practice Guidelines',
    'Court Proceedings Update',
    'Bar Association Meeting',
    'Legal Education Requirements',
    'Court Calendar Changes',
    'Professional Ethics Update',
    'Case Management Notice'
  ];
  return subjects[Math.floor(Math.random() * subjects.length)];
};

// Helper function to generate random suit number
const getRandomSuitNumber = () => {
  return `J${Math.floor(Math.random() * 100)}/${new Date().getFullYear()}`;
};

// Helper function to generate deterministic applicant based on index
const getRandomApplicant = (index: number) => {
  const applicants = [
    'The Attorney General',
    'The Ghana Bar Association',
    'The Judicial Service',
    'The Ghana Police Service',
    'The Ministry of Justice',
    'The Ghana Revenue Authority',
    'The Bank of Ghana',
    'The Securities and Exchange Commission'
  ];
  return applicants[index % applicants.length];
};

// Helper function to generate deterministic respondent based on index
const getRandomRespondent = (index: number) => {
  const respondents = [
    'Anthony Gyasi',
    'Mary Johnson',
    'Kwame Mensah',
    'Abena Osei',
    'Kofi Addo',
    'Sarah Sarpong',
    'Michael Owusu',
    'Adwoa Boateng'
  ];
  return respondents[index % respondents.length];
};

// Helper function to format notice type for display
const formatNoticeType = (type: Notice['type']) => {
  const formatted = type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
  
  // Only remove 'Notices' from Estate Notices
  if (type === 'ESTATE_NOTICES') {
    return formatted.replace(' Notices', '');
  }
  
  return formatted;
};

// Helper function to get content based on notice type
const getNoticeContent = (type: NoticeType, title: string) => {
  if (type === NoticeType.SUBSTITUTED_SERVICE_NOTICES) {
    return `IT IS HEREBY ORDERED that; the order for Confirmation of seizure of suspected tainted property with the accompanying affidavit in support and annexures be served on the Defendant by Substituted Service in the following manner for a period of 7 days. a. By posting a copy of the said Application for an Order of Confirmation of seizure of suspected tainted property with the accompanying affidavit in support and annexures together with a copy the Order for Substituted Service on the Notice Board of the High Court, General Jurisdiction Division. b. By delivering the said application with its accompanying affidavit in support and annexures together with the copy of the Order by Substituted Service to any adult person living at the last known residence of the Respondent; c. By publishing a copy of the said application with its accompanying affidavit in support and annexures together with a copy of the Order for Substituted Service on the Applicant's official website.`;
  }

  return 'Notice is hereby given that an application for Letters of Administration has been filed in respect of the estate of the deceased.';
};

// Helper function to generate sequential dates for substituted service notices
const getSequentialDate = (index: number) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - index); // Each notice will be 1 day older
  return date.toISOString().split('T')[0];
};

// Helper function to generate consistent title
const getConsistentTitle = (type: Notice['type'], index: number) => {
  const titles: Record<Exclude<Notice['type'], 'SUBSTITUTED_SERVICE_NOTICES'>, string[]> = {
    'PRACTICE_DIRECTION': [
      'Practice Direction - Virtual Court Session',
      'Practice Direction - Legal Practice Guidelines',
      'Practice Direction - Court Proceedings',
      'Practice Direction - Case Management',
      'Practice Direction - Professional Ethics'
    ],
    'JUDICIAL_NOTICES': [
      'Supreme Court Term Dates',
      'Court Calendar Update',
      'Judicial Working Hours',
      'Court Vacation Notice',
      'Special Sitting Notice'
    ],
    'GENERAL_NOTICES': [
      'Bar Association Meeting',
      'Legal Education Requirements',
      'Professional Ethics Update',
      'Court Fee Updates',
      'Legal Aid Services'
    ],
    'ANNOUNCEMENTS': [
      'New Chief Justice Appointment',
      'Court Complex Renovation',
      'E-Justice System Launch',
      'Legal Year Opening',
      'Judicial Conference'
    ],
    'ESTATE_NOTICES': [
      'Estate of John Doe',
      'Estate of Jane Smith',
      'Estate of Samuel Mensah',
      'Estate of Grace Addo',
      'Estate of Kwame Nkrumah'
    ]
  };

  return titles[type as keyof typeof titles][index % 5];
};

// Helper function to generate sequential reference numbers
const getSequentialReferenceNumber = (type: Notice['type'], index: number) => {
  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const prefixes = {
    'PRACTICE_DIRECTION': 'PD',
    'JUDICIAL_NOTICES': 'JN',
    'GENERAL_NOTICES': 'GN',
    'ANNOUNCEMENTS': 'AN',
    'ESTATE_NOTICES': 'EN'
  };
  const prefix = prefixes[type as keyof typeof prefixes] || 'REF';
  const sequence = (index + 1).toString().padStart(3, '0');
  return `${prefix}/${month}/${sequence}/${year}`;
};

// Helper function to generate sequential suit numbers
const getSequentialSuitNumber = (index: number) => {
  return `J${(80 - index).toString().padStart(2, '0')}/2025`;
};

// Generate mock notices
export const mockNotices: Notice[] = [
  // Recent notices (less than 1 year old)
  {
    id: '1',
    type: NoticeType.SUBSTITUTED_SERVICE_NOTICES,
    title: 'The Republic v. Anthony Gyasi',
    suitNumber: 'J45/2024',
    referenceNumber: 'SSN-2024-001',
    servedDate: '2024-03-15',
    servedTime: '10:30 am',
    court: 'High Court',
    division: 'General Jurisdiction',
    expiryDate: '2024-04-15',
    content: getNoticeContent(NoticeType.SUBSTITUTED_SERVICE_NOTICES, ''),
    signatory: 'Justice Kwame Asante',
    signatoryTitle: 'Justice of the High Court',
    bulletinVolume: 'Vol. 1',
    parties: {
      applicant: {
        name: 'The Republic',
        type: 'Plaintiff'
      },
      respondent: {
        name: 'Anthony Gyasi',
        type: 'Defendant'
      }
    }
  },
  {
    id: '2',
    type: NoticeType.ESTATE_NOTICES,
    title: 'Estate of Mary Johnson',
    suitNumber: 'J46/2024',
    referenceNumber: 'EN-2024-001',
    servedDate: '2024-03-10',
    servedTime: '2:15 pm',
    court: 'High Court',
    division: 'Probate and Administration Division',
    expiryDate: '2024-04-10',
    content: getNoticeContent(NoticeType.ESTATE_NOTICES, ''),
    signatory: 'Justice Sarah Mensah',
    signatoryTitle: 'Justice of the High Court',
    bulletinVolume: 'Vol. 1'
  },

  // Archived notices (older than 1 year)
  {
    id: '3',
    type: NoticeType.SUBSTITUTED_SERVICE_NOTICES,
    title: 'Ghana Revenue Authority v. Pacific Industries Ltd',
    suitNumber: 'J45/2023',
    referenceNumber: 'SSN-2023-001',
    servedDate: getOldDate(1),
    servedTime: '11:00 am',
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(30),
    content: getNoticeContent(NoticeType.SUBSTITUTED_SERVICE_NOTICES, ''),
    signatory: 'Justice Michael Osei',
    signatoryTitle: 'Justice of the High Court',
    bulletinVolume: 'Vol. 1',
    parties: {
      applicant: {
        name: 'Ghana Revenue Authority',
        type: 'Plaintiff'
      },
      respondent: {
        name: 'Pacific Industries Ltd',
        type: 'Defendant'
      }
    }
  },
  {
    id: '4',
    type: NoticeType.ESTATE_NOTICES,
    title: 'Estate of Kwame Mensah',
    suitNumber: 'J46/2023',
    referenceNumber: 'EN-2023-001',
    servedDate: getOldDate(1),
    servedTime: '3:30 pm',
    court: 'High Court',
    division: 'Probate and Administration Division',
    expiryDate: getFutureDate(30),
    content: getNoticeContent(NoticeType.ESTATE_NOTICES, ''),
    signatory: 'Justice Abena Addo',
    signatoryTitle: 'Justice of the High Court',
    bulletinVolume: 'Vol. 1'
  },
  {
    id: '5',
    type: NoticeType.SUBSTITUTED_SERVICE_NOTICES,
    title: 'Bank of Ghana v. Sunrise Enterprises',
    suitNumber: 'J45/2022',
    referenceNumber: 'SSN-2022-001',
    servedDate: getOldDate(2),
    servedTime: '9:15 am',
    court: 'High Court',
    division: 'Commercial Division',
    expiryDate: getFutureDate(30),
    content: getNoticeContent(NoticeType.SUBSTITUTED_SERVICE_NOTICES, ''),
    signatory: 'Justice Kwaku Mensah',
    signatoryTitle: 'Justice of the High Court',
    bulletinVolume: 'Vol. 1',
    parties: {
      applicant: {
        name: 'Bank of Ghana',
        type: 'Plaintiff'
      },
      respondent: {
        name: 'Sunrise Enterprises',
        type: 'Defendant'
      }
    }
  },
  {
    id: '6',
    type: NoticeType.ESTATE_NOTICES,
    title: 'Estate of Abena Osei',
    suitNumber: 'J46/2022',
    referenceNumber: 'EN-2022-001',
    servedDate: getOldDate(2),
    servedTime: '1:45 pm',
    court: 'High Court',
    division: 'Probate and Administration Division',
    expiryDate: getFutureDate(30),
    content: getNoticeContent(NoticeType.ESTATE_NOTICES, ''),
    signatory: 'Justice Akua Sarpong',
    signatoryTitle: 'Justice of the High Court',
    bulletinVolume: 'Vol. 1'
  },

  // Additional 30 mock notices for archive testing
  ...Array(30).fill(null).map((_, index) => {
    const type = index % 2 === 0 ? NoticeType.SUBSTITUTED_SERVICE_NOTICES : NoticeType.ESTATE_NOTICES;
    const yearOffset = Math.floor(Math.random() * 2) + 2; // 2-3 years ago
    const baseDate = new Date();
    baseDate.setFullYear(baseDate.getFullYear() - yearOffset);
    baseDate.setDate(baseDate.getDate() - (index * 7)); // Each notice 1 week apart
    
    return {
      id: `notice-archive-${index + 1}`,
      type,
      title: type === NoticeType.SUBSTITUTED_SERVICE_NOTICES
        ? `${getRandomApplicant(index)} v. ${getRandomRespondent(index)}`
        : `Estate of ${getRandomRespondent(index)}`,
      suitNumber: type === NoticeType.SUBSTITUTED_SERVICE_NOTICES ? getRandomSuitNumber() : undefined,
      referenceNumber: type === NoticeType.ESTATE_NOTICES ? `EN${Math.floor(Math.random() * 1000)}/${baseDate.getFullYear()}` : undefined,
      servedDate: baseDate.toISOString().split('T')[0],
      servedTime: getRandomTime(),
      court: getRandomCourt(index),
      division: getRandomDivision(index),
      expiryDate: (() => {
        const expiry = new Date(baseDate);
        expiry.setDate(expiry.getDate() + 30);
        return expiry.toISOString().split('T')[0];
      })(),
      content: getNoticeContent(type, ''),
      signatory: getRandomSignatory(index),
      signatoryTitle: getRandomSignatoryTitle(index),
      bulletinVolume: `Vol. ${Math.floor(yearOffset)}`,
      parties: type === NoticeType.SUBSTITUTED_SERVICE_NOTICES ? {
        applicant: {
          name: getRandomApplicant(index),
          type: 'APPLICANT'
        },
        respondent: {
          name: getRandomRespondent(index),
          type: 'RESPONDENT'
        }
      } : undefined
    };
  })
];

// Sort notices by date (most recent first)
mockNotices.sort((a, b) => new Date(b.servedDate).getTime() - new Date(a.servedDate).getTime()); 