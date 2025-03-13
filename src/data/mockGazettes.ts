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
export const gazetteYears: GazetteYear[] = [
  {
    year: '2024',
    count: 42,
    quarters: {
      q1: { months: { j: 12, f: 15, m: 10 } },
      q2: { months: { a: 5, m: 0, j: 0 } },
      q3: { months: { j: 0, a: 0, s: 0 } },
      q4: { months: { o: 0, n: 0, d: 0 } }
    }
  },
  {
    year: '2023',
    count: 53,
    quarters: {
      q1: { months: { j: 10, f: 12, m: 8 } },
      q2: { months: { a: 6, m: 5, j: 4 } },
      q3: { months: { j: 3, a: 2, s: 1 } },
      q4: { months: { o: 1, n: 0, d: 1 } }
    }
  },
  {
    year: '2022',
    count: 31,
    quarters: {
      q1: { months: { j: 8, f: 6, m: 4 } },
      q2: { months: { a: 3, m: 2, j: 2 } },
      q3: { months: { j: 1, a: 1, s: 1 } },
      q4: { months: { o: 1, n: 1, d: 1 } }
    }
  },
  {
    year: '2021',
    count: 37,
    quarters: {
      q1: { months: { j: 9, f: 7, m: 5 } },
      q2: { months: { a: 4, m: 3, j: 2 } },
      q3: { months: { j: 2, a: 1, s: 1 } },
      q4: { months: { o: 1, n: 1, d: 1 } }
    }
  },
  {
    year: '2019',
    count: 23,
    quarters: {
      q1: { months: { j: 6, f: 5, m: 3 } },
      q2: { months: { a: 2, m: 2, j: 1 } },
      q3: { months: { j: 1, a: 1, s: 1 } },
      q4: { months: { o: 0, n: 0, d: 1 } }
    }
  },
  {
    year: '2018',
    count: 23,
    quarters: {
      q1: { months: { j: 6, f: 5, m: 3 } },
      q2: { months: { a: 2, m: 2, j: 1 } },
      q3: { months: { j: 1, a: 1, s: 1 } },
      q4: { months: { o: 0, n: 0, d: 1 } }
    }
  },
  {
    year: '2017',
    count: 23,
    quarters: {
      q1: { months: { j: 6, f: 5, m: 3 } },
      q2: { months: { a: 2, m: 2, j: 1 } },
      q3: { months: { j: 1, a: 1, s: 1 } },
      q4: { months: { o: 0, n: 0, d: 1 } }
    }
  },
  {
    year: '2016',
    count: 23,
    quarters: {
      q1: { months: { j: 6, f: 5, m: 3 } },
      q2: { months: { a: 2, m: 2, j: 1 } },
      q3: { months: { j: 1, a: 1, s: 1 } },
      q4: { months: { o: 0, n: 0, d: 1 } }
    }
  }
]; 