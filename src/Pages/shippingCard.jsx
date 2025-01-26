import { Mail, Phone } from 'lucide-react'
import React from 'react'

export function ShippingCard() {
    return (
        <>
            <div className='h-[300px] md:my-20 my-10 md:mx-20 mx-5 flex flex-col sm:flex-row sm:gap-0 gap-5 font-dm'>
                <div className='md:h-[300px] w-full sm:w-3/4 md:px-10 px-2 py-2 md:py-0 flex flex-col gap-8 justify-center'
                    style={{ background: 'url(https://t4.ftcdn.net/jpg/07/84/06/23/240_F_784062346_UKO8FYABQULsFBL1COIzmrFmjztouh9V.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div className='px-2 md:px-0 '>
                        <h1 className='md:text-3xl text-lg font-chillax text-gray-300'>Free Shipping Services</h1>
                        <h6 className='md:text-xl text-sm font-chillax text-gray-300'>only for this region</h6>
                    </div>
                    <div className='flex flex-col gap-1 px-2 md:px-0 text-sm sm:text-base'>
                        <p className='flex text-xs sm:text-base items-center font-light'>
                            <Phone strokeWidth={1} />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className='md:max-w-[20px] max-w-[10px] md:max-h-[20px] max-h-[10px] ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg> */}
                            <span className='ms-2 '>+91 9998234598</span>
                        </p>
                        <p className='flex text-xs sm:text-base items-center font-light'>
                            <Mail strokeWidth={1} />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className='md:w-[20px] w-[10px] md:h-[20px] h-[10px] ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> */}
                            <span className='ms-2'>planto123@gmail.com</span>
                        </p>
                    </div>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230886.62908183562!2d51.34718167065582!3d25.28391755359182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sin!4v1731581605760!5m2!1sen!2sin" height="300" title='hi'  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    )
}
