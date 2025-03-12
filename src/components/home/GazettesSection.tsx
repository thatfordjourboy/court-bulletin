'use client';

import Link from 'next/link';
import { useState } from 'react';

// Type for gazette data
type GazetteYear = {
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
const gazetteYears: GazetteYear[] = [
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

// Component for rendering a single bar in the chart
const Bar = ({ height, label }: { height: number; label: string }) => {
  // Calculate height percentage (max 100%)
  const heightPercentage = Math.min(height * 5, 100);
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="w-4 bg-gray-200 relative" style={{ height: '60px' }}>
        <div 
          className="w-full bg-gray-300 absolute bottom-0"
          style={{ height: `${heightPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Component for rendering a quarter with its months
const Quarter = ({ label, months, monthLabels }: { 
  label: string; 
  months: { [key: string]: number }; 
  monthLabels: string[] 
}) => {
  return (
    <div className="flex flex-col">
      <div className="text-[#64CCC5] font-medium mb-2">{label}</div>
      <div className="flex justify-between space-x-2">
        {monthLabels.map((month, index) => (
          <Bar 
            key={month} 
            height={months[month.toLowerCase()]} 
            label={month.toUpperCase()} 
          />
        ))}
      </div>
    </div>
  );
};

// Component for rendering a year card
const YearCard = ({ data }: { data: GazetteYear }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#64CCC5] text-4xl font-bold">{data.year}</h3>
        <span className="bg-[#01292D] text-white text-sm px-3 py-1">
          {data.count} gazettes
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <Quarter 
          label="Q1" 
          months={data.quarters.q1.months} 
          monthLabels={['J', 'F', 'M']} 
        />
        <Quarter 
          label="Q2" 
          months={data.quarters.q2.months} 
          monthLabels={['A', 'M', 'J']} 
        />
        <Quarter 
          label="Q3" 
          months={data.quarters.q3.months} 
          monthLabels={['J', 'A', 'S']} 
        />
        <Quarter 
          label="Q4" 
          months={data.quarters.q4.months} 
          monthLabels={['O', 'N', 'D']} 
        />
      </div>
    </div>
  );
};

const GazettesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Gazettes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {gazetteYears.map((yearData) => (
            <YearCard key={yearData.year} data={yearData} />
          ))}
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/gazettes" 
            className="bg-[#01292D] text-white px-6 py-3 inline-flex items-center"
          >
            <span>Browse Gazettes</span>
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GazettesSection; 