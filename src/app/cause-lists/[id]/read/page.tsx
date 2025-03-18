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
            <h2 className="text-[#1E1D1D] text-[32px] font-bold mb-8">Cause Lists of other courts</h2>
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
                        <svg className="ml-1" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.29102 6.98317H3.04102L3.42435 5.88317H5.15768L5.55768 6.98317H6.29102L4.67435 2.68317H3.90768L2.29102 6.98317ZM3.64102 5.2665L4.27435 3.48317H4.30768L4.94102 5.2665H3.64102ZM8.95768 4.09984V2.9665C9.32435 2.81095 9.69935 2.69428 10.0827 2.6165C10.466 2.53873 10.8688 2.49984 11.291 2.49984C11.5799 2.49984 11.8632 2.52206 12.141 2.5665C12.4188 2.61095 12.691 2.6665 12.9577 2.73317V3.79984C12.691 3.69984 12.4216 3.62484 12.1493 3.57484C11.8771 3.52484 11.591 3.49984 11.291 3.49984C10.8688 3.49984 10.4632 3.55262 10.0743 3.65817C9.68546 3.76373 9.31324 3.91095 8.95768 4.09984ZM8.95768 7.7665V6.63317C9.32435 6.47761 9.69935 6.36095 10.0827 6.28317C10.466 6.20539 10.8688 6.1665 11.291 6.1665C11.5799 6.1665 11.8632 6.18873 12.141 6.23317C12.4188 6.27762 12.691 6.33317 12.9577 6.39984V7.4665C12.691 7.3665 12.4216 7.2915 12.1493 7.2415C11.8771 7.1915 11.591 7.1665 11.291 7.1665C10.8688 7.1665 10.4632 7.2165 10.0743 7.3165C9.68546 7.4165 9.31324 7.5665 8.95768 7.7665ZM8.95768 5.93317V4.79984C9.32435 4.64428 9.69935 4.52762 10.0827 4.44984C10.466 4.37206 10.8688 4.33317 11.291 4.33317C11.5799 4.33317 11.8632 4.35539 12.141 4.39984C12.4188 4.44428 12.691 4.49984 12.9577 4.5665V5.63317C12.691 5.53317 12.4216 5.45817 12.1493 5.40817C11.8771 5.35817 11.591 5.33317 11.291 5.33317C10.8688 5.33317 10.4632 5.38595 10.0743 5.4915C9.68546 5.59706 9.31324 5.74428 8.95768 5.93317ZM3.95768 8.1665C4.4799 8.1665 4.98824 8.22484 5.48268 8.3415C5.97713 8.45817 6.46879 8.63317 6.95768 8.8665V2.29984C6.50213 2.03317 6.01879 1.83317 5.50768 1.69984C4.99657 1.5665 4.4799 1.49984 3.95768 1.49984C3.55768 1.49984 3.16046 1.53873 2.76602 1.6165C2.37157 1.69428 1.99102 1.81095 1.62435 1.9665V8.5665C2.01324 8.43317 2.39935 8.33317 2.78268 8.2665C3.16602 8.19984 3.55768 8.1665 3.95768 8.1665ZM8.29102 8.8665C8.7799 8.63317 9.27157 8.45817 9.76602 8.3415C10.2605 8.22484 10.7688 8.1665 11.291 8.1665C11.691 8.1665 12.0827 8.19984 12.466 8.2665C12.8493 8.33317 13.2355 8.43317 13.6243 8.5665V1.9665C13.2577 1.81095 12.8771 1.69428 12.4827 1.6165C12.0882 1.53873 11.691 1.49984 11.291 1.49984C10.7688 1.49984 10.2521 1.5665 9.74102 1.69984C9.22991 1.83317 8.74657 2.03317 8.29102 2.29984V8.8665ZM7.62435 10.8332C7.09102 10.4109 6.51324 10.0832 5.89102 9.84984C5.26879 9.6165 4.62435 9.49984 3.95768 9.49984C3.49102 9.49984 3.03268 9.56095 2.58268 9.68317C2.13268 9.80539 1.70213 9.97762 1.29102 10.1998C1.05768 10.3221 0.832682 10.3165 0.616016 10.1832C0.399349 10.0498 0.291016 9.85539 0.291016 9.59984V1.5665C0.291016 1.44428 0.321571 1.32762 0.382682 1.2165C0.443793 1.10539 0.53546 1.02206 0.657682 0.966504C1.16879 0.699837 1.70213 0.499837 2.25768 0.366504C2.81324 0.233171 3.3799 0.166504 3.95768 0.166504C4.60213 0.166504 5.23268 0.249837 5.84935 0.416504C6.46602 0.583171 7.05768 0.833171 7.62435 1.1665C8.19102 0.833171 8.78268 0.583171 9.39935 0.416504C10.016 0.249837 10.6466 0.166504 11.291 0.166504C11.8688 0.166504 12.4355 0.233171 12.991 0.366504C13.5466 0.499837 14.0799 0.699837 14.591 0.966504C14.7132 1.02206 14.8049 1.10539 14.866 1.2165C14.9271 1.32762 14.9577 1.44428 14.9577 1.5665V9.59984C14.9577 9.85539 14.8493 10.0498 14.6327 10.1832C14.416 10.3165 14.191 10.3221 13.9577 10.1998C13.5466 9.97762 13.116 9.80539 12.666 9.68317C12.216 9.56095 11.7577 9.49984 11.291 9.49984C10.6243 9.49984 9.97991 9.6165 9.35768 9.84984C8.73546 10.0832 8.15768 10.4109 7.62435 10.8332Z" fill="currentColor"/>
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