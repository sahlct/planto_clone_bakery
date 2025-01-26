import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function Featured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const gotoProducts = () => {
    navigate("/products");
  };

  const singleItem = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/customer/featured-products`
        );
        const data = await response.json();

        if (data.success) {
          const formattedProducts = data.data.products_skus.map((product) => ({
            id: product._id,
            name: product.M06_product_sku_name,
            price: product.M06_price,
            src: product.M06_thumbnail_image,
            variations: product.Variations || [],
          }));
          setProducts(formattedProducts);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  const isProductInLocalStorage = (productId) => {
    const storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    return storedProducts.some((product) => product.id === productId);
  };

  const handleBuyProduct = (product) => {
    const storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    const existingProductIndex = storedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex >= 0) {
      storedProducts[existingProductIndex].quantity += 1;
    } else {
      const newProduct = { ...product, quantity: 1 };
      storedProducts.push(newProduct);
    }
    console.log("fetured",storedProducts);
    localStorage.setItem("purchasedProducts", JSON.stringify(storedProducts));
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveProduct = (productId) => {
    let storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    const productIndex = storedProducts.findIndex(
      (product) => product.id === productId
    );

    if (productIndex >= 0) {
      if (storedProducts[productIndex].quantity > 1) {
        storedProducts[productIndex].quantity -= 1;
      } else {
        storedProducts = storedProducts.filter(
          (product) => product.id !== productId
        );
      }
    }

    localStorage.setItem("purchasedProducts", JSON.stringify(storedProducts));
    toast.success("Product removed from cart.");
  };

  // text-[#004F44] 

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white md:pt-10 pt-5 font-dm">
        <div className=" flex text-yellow-700 justify-between w-full md:px-20 px-10 py-5">
          <h1 className="md:text-4xl text-2xl">Featured</h1>
          <h6 onClick={gotoProducts} className="cursor-pointer">
            View all
          </h6>
        </div>

        {loading ? (
          // Loader displayed while loading
          <div className="flex justify-center items-center h-48">
            <div className="loader">
              <li className="ball"></li>
              <li className="ball"></li>
              <li className="ball"></li>
            </div>
          </div>
        ) : (
          // Products displayed once loaded
          <div className="relative">
            <div
              className="cardContainer w-full md:px-10 px-5 py-5 overflow-x-auto scrollbar-hide"
              ref={scrollRef}
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
                {products.map((product) => {
                  const sizes = product.variations
                    .filter((variation) => variation.M08_name === "Size")
                    .map((variation) => variation.M09_name);
                  const colors = product.variations
                    .filter((variation) => variation.M08_name === "Color")
                    .map((variation) => variation.M09_name);

                  const inCart = isProductInLocalStorage(product.id);

                  return (
                    <div
                      key={product.id}
                      onClick={() => singleItem(product.id)}
                      className="card cursor-pointer bg-white sm:p-4 p-3 shadow-xl"
                    >
                      <div className="h-[120px] sm:h-[220px] md:h-[240px] lg:h-[280px]">
                        <img
                          src={product.src}
                          alt={product.name}
                          className="object-cover h-full w-full rounded"
                        />
                      </div>
                      <div className="data mt-4 font-dm flex justify-between text-yellow-700">
                        <h1 className="sm:text-xl text-sm">{product.name}</h1>
                        <h4 className="sm:text-lg text-sm font-semibold text-right">QAR {product.price}</h4>
                      </div>
                      <div className="flex justify-between flex-col sm:flex-row">
                        <div className="variations flex flex-col space-y-1 sm:mt-4 mt-2 items-start">
                          {/* Sizes */}
                          <div className="size flex space-x-2 items-center">
                            <p className="sm:text-sm text-xs">Sizes:</p>
                            <div className="flex space-x-2">
                              {/* {sizes.length > 0 ? (
                                sizes.map((size, index) => ( */}
                                  <div
                                    // key={index}
                                    className="border border-black h-[15px] w-[15px] rounded-full flex items-center justify-center text-[10px]"
                                  >
                                    S
                                  </div>
                                  <div
                                    // key={index}
                                    className="border border-black h-[15px] w-[15px] rounded-full flex items-center justify-center text-[10px]"
                                  >
                                    M
                                  </div>
                                  <div
                                    // key={index}
                                    className="border border-black h-[15px] w-[15px] rounded-full flex items-center justify-center text-[10px]"
                                  >
                                    L
                                  </div>
                                {/* )))
                               : (
                                <span className="text-xs">N/A</span>
                              )} */}
                            </div>
                          </div>

                          {/* Colors */}
                          {/*<div className="color flex space-x-2 items-center">
                            <p className="sm:text-sm text-xs">Colors:</p>
                            <div className="flex space-x-2">
                              {colors.length > 0 ? (
                                colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="h-[15px] w-[15px] rounded-full border border-black flex items-center justify-center text-[10px]"
                                    style={{
                                      backgroundColor: color.toLowerCase(),
                                    }}
                                  ></div>
                                ))
                              ) : (
                                <span className="text-xs">N/A</span>
                              )}
                            </div>
                          </div>*/}
                        </div>

                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            inCart
                              ? handleRemoveProduct(product.id)
                              : handleBuyProduct(product);
                            setProducts([...products]); // Trigger re-render
                          }}
                          className={`w-full sm:w-auto text-white text-base sm:text-lg px-4 sm:py-2 py-1 mt-4 rounded ${
                            inCart ? "bg-red-500" : "bg-[#004F44]"
                          }`}
                        >
                          {inCart ? "Remove" : "Buy"}
                        </button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .loader {
          width: 60px;
          display: flex;
          justify-content: space-evenly;
        }
        .ball {
          list-style: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #004f44;
        }
        .ball:nth-child(1) {
          animation: bounce-1 2.1s ease-in-out infinite;
        }
        .ball:nth-child(2) {
          animation: bounce-3 2.1s ease-in-out 0.3s infinite;
        }
        .ball:nth-child(3) {
          animation: bounce-3 2.1s ease-in-out 0.6s infinite;
        }
        @keyframes bounce-1 {
          50% {
            transform: translateY(-18px);
            background-color: aqua;
          }
        }
        @keyframes bounce-3 {
          50% {
            transform: translateY(-18px);
            background-color: aqua;
          }
        }
      `}</style>
    </>
  );
}
