import { mockCauseLists, type CauseList } from '@/data/mockCauseLists';

export interface CauseListCase {
  date: string;
  suit: string;
  caseTitle: string;
  particulars: string;
}

export interface CauseListDetail {
  id: string;
  courtType: string;
  title: string;
  dateRange: string;
  location?: string;
  division?: string;
  notice: string;
  registrar: {
    name: string;
    title: string;
  };
  cases: CauseListCase[];
}

// Helper function to generate mock cases
function generateMockCases(courtType: string, count: number = 5): CauseListCase[] {
  const cases: CauseListCase[] = [];
  const particulars = {
    'Supreme Court': ['For Hearing', 'For Ruling', 'For Mention'],
    'High Court': ['Criminal Trial', 'Motion for Injunction', 'For Hearing', 'For Ruling', 'For Mention'],
    'Court of Appeal': ['Appeal Hearing', 'Appeal Motion', 'For Mention'],
    'Circuit Court': ['Criminal Trial', 'Civil Trial', 'For Hearing', 'For Mention'],
    'District Court': ['Criminal Trial', 'Civil Trial', 'For Hearing', 'For Mention']
  };

  const generateSuitNumber = (courtType: string, index: number) => {
    switch (courtType) {
      case 'Supreme Court':
        return `J1/${(index + 5).toString().padStart(2, '0')}/2021`;
      case 'High Court':
        return `HRCM/${(index + 21).toString().padStart(2, '0')}/21`;
      case 'Court of Appeal':
        return `H1/${(154 + index).toString()}/2021`;
      case 'Circuit Court':
        return `CC/${(index + 1).toString().padStart(3, '0')}/21`;
      case 'District Court':
        return `DC/${(index + 1).toString().padStart(3, '0')}/21`;
      default:
        return `${index + 1}/2021`;
    }
  };

  const plaintiffs = ['John Doe', 'Jane Smith', 'Kwame Mensah', 'Abena Pokua', 'The Republic', 'Attorney General', 'Ghana Bar Association'];
  const defendants = ['Bank of Ghana', 'Electoral Commission', 'Lands Commission', 'State Housing Company', 'Ministry of Finance'];

  for (let i = 0; i < count; i++) {
    cases.push({
      date: `${(i % 7) + 1}-02-21`,
      suit: generateSuitNumber(courtType, i),
      caseTitle: `${plaintiffs[i % plaintiffs.length]} v. ${defendants[i % defendants.length]}`,
      particulars: particulars[courtType as keyof typeof particulars][i % particulars[courtType as keyof typeof particulars].length]
    });
  }

  return cases;
}

// Function to generate mock data based on ID pattern
function generateMockData(id: string): CauseListDetail | null {
  // Parse the ID pattern
  const [courtType, ...rest] = id.split('-');
  
  const courtTypes = {
    'sc': 'Supreme Court',
    'hc': 'High Court',
    'ca': 'Court of Appeal',
    'cc': 'Circuit Court',
    'dc': 'District Court'
  };

  const registrars = {
    'Supreme Court': { name: 'MATTHEW ANTIAYE', title: 'Registrar, Supreme Court' },
    'High Court': { name: 'SAMUEL OWUSU', title: 'Registrar, High Court' },
    'Court of Appeal': { name: 'ELIZABETH MENSAH', title: 'Registrar, Court of Appeal' },
    'Circuit Court': { name: 'JAMES BROWN', title: 'Registrar, Circuit Court' },
    'District Court': { name: 'SARAH ADDO', title: 'Registrar, District Court' }
  } as const;

  const highCourtDivisions = [
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

  if (!courtTypes[courtType as keyof typeof courtTypes]) {
    return null;
  }

  const court = courtTypes[courtType as keyof typeof courtTypes];
  const regionIndex = parseInt(rest[rest.length - 1]) || 0;
  
  let title = '';
  let division = '';
  
  switch (courtType) {
    case 'sc':
      title = `Supreme Court (${rest[rest.length - 1]}) Cause List`;
      break;
    case 'hc':
      const divIndex = parseInt(rest[1]) || 0;
      division = highCourtDivisions[divIndex % highCourtDivisions.length];
      title = `High Court Cause List (Law Court Complex, Accra)`;
      break;
    case 'ca':
      division = rest[0] === 'civil' ? 'Civil Division' : 'Criminal Division';
      title = `Court of Appeal (${division}) Cause List`;
      break;
    case 'cc':
      title = `Circuit Court (Accra) Cause List`;
      break;
    case 'dc':
      title = `District Court (Accra) Cause List`;
      break;
  }

  return {
    id,
    courtType: court,
    title,
    dateRange: '1ST FEB 2021 - 7 FEB 2021',
    division: division || undefined,
    location: 'Greater Accra',
    notice: `Notice has been given by the ${court} Registrar of the general sitting${division ? ` of the ${division}` : ''} for hearing cases at ${court} at ${court === 'Supreme Court' ? '9.30am' : '9.00am'}.`,
    registrar: registrars[court as keyof typeof registrars],
    cases: generateMockCases(court)
  };
}

export async function getCauseListDetail(id: string): Promise<CauseListDetail> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const data = generateMockData(id);
  if (!data) {
    throw new Error('Cause list not found');
  }
  
  return data;
}

export async function getRelatedCauseLists(currentId: string): Promise<CauseList[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const currentList = mockCauseLists.find(list => list.id === currentId);
  if (!currentList) return [];

  // Filter related lists based on:
  // 1. Same date range
  // 2. Same location but different court type
  // 3. Same court type but different location
  const relatedLists = mockCauseLists.filter(list => {
    // Exclude current list
    if (list.id === currentId) return false;

    // Same date range is a primary criterion
    const sameDateRange = list.date === currentList.date;
    
    // Same location, different court type
    const sameLocationDifferentCourt = 
      list.location === currentList.location && 
      list.courtType !== currentList.courtType;

    // Same court type, different location
    const sameCourtDifferentLocation = 
      list.courtType === currentList.courtType && 
      list.location !== currentList.location;

    return sameDateRange && (sameLocationDifferentCourt || sameCourtDifferentLocation);
  });

  // If we don't have enough related lists with strict criteria, relax the date matching
  if (relatedLists.length < 3) {
    const additionalLists = mockCauseLists.filter(list => {
      // Exclude current list and already included lists
      if (list.id === currentId || relatedLists.some(r => r.id === list.id)) return false;

      // Same location, different court type
      const sameLocationDifferentCourt = 
        list.location === currentList.location && 
        list.courtType !== currentList.courtType;

      // Same court type, different location
      const sameCourtDifferentLocation = 
        list.courtType === currentList.courtType && 
        list.location !== currentList.location;

      return sameLocationDifferentCourt || sameCourtDifferentLocation;
    });

    // Add additional lists until we have 3
    relatedLists.push(...additionalLists.slice(0, 3 - relatedLists.length));
  }

  // If we still don't have enough, just add other court lists until we have 3
  if (relatedLists.length < 3) {
    const remainingLists = mockCauseLists.filter(list => 
      list.id !== currentId && !relatedLists.some(r => r.id === list.id)
    );
    relatedLists.push(...remainingLists.slice(0, 3 - relatedLists.length));
  }

  return relatedLists.slice(0, 3);
} 