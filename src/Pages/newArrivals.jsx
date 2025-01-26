import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import from lucide-react

export function NewArrivals() {
    const flowers = [
        {
            src: '/assets/arrival_2.jpg',
            header: 'Sugar Buns'
        },
        {
            src: '/assets/arrival_3.jpg',
            header: 'Hot Creamy Puffs'
        },
        {
            src: '/assets/arrival_4.jpg',
            header: 'Bream Buns'
        },
        {
            src: '/assets/arrival_1.jpg',
            header: 'Choco Biscuts'
        }
    ];

    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    // Handle scroll event to toggle arrow visibility
    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    };

    // Scroll smoothly by the width of one card
    const scroll = (direction) => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.firstChild.clientWidth + 24; // 24px for the gap between cards
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -cardWidth : cardWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="bg-white md:py-20 py-10 font-dm">
            <div className="text-yellow-700 flex justify-between w-full md:px-20 px-5 py-0">
                <h1 className="md:text-4xl text-2xl">Premiume Bakes</h1>
                <h6>View all</h6>
            </div>

            <div className="relative">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
                        onClick={() => scroll('left')}
                    >
                        <ChevronLeft className="h-6 w-6 text-[#004F44]" />
                    </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
                        onClick={() => scroll('right')}
                    >
                        <ChevronRight className="h-6 w-6 text-[#004F44]" />
                    </button>
                )}

                {/* Card Container */}
                <div
                    className="w-full overflow-x-auto px-4 md:px-20 py-5 flex space-x-6 scrollbar-hide"
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    {/* Map over flowers array and render cards */}
                    {flowers.map((flower, index) => (
                        <div
                            key={index}
                            className="group relative min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] xl:min-w-[300px] overflow-hidden rounded-lg shadow-lg cursor-pointer"
                        >
                            {/* Card Image */}
                            <img
                                src={flower.src}
                                alt={flower.header}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay with Header and Info */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <h2 className="text-white text-2xl font-semibold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500">
                                    {flower.header}
                                </h2>
                                <p className="text-white mt-2 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500">
                                    more information →
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
