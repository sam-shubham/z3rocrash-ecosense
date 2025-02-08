export async function getProductData(barcode) {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
  );
  const data = await res.json();

  if (!data || !data.product) return null;

  return {
    name: data.product.product_name,
    brand: data.product.brands,
    categories: data.product.categories,
    packaging: data.product.packaging,
    carbon_impact:
      data.product.ecoscore_data?.agribalyse?.co2_total ?? "Unknown",
    eco_score: data.product.ecoscore_data?.score ?? "Unknown",
    image: data.product.image_url,
  };
}
