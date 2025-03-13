// Type for gazette data
export type GazetteYear = {
  year: string;
  count: number;
  quarters: {
    q1: { months: { j: number; f: number; m: number } };
    q2: { months: { a: number; m: number; j: number } };
    q3: { months: { j: number; a: number; s: number } };
    q4: { months: { o: number; n: number; d: number } };
  };
};

// Mock data - will be replaced with API call in the future
export const gazetteYears: GazetteYear[] = Array.from({ length: 65 }, (_, index) => {
  const year = 2024 - index;
  return {
    year: year.toString(),
    count: 23,
    quarters: {
      q1: { months: { j: 2, f: 2, m: 2 } },
      q2: { months: { a: 2, m: 2, j: 2 } },
      q3: { months: { j: 2, a: 2, s: 2 } },
      q4: { months: { o: 2, n: 2, d: 3 } }
    }
  };
}); 