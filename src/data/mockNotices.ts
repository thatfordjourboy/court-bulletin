export interface Notice {
  id: string;
  type: 'GENERAL_NOTICES' | 'JUDICIAL_NOTICES' | 'PRACTICE_DIRECTION' | 'SUBSTITUTED_SERVICE_NOTICES' | 'ESTATE_NOTICES' | 'ANNOUNCEMENTS';
  title: string;
  suitNumber?: string; // Optional, only for SUBSTITUTED_SERVICE_NOTICES and ESTATE_NOTICES
  referenceNumber?: string; // Optional, for all other notice types
  servedDate: string;
  servedTime: string;
  court: string;
  division?: string;
  expiryDate: string;
  content: string;
  signatory: string;
  signatoryTitle: string;
  bulletinVolume: string;
  // Additional fields for Substituted Service Notices
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
  orderImages?: string[]; // Array of image URLs for the order documents
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

// Helper function to get random signatory
function getRandomSignatory(): string {
  const signatories = [
    "John Smith",
    "Emma Johnson",
    "Michael Brown",
    "Sarah Wilson",
    "David Taylor"
  ];
  return signatories[Math.floor(Math.random() * signatories.length)];
}

// Helper function to get random signatory title
function getRandomSignatoryTitle(): string {
  const titles = [
    "Court Registrar",
    "Deputy Registrar",
    "Chief Justice's Secretary",
    "Court Administrator",
    "Legal Secretary"
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

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

const getRandomApplicant = () => {
  const applicants = [
    'The Special Prosecutor',
    'The Attorney General',
    'The Electoral Commission',
    'The Ghana Bar Association'
  ];
  return applicants[Math.floor(Math.random() * applicants.length)];
};

const getRandomRespondent = () => {
  const respondents = [
    'Anthony Gyasi',
    'John Smith',
    'Mary Johnson',
    'Samuel Addo'
  ];
  return respondents[Math.floor(Math.random() * respondents.length)];
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
const getNoticeContent = (type: Notice['type'], title: string) => {
  if (type === 'PRACTICE_DIRECTION' && title.toLowerCase().includes('virtual court')) {
    return `A DIRECTION to provide for protocols in virtual court hearings and to provide for efficient management of the remote/virtual hearing proceedings and related matters.

Being guided by the provisions of Article 125 (4) of the Constitution, 1992, Section 69 (1) of the Courts Act 1993 Act 459 and Orders 38 Rule 3A and 41 Rule 2A of the High Court (Civil Procedure) Rules, 2004 (C.I. 47) as amended by C.I. 87 of 2014, I direct that until statutory provisions are made, the remote/virtual hearing of cases in all Courts in the Country shall be governed as follows:

A. GENERAL

1. The faces of all participants in virtual court hearing MUST be visible and ensure that the face is not turned towards a source of light. Participants must properly position cameras for clarity of image. As much as possible use a plain background.
2. All participants MUST mute microphones to minimize and conceal any background noise.
3. No participant can eat or drink while in a virtual session.
4. In order to minimize distractions and disruptions during the court sessions, all participants MUST raise their hands when they need to speak or use the Chat Box. Raising of hands is enabled by selecting the "Show Reactions" button/bar at the bottom of the screen in the meeting controls and then selecting "Raise Hand".
5. Applications and Affidavits must be filed with a skeletal brief of the legal arguments and authorities to be presented to the Court. Judges are to allocate not more than 5 - 7 minutes to any participant who wishes to highlight any important point. This is to avoid the time spent on viva voce arguments and reduce the waiting time for other participants.

B. TECHNICAL

1. The virtual court hyperlink for every court shall be displayed on the website of the Judicial Service of Ghana in compliance with Order 1 Rule 2(1) of CI 47. The hyperlink for a particular court shall cease to be accessible except for the records of the court.
2. Access to audio recordings shall be restricted subject to statutory requirements and the rules of procedure. Any request for audio transcripts for a court sitting MUST be made within a period of 90 days. and subject to the rules of court stored for Back up procedures for audio and text transcripts for each court sitting shall be implemented to ensure that the data is stored for no less than 90 days.
3. The Judicial Service of Ghana shall maintain a backup system that shall be located and maintained in the place as the Chief Justice shall determine.
4. Microsoft Teams is the official medium of conducting the virtual sessions. Covering device must be fully charged and have internet connectivity.
5. All participants MUST ensure they have strong internet connectivity.
6. All participants MUST endeavor to have uninterrupted power back-up at all material times during a virtual session. Back-up may include generator, UPS, power banks etc.
7. All participants MUST endeavor to have uninterrupted internet supply at all material times during a virtual session. This may include modems, Wi- Fi and data bundles.
8. The use of headsets is recommended to increase both privacy and audibility of participants.`;
  }
  
  if (type === 'SUBSTITUTED_SERVICE_NOTICES') {
    return `IT IS HEREBY ORDERED that; the order for Confirmation of seizure of suspected tainted property with the accompanying affidavit in support and annexures be served on the Defendant by Substituted Service in the following manner for a period of 7 days. a. By posting a copy of the said Application for an Order of Confirmation of seizure of suspected tainted property with the accompanying affidavit in support and annexures together with a copy the Order for Substituted Service on the Notice Board of the High Court, General Jurisdiction Division. b. By delivering the said application with its accompanying affidavit in support and annexures together with the copy of the Order by Substituted Service to any adult person living at the last known residence of the Respondent; c. By publishing a copy of the said application with its accompanying affidavit in support and annexures together with a copy of the Order for Substituted Service on the Applicant's official website.`;
  }

  if (type === 'PRACTICE_DIRECTION') {
    return `A DIRECTION to provide guidelines for ${title.toLowerCase()}.

Being guided by the provisions of Article 125 (4) of the Constitution, 1992, and Section 69 (1) of the Courts Act 1993 Act 459, the following directions are hereby issued:

1. All legal practitioners and court users are required to comply with these guidelines.
2. These guidelines shall come into effect immediately.
3. Non-compliance with these guidelines may result in appropriate sanctions.
4. The Registrar shall ensure proper dissemination of these guidelines.`;
  }

  // Default content for other notice types
  return "It is notified for lawyers that the mandatory requirement under Regulation 84 of the Legal Profession (Professional Conduct and Etiquette) Rules, 2020 (L.I. 2423) directing lawyers to show proof of Continuous Legal Education (CLE) participation for Solicitors Licence renewal will come into effect in 2024. Hence applications for 2025 Solicitors Licenses will consider CLE Hours earned in 2024.";
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
export const mockNotices: Notice[] = Array.from({ length: 60 }, (_, i) => {
  // Use consistent notice types based on index
  const types: Notice['type'][] = [
    'PRACTICE_DIRECTION',
    'JUDICIAL_NOTICES',
    'GENERAL_NOTICES',
    'ANNOUNCEMENTS',
    'ESTATE_NOTICES',
    'SUBSTITUTED_SERVICE_NOTICES'
  ];
  const type = types[i % types.length];
  const isSubstitutedService = type === 'SUBSTITUTED_SERVICE_NOTICES';
  const isEstateNotice = type === 'ESTATE_NOTICES';
  const needsSuitNumber = isSubstitutedService || isEstateNotice;
  
  // For substituted service notices, get applicant and respondent first
  const applicant = isSubstitutedService ? getRandomApplicant() : '';
  const respondent = isSubstitutedService ? getRandomRespondent() : '';
  
  // Set title based on notice type using consistent titles
  const title = isSubstitutedService ? 
    `${applicant} v. ${respondent}` : 
    getConsistentTitle(type, Math.floor(i / 6));

  // Base notice object
  const notice: Notice = {
    id: `notice-${i + 1}`,
    type,
    title,
    ...(needsSuitNumber 
      ? { suitNumber: getSequentialSuitNumber(i) } 
      : { referenceNumber: getSequentialReferenceNumber(type, i) }
    ),
    servedDate: getSequentialDate(i),
    servedTime: `${(8 - (i % 4)).toString().padStart(2, '0')}:${(15 + (i * 5)).toString().padStart(2, '0')} pm`,
    court: getRandomCourt(),
    division: getRandomDivision(),
    expiryDate: getFutureDate(30 - i),
    content: getNoticeContent(type, title),
    signatory: getRandomSignatory(),
    signatoryTitle: getRandomSignatoryTitle(),
    bulletinVolume: `${Math.floor(i / 3) + 1}`,
  };

  // Add parties for substituted service notices
  if (isSubstitutedService) {
    notice.parties = {
      applicant: {
        name: applicant,
        type: 'APPLICANT'
      },
      respondent: {
        name: respondent,
        type: 'RESPONDENT'
      }
    };
  }

  return notice;
}).sort((a, b) => {
  // Sort by date and time, most recent first
  const dateA = new Date(`${a.servedDate}T${a.servedTime.replace(/\s*(am|pm)/i, '')}`);
  const dateB = new Date(`${b.servedDate}T${b.servedTime.replace(/\s*(am|pm)/i, '')}`);
  return dateB.getTime() - dateA.getTime();
}); 