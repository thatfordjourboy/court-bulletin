import React from 'react';

interface NoticeContentProps {
  content: string;
  type: string;
}

const NoticeContent: React.FC<NoticeContentProps> = ({ content }) => {
  return (
    <div className="prose max-w-none text-[#464646] text-lg whitespace-pre-wrap">{content}</div>
  );
};

export default NoticeContent; 