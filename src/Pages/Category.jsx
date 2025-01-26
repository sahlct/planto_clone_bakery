import React, { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/customer/product-category?page=1&limit=15`
        );
        const result = await response.json();

        if (result.success) {
          // Set categories from the API response
          setCategories(result.data.productCategories);
        } else {
          console.error("Failed to fetch categories:", result.msg);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // text-[#004F44] 

  return (
    <div className="w-full overflow-x-auto scrollbar-hide font-dm">
      <div className="flex md:space-x-8 space-x-4 pt-12 md:pt-12 py-3 md:py-5 px-4">
        {categories.map((category) => (
          <button
            key={category._id}
            className="relative flex-shrink-0 bg-gray-200 text-yellow-700  rounded-lg hover:bg-gray-300 transition duration-200
            text-sm md:text-lg font-light md:px-8 px-4 py-1 w-auto flex flex-col items-center justify-center"
          >
            {/* Decorative Circle */}
            <div className="absolute -top-6 md:-top-11 w-12 h-12 md:w-20 md:h-20 bg-white border border-gray-300 rounded-full flex items-center justify-center">
              <img
                src={category.M04_image}
                alt={category.M04_category_name}
                className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full"
              />
            </div>
            {/* Button Text */}
            <span className="pt-6 md:pt-8">{category.M04_category_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
