export async function getCompanyESG(companyName) {
  const apiKey = "YOUR_ESG_ENTERPRISE_API_KEY";
  const res = await fetch(
    `https://api.esgenterprise.com/v1/company?name=${companyName}&api_key=${apiKey}`
  );
  const data = await res.json();

  if (!data || !data.company) return null;

  return {
    name: data.company.name,
    score: data.company.esg_score,
    industry: data.company.industry,
    report_url: data.company.report_url,
  };
}
