export async function getCarbonFootprint(productName) {
  const res = await fetch(
    `https://api.carbonfootprint.com/product?query=${productName}`
  );
  const data = await res.json();

  return {
    carbon_impact: data.carbon_impact ?? "Unknown",
    energy_consumption: data.energy_usage ?? "Unknown",
  };
}
