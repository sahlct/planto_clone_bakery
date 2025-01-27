import React, { useState } from 'react';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const goToCart = () => {
        navigate('/order');
    };

    const gotoProducts = () => {
        navigate('/products');
    };

    const gotoHome = () => {
        navigate('/home');
    };
    // bg-[#004F44]  

    return (
        <>
            {/* Main Navbar */}
            <div className='h-20 fixed top-0 w-full z-50 text-white bg-[#004F44]  flex justify-between items-center px-4 md:px-14 font-dm'>
                {/* Mobile Menu Button */}
                <button className='md:hidden' onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>

                {/* Logo */}
                <div
                    className='absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none cursor-pointer'
                    onClick={gotoHome}
                >
                    <img
                        src="/assets/image.png"
                        alt="logo"
                        className='w-[80px] h-[45px] md:w-[90px] max-h-[65px]'
                    />
                </div>

                {/* Mobile Cart Icon */}
                <div className='md:hidden'>
                    <ShoppingCart size={24} onClick={goToCart} style={{ cursor: 'pointer' }} />
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex gap-10'>
                    <div>Shop</div>
                    <div onClick={gotoProducts} className='cursor-pointer'>Products</div>
                    <div>Guide</div>
                </div>

                {/* Desktop Icons */}
                <div className='hidden md:flex gap-5'>
                    <Search size={24} />
                    <User size={24} />
                    <ShoppingCart size={24} onClick={goToCart} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-[60] ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
                        <button onClick={toggleSidebar} className="text-gray-600">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <nav className="space-y-4">
                        <p className="block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded">
                            Shop
                        </p>
                        <p
                            onClick={gotoProducts}
                            className="block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                        >
                            Products
                        </p>
                        <p className="block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded">
                            Guide
                        </p>
                        <p className="block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded">
                            Search
                        </p>
                        <p className="block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded">
                            User
                        </p>
                        <p
                            onClick={goToCart}
                            className=" block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                        >
                            Order
                        </p>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}
