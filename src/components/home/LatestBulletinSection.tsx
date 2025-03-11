import Link from 'next/link';

const LatestBulletinSection = () => {
  const bulletins = [
    {
      title: 'Practice Direction - Virtual Court Session',
      description: 'Being guided by the provisions of Article 125 (4) of the Constitution, 1992, Section 69 (1) of the Courts Act 1993 Act 459 and Orders 38 Rule.',
      date: '09/01/2024',
      volume: 'Vol. 1'
    },
    {
      title: 'Appointment of Supreme Court Justices',
      description: 'In exercise of the powers vested in the President of the Republic of Ghana under the 1992 Constitution under Article 144(2), the following...',
      date: '09/01/2024',
      volume: 'Vol. 1'
    },
    {
      title: 'Temporary Closure of Ada Courts',
      description: 'The attention of the Honourable Lady Chief Justice has been drawn to a general water crisis being faced by residents of Ada.',
      date: '09/01/2024',
      volume: 'Vol. 1'
    },
    {
      title: 'GBA Notice to All Lawyers',
      description: 'It is notified for lawyers that the mandatory requirement under Regulation 84 of the Legal Profession (Professional Conduct and Etiquette).',
      date: '09/01/2024',
      volume: 'Vol. 1'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest GhCourt Bulletin</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bulletins.map((bulletin, index) => (
            <div key={index} className="bg-[#F9FAFB] rounded-lg w-[304px] min-h-[272px] p-3">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-[#FEF7E9] text-[#01292D] text-sm font-medium px-2 py-1 rounded">
                  GhCourt Bulletin {bulletin.volume}
                </span>
                <span className="bg-[#EBF3FF] text-[#01292D] text-sm font-medium px-2 py-1 rounded">
                  {bulletin.date}
                </span>
              </div>
              <h3 className="text-[#01292D] text-2xl font-bold mb-4">{bulletin.title}</h3>
              <p className="text-[#464646] text-base mb-6">{bulletin.description}</p>
              <Link
                href={`/bulletin/${bulletin.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#01292D] font-medium hover:opacity-80 inline-flex items-center bg-[#01292D] text-[#9CDAD6] px-4 py-2"
              >
                Learn more
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBulletinSection; 