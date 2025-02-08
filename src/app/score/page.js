"use client";

import { useState } from "react";
import { calculateSustainabilityScore } from "@/actions/sustaniblityscore";

export default function SustainabilityScore() {
  const [score, setScore] = useState(null);
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    carbon: 50,
    recyclability: 50,
    packaging: 50,
    energy: 50,
    ethics: 50,
    chemistry: 50,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const analyzeProduct = async () => {
    setLoading(true);
    const result = await calculateSustainabilityScore(formData);
    setScore(result.score);
    setRating(result.rating);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl w-full max-w-md mx-auto text-center shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🌿 Sustainability Score</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className="w-full px-2 py-1 bg-gray-800 text-white rounded-md border border-gray-600"
              min="0"
              max="100"
            />
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-yellow-400">Calculating...</p>
      ) : score !== null ? (
        <div className="mt-4">
          <p className="text-4xl font-bold">{score || 0}/100</p>
          <p
            className={`text-lg font-semibold ${
              rating.includes("Excellent")
                ? "text-green-400"
                : rating.includes("Average")
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {rating}
          </p>
        </div>
      ) : (
        <button
          onClick={analyzeProduct}
          className="bg-green-500 px-4 py-2 rounded mt-4 hover:bg-green-600"
        >
          Analyze Product 🌱
        </button>
      )}
    </div>
  );
}
