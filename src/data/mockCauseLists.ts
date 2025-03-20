export type CauseList = {
  id: string;
  title: string;
  location: string;
  division?: string;
  date: string;
  description: string;
  courtType: 'Supreme Court' | 'High Court' | 'Court of Appeal' | 'Circuit Court' | 'District Court';
};

// Helper function to generate dates for recent and historical cause lists
const generateRecentDates = () => {
  const dates = [];
  
  // Generate current dates (last 3 months and next month)
  const currentStartDate = new Date();
  currentStartDate.setMonth(currentStartDate.getMonth() - 3);
  const currentEndDate = new Date();
  currentEndDate.setMonth(currentEndDate.getMonth() + 1);
  
  // Generate current dates
  for (let d = new Date(currentStartDate); d <= currentEndDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
      dates.push(new Date(d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).toUpperCase()); // Convert to uppercase to match the expected format
    }
  }
  
  // Generate historical dates (2-3 years ago)
  const historicalStartDate = new Date();
  historicalStartDate.setFullYear(historicalStartDate.getFullYear() - 3);
  const historicalEndDate = new Date();
  historicalEndDate.setFullYear(historicalEndDate.getFullYear() - 2);
  
  for (let d = new Date(historicalStartDate); d <= historicalEndDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
      dates.push(new Date(d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).toUpperCase()); // Convert to uppercase to match the expected format
    }
  }

  // Sort dates chronologically
  return dates.sort((a, b) => {
    const dateA = new Date(a.split(' ').reverse().join(' '));
    const dateB = new Date(b.split(' ').reverse().join(' '));
    return dateA.getTime() - dateB.getTime();
  });
};

// Generate dates once and store them
const dates = generateRecentDates();

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

const regions = [
  'Greater Accra',
  'Ashanti',
  'Ahafo Region',
  'Bono East Region',
  'Brong Ahafo Region',
  'Eastern Region',
  'North East Region',
  'Northern Region',
  'Oti Region',
  'Savannah Region',
  'Upper West Region',
  'Upper East Region',
  'Volta Region',
  'Western Region',
  'Western North Region'
];

// Generate mock data
export const mockCauseLists: CauseList[] = regions.flatMap((region, regionIndex) => {
  const regionalCourts = [];
  
  // Use more recent dates for current courts (first half of dates array)
  const currentDates = dates.slice(0, Math.floor(dates.length / 2));
  const historicalDates = dates.slice(Math.floor(dates.length / 2));
  
  // Add Supreme Court with current date
  regionalCourts.push({
    id: `sc-${regionIndex}`,
    title: `Supreme Court (Accra Central) Cause List`,
    location: region,
    date: currentDates[regionIndex % currentDates.length],
    description: `Notice has been given by the Supreme Court Registrar of the general sitting of the Supreme Court for hearing cases at the Supreme Court Building at 9.30am.`,
    courtType: 'Supreme Court' as const
  });

  // Add High Courts with different divisions
  highCourtDivisions.forEach((division, divIndex) => {
    // Alternate between current and historical dates
    const date = divIndex % 2 === 0 
      ? currentDates[(regionIndex + divIndex) % currentDates.length]
      : historicalDates[(regionIndex + divIndex) % historicalDates.length];
    
    regionalCourts.push({
      id: `hc-${regionIndex}-${divIndex}`,
      title: `High Court Cause List (Law Court Complex, Accra)`,
      location: region,
      division,
      date,
      description: `Notice has been given by the High Court Registrar of the sitting of the ${division} for hearing cases at the High Court Complex at 9.00am.`,
      courtType: 'High Court' as const
    });
  });

  // Add Court of Appeal with current dates
  regionalCourts.push(
    {
      id: `ca-civil-${regionIndex}`,
      title: `Court of Appeal (Civil Division), Accra Cause List`,
      location: region,
      division: 'Civil',
      date: currentDates[(regionIndex + 2) % currentDates.length],
      description: `Notice has been given by the Court of Appeal Registrar of the sitting of the Civil Division for hearing appeals at the Court of Appeal at 9.00am.`,
      courtType: 'Court of Appeal' as const
    },
    {
      id: `ca-criminal-${regionIndex}`,
      title: `Court of Appeal (Criminal Division), Accra Cause List`,
      location: region,
      division: 'Criminal',
      date: currentDates[(regionIndex + 3) % currentDates.length],
      description: `Notice has been given by the Court of Appeal Registrar of the sitting of the Criminal Division for hearing appeals at the Court of Appeal at 9.00am.`,
      courtType: 'Court of Appeal' as const
    }
  );

  // Add Circuit Courts with mix of current and historical dates
  regionalCourts.push(
    {
      id: `cc-1-${regionIndex}`,
      title: `Circuit Court (Accra) Cause List`,
      location: region,
      date: currentDates[(regionIndex + 4) % currentDates.length],
      description: `Notice has been given by the Circuit Court Registrar of the general sitting for hearing cases at Circuit Court at 8.30am.`,
      courtType: 'Circuit Court' as const
    },
    {
      id: `cc-2-${regionIndex}`,
      title: `Circuit Court (Accra) Cause List`,
      location: region,
      date: historicalDates[(regionIndex + 1) % historicalDates.length],
      description: `Notice has been given by the Circuit Court Registrar of the general sitting for hearing cases at Circuit Court at 8.30am.`,
      courtType: 'Circuit Court' as const
    }
  );

  // Add District Courts with mix of current and historical dates
  regionalCourts.push(
    {
      id: `dc-1-${regionIndex}`,
      title: `District Court (Accra) Cause List`,
      location: region,
      date: currentDates[(regionIndex + 5) % currentDates.length],
      description: `Notice has been given by the District Court Registrar of the general sitting for hearing cases at District Court at 8.30am.`,
      courtType: 'District Court' as const
    },
    {
      id: `dc-2-${regionIndex}`,
      title: `District Court (Accra) Cause List`,
      location: region,
      date: historicalDates[(regionIndex + 2) % historicalDates.length],
      description: `Notice has been given by the District Court Registrar of the general sitting for hearing cases at District Court at 8.30am.`,
      courtType: 'District Court' as const
    }
  );

  return regionalCourts;
}); 