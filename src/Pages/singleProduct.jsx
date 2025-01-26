import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export function SingleProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [variations, setVariations] = useState([]);
  const [skusWithVariations, setskusWithVariations] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [selectedSkuId, setSelectedSkuId] = useState(id);
  const navigate = useNavigate();

  const loadVariations = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/customer/variation-by-product-id/${id}`
      );
      const { data } = response;
      if (data.success) {
        setVariations(data.data);
        return data.data;
      }
    } catch (error) {
      console.error("Error fetching product variations:", error);
    }
  };

  const loadSkusWithVariations = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/customer/skus-variation-by-product-id/${id}`
      );
      const { data } = response;
      if (data.success) {
        setskusWithVariations(data.data);
        return data.data;
      }
    } catch (error) {
      console.error("Error fetching product skus with variations:", error);
    }
  };

  const handleVariationChange = (variationId, optionId) => {
    const selectedVariationsI = {
      ...selectedVariations,
      [variationId]: optionId,
    };
    setSelectedVariations(selectedVariationsI);
    const skuId = findSkuId(skusWithVariations, selectedVariationsI);
    navigate(`/products/${skuId}`, { replace: true });
    setSelectedSkuId(skuId);
  };

  const findSkuId = (skusWithVariations, selectedVariations) => {
    const matchingSku = skusWithVariations.find((sku) =>
      sku.variations.every(
        (v) =>
          selectedVariations[v._id] &&
          selectedVariations[v._id] === v.options._id
      )
    );
    return matchingSku ? matchingSku.skuId : null;
  };

  const initializeSelectedVariations = (productData, variations) => {
    const defaultSelections = {};

    if (productData?.Variations?.length > 0) {
      productData.Variations.forEach((productVariation) => {
        defaultSelections[productVariation.M10_M08_product_variation_id] =
          productVariation.M10_M09_variation_option_id;
      });
    }

    variations.forEach((variation) => {
      if (!defaultSelections[variation._id] && variation.options?.length > 0) {
        defaultSelections[variation._id] = variation.options[0]._id;
      }
    });

    setSelectedVariations(defaultSelections);
    return defaultSelections;
  };

  const fetchProductData = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/customer/product-sku/${id}`
      );
      const data = response.data.data;
      setProductData(data);

      setMainImage(data.Images[0]?.M07_image_path || data.M06_thumbnail_image);

      const storedProducts =
        JSON.parse(localStorage.getItem("purchasedProducts")) || [];
      setInCart(storedProducts.some((product) => product.id === data._id));
      const existingProduct = storedProducts.find(
        (product) => product.id === data._id
      );

      if (existingProduct) {
        setInCart(true);
        setQuantity(existingProduct.quantity || 1);
      } else {
        setQuantity(1);
      }

      const [variations, skusWithVariations] = await Promise.all([
        loadVariations(response.data.data.M06_M05_product_id),
        loadSkusWithVariations(response.data.data.M06_M05_product_id),
      ]);

      if (variations && skusWithVariations) {
        const selectedVariations = initializeSelectedVariations(
          data,
          variations
        );
        const selectedSkuId = findSkuId(skusWithVariations, selectedVariations);
        console.log(selectedSkuId);
        setSelectedSkuId(selectedSkuId);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData(selectedSkuId);
  }, [selectedSkuId]);

  const handleAddToCart = () => {
    let storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    const productIndex = storedProducts.findIndex(
      (product) => product.id === productData._id
    );

    if (productIndex !== -1) {
      storedProducts[productIndex].quantity = quantity;
    } else {
      const newProduct = {
        id: productData._id,
        name: productData.M06_product_sku_name,
        price: productData.M06_price,
        src: productData.M06_thumbnail_image,
        quantity: quantity,
        variations: productData.Variations || [],
      };
      storedProducts.push(newProduct);
    }

    localStorage.setItem("purchasedProducts", JSON.stringify(storedProducts));
    setInCart(true);
    toast.success(`${productData.M06_product_sku_name} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    let storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    storedProducts = storedProducts.filter(
      (product) => product.id !== productData._id
    );
    localStorage.setItem("purchasedProducts", JSON.stringify(storedProducts));
    setInCart(false);
    toast.success(`${productData.M06_product_sku_name} removed from cart.`);
  };

  const syncQuantityWithLocalStorage = () => {
    const storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    const existingProduct = storedProducts.find(
      (product) => product.id === productData._id
    );

    if (existingProduct) {
      setQuantity(existingProduct.quantity);
    }
  };

  useEffect(() => {
    if (productData) {
      syncQuantityWithLocalStorage();
    }
  }, [productData]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateLocalStorageQuantity(newQuantity);
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      updateLocalStorageQuantity(newQuantity);
      return newQuantity;
    });
  };

  const updateLocalStorageQuantity = (newQuantity) => {
    let storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    const productIndex = storedProducts.findIndex(
      (product) => product.id === productData._id
    );

    if (productIndex !== -1) {
      storedProducts[productIndex].quantity = newQuantity;
      localStorage.setItem("purchasedProducts", JSON.stringify(storedProducts));
    }
  };

  const goToOrders = () => {
    navigate("/products");
  };

  const goToOrder = () => {
    navigate("/order");
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-5 pt-24 font-dm">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid md:grid-cols-2 gap-4 md:h-[calc(100vh-6rem)]">
        {/* Image and Thumbnails Section */}
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="flex flex-col space-y-4 md:max-h-full">
            {/* Main Image with Fixed Sizing and Centered */}

            <div className="md:flex-grow md:flex md:items-center md:justify-center">
              <div className="max-w-[400px] max-h-[400px] h-[300px] md:flex md:items-center md:justify-center">
                <img
                  src={mainImage}
                  alt="Main product"
                  className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out transform hover:scale-105"
                  key={mainImage}
                />
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-4 justify-center items-center overflow-x-auto">
            {productData.Images.map((image, index) => (
              <img
                key={image._id}
                src={image.M07_image_path}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer ${
                  mainImage === image.M07_image_path
                    ? "ring-1 ring-[#004F44]"
                    : ""
                }`}
                onClick={() => setMainImage(image.M07_image_path)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:overflow-y-auto md:pr-4 md:h-full">
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-xl font-bold text-[#004F44]">
                {productData.M06_product_sku_name}
              </h2>
              <div className="text-lg text-gray-500 line-through">
                QAR {productData.M06_MRP}
              </div>
              <div className="text-xl font-bold text-red-500">
                QAR {productData.M06_price}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Description:</h3>
              <p className="text-gray-600">
                {productData.M06_description}
                <span className="text-blue-600 cursor-pointer"> See More</span>
              </p>
            </div>

            {/* Size Variations */}
            <div className="space-y-2">
              <div className="flex space-y-2 flex-col">
                {variations.map((variation) => (
                  <div key={variation._id}>
                    <h4 className="text-lg font-semibold">
                      {variation.M08_name}:
                    </h4>
                    <div className="flex space-x-2">
                      {variation.options.map((option) => (
                        <button
                          key={option._id}
                          className={`w-10 h-10 border border-gray-300 rounded ${
                            selectedVariations[variation._id] === option._id
                              ? "bg-[#004F44] text-white"
                              : ""
                          }`}
                          onClick={() =>
                            handleVariationChange(variation._id, option._id)
                          }
                        >
                          {option.M09_name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Control */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Quantity:</h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-4">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {inCart ? (
                <button
                  onClick={handleRemoveFromCart}
                  className="w-full bg-red-500 text-white py-2 rounded"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#004F44] hover:bg-[#004f2af1] text-white py-2 rounded"
                >
                  Add to Cart
                </button>
              )}
              <div className="d-flex sm:space-x-2 space-y-2 sm:space-y-0">
                <button
                  className="sm:w-[49%] w-full border border-[#004F44] text-[#004F44] py-2 rounded hover:bg-[#004F44] hover:text-white"
                  onClick={goToOrders}
                >
                  Next product
                </button>
                <button
                  className="sm:w-[49%] w-full border border-[#004F44] text-[#004F44] py-2 rounded hover:bg-[#004F44] hover:text-white"
                  onClick={goToOrder}
                >
                  Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
