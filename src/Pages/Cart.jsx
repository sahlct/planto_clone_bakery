import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [zone, setZone] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [doorNumber, setDoorNumber] = useState("");

  // Page refresh logic
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    setProducts(storedProducts);
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);

  const handleBackToCart = () => navigate("/home");

  // Calculate total price
  const getTotalPrice = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Update product quantity
  const updateQuantity = (id, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("purchasedProducts", JSON.stringify(updatedProducts));
  };

  // Handle order placement
  const handleOrderNow = () => {
    if (!name || !contactNumber || !zone) {
      toast.error("Please fill in all required fields!");
      return;
    }
  
    let message = `🌻 CADRE Flower Shoppee 🌻\n\n`;
    message += `---------------------------------\n 🛒 Ordered Item's\n---------------------------------\n`;
  
    products.forEach((product, index) => {
      message += `${index + 1}. Name: ${product.name}\n    Price: $${product.price}\n    Quantity: ${product.quantity}\n\n`;
    });
  
    const subtotal = getTotalPrice().toFixed(2);
    message += `--------------------------------\nTotal : $${subtotal}/-\n--------------------------------\n\n`;
  
    message += `👤 Customer Details\n`;
    message += `Name: ${name}\n`;
    message += `Contact: ${contactNumber}\n`;
    message += `Zone: ${zone}\n`;
    message += `Street: ${street || "N/A"}\n`;
    message += `Building: ${building || "N/A"}\n`;
    message += `Door Number: ${doorNumber || "N/A"}\n\n`;
  
    message += `🎉Happy Purchasing!🎉\n--------------------------------`;
  
    const whatsappUrl = `https://wa.me/918111866093?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Product Information Section */}
      <div className="w-full lg:w-1/2 bg-[#f3fff3] flex flex-col">
        <div className="p-5 lg:p-10 flex-shrink-0">
          <button
            onClick={handleBackToCart}
            className="text-sm text-gray-600 mb-4 lg:mb-8"
          >
            &larr; Back to Order
          </button>
          <h2 className="text-xl font-semibold mb-2 text-[#004F44]">
            Product Information & Review
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            By placing your order, you agree to Storelo's{" "}
            <span className="text-blue-500 underline">Privacy</span> and{" "}
            <span className="text-blue-500 underline">Policy</span>.
          </p>
        </div>

        <div className="px-5 lg:px-10 pb-10 overflow-y-auto flex-grow scrollbar-thin">
          {isLoading ? (
            <div className="loader flex justify-center items-center">
              <li className="ball"></li>
              <li className="ball"></li>
              <li className="ball"></li>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-lg text-gray-500 mb-4">No products available</p>
              <button
                onClick={() => navigate("/products")}
                className="px-4 py-2 bg-[#004F44] text-white rounded-lg"
              >
                Go to purchase
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative p-4 border border-[#004F44] rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedProducts = products.filter((p) => p.id !== product.id);
                      setProducts(updatedProducts);
                      localStorage.setItem("purchasedProducts", JSON.stringify(updatedProducts)); // Update localStorage
                    }}
                    className="absolute text-2xl top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                  </button>

                  <div className="flex items-center space-x-10">
                    <img
                      src={product.src}
                      alt={product.name}
                      className="w-16 h-16 mr-4 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">Price: ${product.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          className="w-8 h-8 bg-gray-200 rounded text-lg font-bold"
                          onClick={() =>
                            updateQuantity(product.id, Math.max(1, product.quantity - 1))
                          }
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">{product.quantity}</span>
                        <button
                          className="w-8 h-8 bg-gray-200 rounded text-lg font-bold"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shipping Details Section */}
      <div className="w-full lg:w-1/2 bg-white px-5 sm:pt-10 pt-5 pb-5">
        <h2 className="text-xl font-semibold mb-4 text-[#004F44]">Shipping Details</h2>
        <p className="text-gray-500 text-sm mb-6">
          Complete your purchase by providing your shipping details.
        </p>

        <div className="gap-2 flex flex-wrap">
          <div className="w-full sm:w-[48%]">
            <label className="block text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label className="block text-gray-700">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label className="block text-gray-700">
              Zone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="Enter your zone"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label className="block text-gray-700">Street</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Enter your street"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label className="block text-gray-700">Building</label>
            <input
              type="text"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder="Enter your building"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label className="block text-gray-700">Door Number</label>
            <input
              type="text"
              value={doorNumber}
              onChange={(e) => setDoorNumber(e.target.value)}
              placeholder="Enter your door number"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="w-full flex justify-between font-semibold sm:mt-10 mt-5">
          <span>Total</span>
          <span className="ms-2">QAR {getTotalPrice().toFixed(2)}</span>
        </div>

        <button
          onClick={handleOrderNow}
          className="w-full bg-[#004F44] text-white p-3 rounded-lg mt-6"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
