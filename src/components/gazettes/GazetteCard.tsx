'use client';

import { motion } from 'framer-motion';

interface MonthData {
  [key: string]: number;
}

interface QuarterData {
  months: MonthData;
}

interface GazetteCardProps {
  year: string;
  count: number;
  quarters: {
    q1: QuarterData;
    q2: QuarterData;
    q3: QuarterData;
    q4: QuarterData;
  };
  isRecent?: boolean;
  onMonthClick?: (year: string, month: string, count: number) => void;
}

const Quarter = ({ 
  label, 
  months, 
  monthLabels,
  onBarClick 
}: { 
  label: string; 
  months: MonthData; 
  monthLabels: string[];
  onBarClick?: (month: string, count: number) => void;
}) => {
  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-[#64CCC5] font-medium mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.div>
      <div className="flex justify-between space-x-2">
        {monthLabels.map((month) => {
          const count = months[month.toLowerCase()];
          const heightPercentage = Math.min(count * 5, 100);
          
          return (
            <div key={month} className="flex flex-col items-center">
              <motion.div 
                className="text-xs text-gray-500 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {month}
              </motion.div>
              <div 
                className="w-4 bg-gray-200 relative cursor-pointer group"
                style={{ height: '60px' }}
                onClick={() => onBarClick?.(month, count)}
              >
                <motion.div 
                  className="w-full bg-gray-300 absolute bottom-0 hover:bg-[#64CCC5] transition-colors duration-300"
                  style={{ height: `${heightPercentage}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block">
                    <div className="bg-[#01292D] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      {count} gazette{count !== 1 ? 's' : ''}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const GazetteCard = ({ 
  year, 
  count, 
  quarters,
  isRecent,
  onMonthClick 
}: GazetteCardProps) => {
  return (
    <motion.div 
      className={`border border-gray-200 rounded-lg p-6 transition-all duration-300
        ${isRecent ? 'shadow-md hover:shadow-xl' : 'hover:shadow-lg'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h3 
          className={`text-4xl font-bold ${isRecent ? 'text-[#01292D]' : 'text-[#64CCC5]'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {year}
        </motion.h3>
        <motion.span 
          className={`text-white text-sm px-3 py-1 rounded
            ${isRecent ? 'bg-[#64CCC5]' : 'bg-[#01292D]'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {count} gazette{count !== 1 ? 's' : ''}
        </motion.span>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Quarter 
          label="Q1" 
          months={quarters.q1.months} 
          monthLabels={['J', 'F', 'M']}
          onBarClick={(month, count) => onMonthClick?.(year, month, count)}
        />
        <Quarter 
          label="Q2" 
          months={quarters.q2.months} 
          monthLabels={['A', 'M', 'J']}
          onBarClick={(month, count) => onMonthClick?.(year, month, count)}
        />
        <Quarter 
          label="Q3" 
          months={quarters.q3.months} 
          monthLabels={['J', 'A', 'S']}
          onBarClick={(month, count) => onMonthClick?.(year, month, count)}
        />
        <Quarter 
          label="Q4" 
          months={quarters.q4.months} 
          monthLabels={['O', 'N', 'D']}
          onBarClick={(month, count) => onMonthClick?.(year, month, count)}
        />
      </motion.div>
    </motion.div>
  );
};

export default GazetteCard; 