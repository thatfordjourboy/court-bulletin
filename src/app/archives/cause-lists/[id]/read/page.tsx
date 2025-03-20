'use client';

import { useState, useEffect } from 'react';
import { getCauseListDetail, type CauseListDetail } from '@/services/causeLists';
import { getBackgroundColor } from '@/app/cause-lists/page';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ArchiveCauseListDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<CauseListDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const archiveId = params.id.startsWith('archive-') ? params.id : `archive-${params.id}`;
        const result = await getCauseListDetail(archiveId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cause list');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#01292D]"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
              <p className="text-red-500 text-lg">{error || 'Cause list not found'}</p>
              <Link 
                href="/archives/cause-lists"
                className="text-[#01292D] hover:text-[#064E55] underline"
              >
                Back to Archive
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className={`${getBackgroundColor(data.courtType)} px-6 py-3 w-[300px] relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-[3px] after:h-full after:bg-[#01292D]`}>
                <h1 className="text-[#01292D] text-base">{data.title}</h1>
              </div>
              <div className="bg-[#F8F9FB] border-l-[3px] border-[#64CCC5] pl-3 pr-4 py-2 text-[#01292D] text-base font-medium">
                Archived
              </div>
            </div>
            
            <div className="bg-[#EBF8FF] px-6 py-3">
              <span className="text-[#01292D] text-base">{data.dateRange}</span>
            </div>
            
            {/* Download Button */}
            <div className="w-[300px] flex justify-end">
              <button className="bg-[#01292D] text-white px-6 py-2 flex items-center gap-2 hover:bg-[#064E55] transition-colors text-sm">
                Download
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="max-w-4xl mb-12">
            <p className="text-[#464646] text-lg leading-relaxed">{data.notice}</p>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F8F9FB]">
                  <th className="py-5 px-6 text-left text-base font-semibold text-[#1E1D1D] border-b border-[#E5E7EB] w-[120px]">Date</th>
                  <th className="py-5 px-6 text-left text-base font-semibold text-[#1E1D1D] border-b border-[#E5E7EB] w-[150px]">Suit</th>
                  <th className="py-5 px-6 text-left text-base font-semibold text-[#1E1D1D] border-b border-[#E5E7EB]">Case Title</th>
                  <th className="py-5 px-6 text-left text-base font-semibold text-[#1E1D1D] border-b border-[#E5E7EB] w-[150px]">Particulars</th>
                </tr>
              </thead>
              <tbody>
                {data.cases.map((item, index) => (
                  <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                    <td className="py-5 px-6 text-base text-[#464646]">{item.date}</td>
                    <td className="py-5 px-6 text-base text-[#464646] font-medium">{item.suit}</td>
                    <td className="py-5 px-6 text-base text-[#464646]">{item.caseTitle}</td>
                    <td className="py-5 px-6 text-base text-[#464646]">{item.particulars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Registrar Information */}
          <div className="text-right">
            <p className="text-[#01292D] text-lg font-bold mb-1">{data.registrar.name}</p>
            <p className="text-[#464646] text-base italic">{data.registrar.title}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 