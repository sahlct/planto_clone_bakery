import React from 'react';

export function SearchBar() {
    return (
        <div className='md:mb-10 mb-0 h-[100px] bg-[#f3fff3] w-full flex justify-center items-center space-x-2 md:px-4 px-0'>
            <div className='border-2 border-[#004F44]  w-[40px] h-[40px] flex justify-center items-center rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-horizontal">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 6l8 0" />
                    <path d="M16 6l4 0" />
                    <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 12l2 0" />
                    <path d="M10 12l10 0" />
                    <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 18l11 0" />
                    <path d="M19 18l1 0" />
                </svg>
            </div>
            <div className='relative w-1/2'>
                <input
                    type="search"
                    placeholder="Search Flowers ..."
                    className='w-full h-[40px] px-4 rounded-md border-2 border-[#004F44] focus:outline-none focus:border-[#21786c] transition-colors'
                />
            </div>
            <div className='border-2 border-[#004F44] w-[40px] h-[40px] flex justify-center items-center rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
            </div>
        </div>
    );
}
