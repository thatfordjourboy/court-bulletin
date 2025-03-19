import { FC } from 'react';
import { motion } from 'framer-motion';

type NoticeTypeIconProps = {
  type: string;
  className?: string;
};

const NoticeTypeIcon: FC<NoticeTypeIconProps> = ({ type, className = "" }) => {
  const getInitials = (type: string) => {
    switch (type) {
      case 'PRACTICE_DIRECTION':
        return 'PD';
      case 'JUDICIAL_NOTICES':
        return 'JN';
      case 'GENERAL_NOTICES':
        return 'GN';
      case 'ESTATE_NOTICES':
        return 'EN';
      case 'ANNOUNCEMENTS':
        return 'AN';
      default:
        return 'GN';
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'PRACTICE_DIRECTION':
        return 'bg-emerald-50';
      case 'JUDICIAL_NOTICES':
        return 'bg-blue-50';
      case 'GENERAL_NOTICES':
        return 'bg-indigo-50';
      case 'ESTATE_NOTICES':
        return 'bg-amber-50';
      case 'ANNOUNCEMENTS':
        return 'bg-rose-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'PRACTICE_DIRECTION':
        return 'text-emerald-600';
      case 'JUDICIAL_NOTICES':
        return 'text-blue-600';
      case 'GENERAL_NOTICES':
        return 'text-indigo-600';
      case 'ESTATE_NOTICES':
        return 'text-amber-600';
      case 'ANNOUNCEMENTS':
        return 'text-rose-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div 
      className={`${className} ${getBackgroundColor(type)} flex items-center justify-center rounded-lg`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        className={`${getTextColor(type)} font-bold text-5xl tracking-wider`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {getInitials(type)}
      </motion.span>
    </motion.div>
  );
};

export default NoticeTypeIcon; 