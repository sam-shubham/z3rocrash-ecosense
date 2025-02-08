"use server";

export async function calculateSustainabilityScore(data) {
  const weightage = {
    carbon: 0.3,
    recyclability: 0.15,
    packaging: 0.1,
    energy: 0.15,
    ethics: 0.15,
    chemistry: 0.15,
  };
  let score = 0;

  for (let key in weightage) {
    score += (data[key] || 50) * weightage[key]; // Default to 50
  }

  const finalScore = Math.round(score);
  const rating =
    finalScore > 70
      ? "Excellent 🌱"
      : finalScore > 40
      ? "Average 🌍"
      : "Poor 🔴";

  return { score: finalScore, rating };
}
