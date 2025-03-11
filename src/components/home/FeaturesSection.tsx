import Link from 'next/link';
import Image from 'next/image';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Cause Lists',
      description: 'Quickly access schedules and details for all ongoing and upcoming court proceedings in Ghana.',
      image: '/images/ghana.png',
      link: '/cause-lists',
      linkText: 'View Cause Lists',
      buttonClassName: 'px-4 py-2 bg-red-100 text-gray-700 font-medium inline-flex items-center rounded hover:bg-red-200 transition-colors'
    },
    {
      title: 'Notices',
      description: 'Stay ahead with official updates, policy changes, and judicial announcements straight from the courts.',
      image: '/images/notice.jpeg',
      link: '/notices',
      linkText: 'Browse Notices',
      buttonClassName: 'px-4 py-2 bg-blue-100 text-gray-700 font-medium inline-flex items-center rounded hover:bg-blue-200 transition-colors'
    },
    {
      title: 'Archives',
      description: 'Dive into a well-organized archive of past legal bulletins, case outcomes, old Gazettes, and more.',
      image: '/images/archive.jpeg',
      link: '/archives',
      linkText: 'Explore Archives',
      buttonClassName: 'px-4 py-2 bg-amber-100 text-gray-700 font-medium inline-flex items-center rounded hover:bg-amber-200 transition-colors'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="mb-6 relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#01292D] mb-3">{feature.title}</h3>
              <p className="text-[#464646] mb-6 flex-grow">{feature.description}</p>
              <Link 
                href={feature.link}
                className={feature.buttonClassName}
              >
                {feature.linkText}
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

export default FeaturesSection; 