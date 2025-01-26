import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isAnimating, setIsAnimating] = useState(false); // Animation state

  const ToOrder = () => {
    navigate('/order');
  };

  const ToHome = () => {
    navigate('/home');
  };

  const ToProduct = () => {
    navigate('/products');
  };

  const handleConnect = () => {
    if (!message.trim()) {
      setError(true);
      return;
    }

    setError(false);
    const phoneNumber = '918111866093';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setMessage('');
  };

  const toggleModal = () => {
    if (isModalOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setIsModalOpen(false);
      }, 700); // Match the duration of the animation
    } else {
      setIsModalOpen(true);
      setTimeout(() => setIsAnimating(true), 10); // Add a small delay to trigger animation
    }
  };

  return (
    <>
      <footer className="bg-yellow-500 md:py-16 py-8 px-5 md:px-10 text-black font-dm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <img src="/assets/image.png" alt="Logo" className="w-[80px] md:w-[100px] max-h-[60px]" />
          </div>

          {/* About Section */}
          <div className="font-light">
            <h3 className="font-light mb-4">About Centrose</h3>
            <ul className="space-y-2">
              <li>
                <p className="hover:underline text-gray-900" onClick={ToHome}>
                  Home
                </p>
              </li>
              <li>
                <p className="hover:underline text-gray-900">Search</p>
              </li>
              <li>
                <p
                  className="hover:underline text-gray-900 cursor-pointer"
                  onClick={toggleModal}
                >
                  FAQs
                </p>
              </li>
            </ul>
          </div>

          {/* Product Section */}
          <div className="font-light">
            <h3 className="font-light mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <p className="hover:underline text-gray-900" onClick={ToProduct}>
                  Products
                </p>
              </li>
              <li>
                <p className="hover:underline text-gray-900">Featured</p>
              </li>
              <li>
                <p className="hover:underline text-gray-900" onClick={ToOrder}>
                  Order
                </p>
              </li>
            </ul>
          </div>

          {/* Subscription Section */}
          <div className="font-light">
            <h3 className="font-light mb-4">Contact to Us ?</h3>
            <p className="mb-4 text-gray-900">
              Contact our team members; we are ready to help you!
            </p>
            <div className="flex md:flex-col lg:flex-row">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className={`flex-grow px-4 py-2 text-black rounded-l-md ${error ? 'border-red-500 border' : ''
                  }`}
                required
              />
              <button
                className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-r-md"
                onClick={handleConnect}
              >
                Connect
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">Message is required.</p>}
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[80] flex items-center justify-center">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96 transform transition-transform duration-700 ease-in-out ${
              isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800">FAQs</h3>
            <p className="text-gray-700 mb-2">1. We sell a variety of fresh flowers for all occasions.</p>
            <p className="text-gray-700 mb-2">2. Delivery is available across the city within 24 hours.</p>
            <p className="text-gray-700 mb-4">3. Bulk orders receive special discounts.</p>
            <button
              className="bg-[#004F44] hover:bg-[#004f35] text-white py-2 px-4 rounded-lg w-full"
              onClick={toggleModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
