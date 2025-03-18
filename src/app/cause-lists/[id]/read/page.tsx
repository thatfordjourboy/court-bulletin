'use client';

import { useState, useEffect } from 'react';
import { getCauseListDetail, type CauseListDetail, getRelatedCauseLists } from '@/services/causeLists';
import { getBackgroundColor } from '@/app/cause-lists/page';
import type { CauseList } from '@/data/mockCauseLists';

export default function CauseListDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<CauseListDetail | null>(null);
  const [relatedLists, setRelatedLists] = useState<CauseList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [result, related] = await Promise.all([
          getCauseListDetail(params.id),
          getRelatedCauseLists(params.id)
        ]);
        setData(result);
        setRelatedLists(related);
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
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#01292D]"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <p className="text-red-500 text-lg">{error || 'Cause list not found'}</p>
            <a 
              href="/cause-lists"
              className="text-[#01292D] hover:text-[#064E55] underline"
            >
              Back to Cause Lists
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div className={`${getBackgroundColor(data.courtType)} px-6 py-3 w-[300px]`}>
            <h1 className="text-[#01292D] text-base">{data.title}</h1>
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

        {/* Related Cause Lists Section */}
        {relatedLists.length > 0 && (
          <div className="mt-16">
            <h2 className="text-[#1E1D1D] text-2xl mb-8">Cause Lists of other courts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLists.map((list) => (
                <div 
                  key={list.id} 
                  className="bg-[#F8F9FB] flex flex-col"
                >
                  <div className="p-4 flex-1">
                    <div className="h-[100px]">
                      <h3 className="text-[#01292D] text-[22px] leading-[150%] tracking-[-0.02em] font-bold font-['Inter']">
                        {list.title}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 mb-4">
                      {list.division ? (
                        <>
                          <div>
                            <div className="font-medium text-sm text-[#1E1D1D] mb-2">Division</div>
                            <div className="text-sm text-[#464646]">{list.division}</div>
                          </div>
                          <div>
                            <div className="font-medium text-sm text-[#1E1D1D] mb-2">Date</div>
                            <div className="text-sm text-[#464646]">{list.date}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="font-medium text-sm text-[#1E1D1D] mb-2">Location</div>
                            <div className="text-sm text-[#464646]">{list.location}</div>
                          </div>
                          <div>
                            <div className="font-medium text-sm text-[#1E1D1D] mb-2">Date</div>
                            <div className="text-sm text-[#464646]">{list.date}</div>
                          </div>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-[#464646] line-clamp-3 mb-4">{list.description}</p>
                  </div>

                  <div className={`w-full ${getBackgroundColor(list.courtType)}`}>
                    <div className="flex items-center gap-2 pr-6 pt-6">
                      <a 
                        href={`/cause-lists/${list.id}/read`}
                        className="h-9 flex items-center px-3 border border-[#01292D] text-[#01292D] hover:bg-[#01292D] hover:text-white transition-colors text-sm font-semibold"
                      >
                        Read online
                        <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 2.66667H6C6.70724 2.66667 7.38552 2.94762 7.88562 3.44772C8.38572 3.94781 8.66667 4.62609 8.66667 5.33334V14.6667C8.66667 14.1362 8.456 13.6275 8.08093 13.2525C7.70587 12.8774 7.19713 12.6667 6.66667 12.6667H2V2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2.66667H10C9.29276 2.66667 8.61448 2.94762 8.11438 3.44772C7.61428 3.94781 7.33334 4.62609 7.33334 5.33334V14.6667C7.33334 14.1362 7.544 13.6275 7.91907 13.2525C8.29413 12.8774 8.80287 12.6667 9.33334 12.6667H14V2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <a 
                        href={`/cause-lists/${list.id}/download`}
                        className="h-9 flex items-center px-3 bg-[#01292D] text-white hover:bg-[#064E55] transition-colors text-sm font-semibold"
                      >
                        Download
                        <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 