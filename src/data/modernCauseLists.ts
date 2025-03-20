import { CauseList } from './mockCauseLists';

// Reuse the same court types and regions for consistency
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

// Generate only current and future dates
function generateModernDates() {
  const dates = [];
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 2); // Generate dates up to 2 months in future
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
      dates.push(d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).toUpperCase());
    }
  }
  
  return dates;
}

// Generate modern cause lists
export const modernCauseLists: CauseList[] = regions.flatMap((region, regionIndex) => {
  const dates = generateModernDates();
  const modernLists: CauseList[] = [];
  
  // Add Supreme Court
  modernLists.push({
    id: `modern-sc-${regionIndex}`,
    title: `Supreme Court (${region}) Cause List`,
    location: region,
    date: dates[regionIndex % dates.length],
    description: `Notice has been given by the Supreme Court Registrar of the general sitting of the Supreme Court for hearing cases at the Supreme Court Building at 9.30am.`,
    courtType: 'Supreme Court'
  });

  // Add High Courts with divisions
  highCourtDivisions.forEach((division, divIndex) => {
    modernLists.push({
      id: `modern-hc-${regionIndex}-${divIndex}`,
      title: `High Court Cause List (Law Court Complex, ${region})`,
      location: region,
      division,
      date: dates[(regionIndex + divIndex + 1) % dates.length],
      description: `Notice has been given by the High Court Registrar of the sitting of the ${division} for hearing cases at the High Court Complex at 9.00am.`,
      courtType: 'High Court'
    });
  });

  // Add Court of Appeal
  ['Civil', 'Criminal'].forEach((division, divIndex) => {
    modernLists.push({
      id: `modern-ca-${division.toLowerCase()}-${regionIndex}`,
      title: `Court of Appeal (${division} Division), ${region} Cause List`,
      location: region,
      division,
      date: dates[(regionIndex + divIndex + 2) % dates.length],
      description: `Notice has been given by the Court of Appeal Registrar of the sitting of the ${division} Division for hearing appeals at the Court of Appeal at 9.00am.`,
      courtType: 'Court of Appeal'
    });
  });

  // Add Circuit Courts
  for (let i = 0; i < 2; i++) {
    modernLists.push({
      id: `modern-cc-${i + 1}-${regionIndex}`,
      title: `Circuit Court (${region}) Cause List`,
      location: region,
      date: dates[(regionIndex + i + 4) % dates.length],
      description: `Notice has been given by the Circuit Court Registrar of the general sitting for hearing cases at Circuit Court at 8.30am.`,
      courtType: 'Circuit Court'
    });
  }

  // Add District Courts
  for (let i = 0; i < 2; i++) {
    modernLists.push({
      id: `modern-dc-${i + 1}-${regionIndex}`,
      title: `District Court (${region}) Cause List`,
      location: region,
      date: dates[(regionIndex + i + 6) % dates.length],
      description: `Notice has been given by the District Court Registrar of the general sitting for hearing cases at District Court at 8.30am.`,
      courtType: 'District Court'
    });
  }

  return modernLists;
}); 