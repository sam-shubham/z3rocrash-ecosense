"use client";
import React, { useState } from "react";
import { Leaf, Battery, RecycleIcon } from "lucide-react";

const SustainableShopping = () => {
  const [sortBy, setSortBy] = useState("score");

  const products = [
    {
      id: 1,
      name: "Bamboo Water Bottle",
      description: "100% biodegradable bamboo bottle with steel interior",
      price: 24.99,
      sustainabilityScore: 95,
      features: ["Biodegradable", "Plastic-free", "Carbon neutral production"],
      category: "Home & Kitchen",
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      description: "Fair trade certified cotton, natural dyes",
      price: 29.99,
      sustainabilityScore: 90,
      features: ["Organic materials", "Fair trade", "Natural dyes"],
      category: "Clothing",
    },
    {
      id: 3,
      name: "Solar Power Bank",
      description: "10000mAh battery with solar charging capability",
      price: 45.99,
      sustainabilityScore: 85,
      features: ["Solar powered", "Recycled materials", "Long lifespan"],
      category: "Electronics",
    },
    {
      id: 4,
      name: "Reusable Produce Bags",
      description: "Set of 5 mesh bags made from recycled materials",
      price: 15.99,
      sustainabilityScore: 98,
      features: ["Zero waste", "Washable", "Recycled materials"],
      category: "Shopping",
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-green-400";
    return "bg-green-300";
  };

  const getSustainabilityIcon = (score) => {
    if (score >= 90) return <Leaf className="h-6 w-6 text-green-600" />;
    if (score >= 80) return <RecycleIcon className="h-6 w-6 text-green-500" />;
    return <Battery className="h-6 w-6 text-green-400" />;
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "score")
      return b.sustainabilityScore - a.sustainabilityScore;
    if (sortBy === "price") return a.price - b.price;
    return 0;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto text-black bg-white">
      <style>{`body{background-color:white}`}</style>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Sustainable Shopping Guide</h1>
        <div className="flex items-center gap-4">
          <label className="font-medium">Sort by:</label>
          <select
            className="border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="score">Sustainability Score</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-500">{product.category}</p>
                </div>
                {getSustainabilityIcon(product.sustainabilityScore)}
              </div>
            </div>

            <div className="p-6 pt-0 flex-grow">
              <p className="mb-4">{product.description}</p>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Sustainability Score:</span>
                  <span
                    className={`px-2 py-1 rounded text-white ${getScoreColor(
                      product.sustainabilityScore
                    )}`}
                  >
                    {product.sustainabilityScore}/100
                  </span>
                </div>
                <ul className="list-disc list-inside">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-between items-center w-full">
                <span className="text-xl font-bold">${product.price}</span>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SustainableShopping;
