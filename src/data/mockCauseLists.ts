export type CauseList = {
  id: string;
  title: string;
  location: string;
  division?: string;
  date: string;
  description: string;
  courtType: 'Supreme Court' | 'High Court' | 'Court of Appeal' | 'Circuit Court' | 'District Court';
};

// Helper function to generate dates for the last 3 months
const generateRecentDates = () => {
  const dates = [];
  // Use a fixed date as the starting point
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
      dates.push(date.toLocaleDateString('en-GB', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
    }
  }
  return dates;
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
  
  // Add Supreme Court
  regionalCourts.push({
    id: `sc-${regionIndex}`,
    title: `Supreme Court (Accra Central) Cause List`,
    location: region,
    date: dates[regionIndex % dates.length],
    description: `Notice has been given by the Supreme Court Registrar of the general sitting of the Supreme Court for hearing cases at the Supreme Court Building at 9.30am commencing from 1st February, 2021`,
    courtType: 'Supreme Court' as const
  });

  // Add High Courts with different divisions
  highCourtDivisions.forEach((division, divIndex) => {
    regionalCourts.push({
      id: `hc-${regionIndex}-${divIndex}`,
      title: `High Court Cause List (Law Court Complex, Accra)`,
      location: region,
      division,
      date: dates[(regionIndex + divIndex + 1) % dates.length],
      description: `Notice has been given by the High Court Registrar of the sitting of the ${division} for hearing cases at the High Court Complex at 9.00am.`,
      courtType: 'High Court' as const
    });
  });

  // Add Court of Appeal
  regionalCourts.push(
    {
      id: `ca-civil-${regionIndex}`,
      title: `Court of Appeal (Civil Division), Accra Cause List`,
      location: region,
      division: 'Civil',
      date: dates[(regionIndex + 2) % dates.length],
      description: `Notice has been given by the Court of Appeal Registrar of the sitting of the Civil Division for hearing appeals at the Court of Appeal at 9.00am.`,
      courtType: 'Court of Appeal' as const
    },
    {
      id: `ca-criminal-${regionIndex}`,
      title: `Court of Appeal (Criminal Division), Accra Cause List`,
      location: region,
      division: 'Criminal',
      date: dates[(regionIndex + 3) % dates.length],
      description: `Notice has been given by the Court of Appeal Registrar of the sitting of the Criminal Division for hearing appeals at the Court of Appeal at 9.00am.`,
      courtType: 'Court of Appeal' as const
    }
  );

  // Add Circuit Courts
  regionalCourts.push(
    {
      id: `cc-1-${regionIndex}`,
      title: `Circuit Court (Accra) Cause List`,
      location: region,
      date: dates[(regionIndex + 4) % dates.length],
      description: `Notice has been given by the Circuit Court Registrar of the general sitting for hearing cases at Circuit Court at 8.30am.`,
      courtType: 'Circuit Court' as const
    },
    {
      id: `cc-2-${regionIndex}`,
      title: `Circuit Court (Accra) Cause List`,
      location: region,
      date: dates[(regionIndex + 5) % dates.length],
      description: `Notice has been given by the Circuit Court Registrar of the general sitting for hearing cases at Circuit Court at 8.30am.`,
      courtType: 'Circuit Court' as const
    }
  );

  // Add District Courts
  regionalCourts.push(
    {
      id: `dc-1-${regionIndex}`,
      title: `District Court (Accra) Cause List`,
      location: region,
      date: dates[(regionIndex + 6) % dates.length],
      description: `Notice has been given by the District Court Registrar of the general sitting for hearing cases at District Court at 8.30am.`,
      courtType: 'District Court' as const
    },
    {
      id: `dc-2-${regionIndex}`,
      title: `District Court (Accra) Cause List`,
      location: region,
      date: dates[(regionIndex + 7) % dates.length],
      description: `Notice has been given by the District Court Registrar of the general sitting for hearing cases at District Court at 8.30am.`,
      courtType: 'District Court' as const
    }
  );

  // Shuffle the array to mix up the court types
  return regionalCourts.sort(() => Math.random() - 0.5);
}); 