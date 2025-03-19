import { useState, useEffect } from 'react';
import Image from 'next/image';

// Types for our spotlight data
interface SpotlightItem {
    id: number;
    title: string;
    imageUrl: string;
    caption: string;
}

// Mock data - this will be replaced with API data later
const mockSpotlights: SpotlightItem[] = [
    {
        id: 1,
        title: "Celebrating excellence in the judiciary",
        imageUrl: "/images/supremcourt.webp",
        caption: "Announcement of newly promoted judges"
    },
    {
        id: 2,
        title: "Judicial Service Excellence",
        imageUrl: "/images/notice.jpeg",
        caption: "Annual judicial service awards ceremony"
    },
    {
        id: 3,
        title: "Court Modernization",
        imageUrl: "/images/archive.jpeg",
        caption: "Launch of new digital court systems"
    }
];

export default function SpotlightCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mockSpotlights.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % mockSpotlights.length);
    };

    const previousSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + mockSpotlights.length) % mockSpotlights.length);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Title with gradient */}
            <div className="flex justify-center mb-8">
                <h2 className="w-[621.6px] h-[51px] text-center text-[32px] font-semibold leading-[160%] tracking-[-0.01em] font-inter bg-gradient-to-r from-[#01292D] to-[#71CED1] text-transparent bg-clip-text">
                    {mockSpotlights[currentSlide].title}
                </h2>
            </div>

            {/* Container with specific width to match Figma */}
            <div className="mx-auto" style={{ width: '673.6px' }}>
                <div className="relative bg-[#F3F5F8] p-9 rounded-lg">
                    {/* Main content */}
                    <div className="relative w-[601.6px] h-[329px] overflow-hidden rounded-lg bg-white mx-auto">
                        {mockSpotlights.map((spotlight, index) => (
                            <div
                                key={spotlight.id}
                                className={`absolute w-full h-full transition-opacity duration-500 ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={spotlight.imageUrl}
                                        alt={spotlight.caption}
                                        fill
                                        className="object-cover"
                                        priority={index === currentSlide}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Caption - centered below image */}
                    <p className="text-center italic text-lg mt-6 text-[#464646]">
                        {mockSpotlights[currentSlide].caption}
                    </p>

                    {/* Navigation arrows */}
                    <button
                        onClick={previousSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    {/* Navigation dots */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
                        {mockSpotlights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                    index === currentSlide 
                                        ? 'bg-[#64CCC5]' 
                                        : 'bg-[#01292D]'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 