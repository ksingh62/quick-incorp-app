export default async function handler(req, res) {
  const { base, target, amount } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}/${amount}`
    );
    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("Failed to fetch conversion rates");
    }

    res.status(200).json({
      conversion_result: data.conversion_result,
      base_code: data.base_code,
      target_code: data.target_code,
      amount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//https://www.exchangerate-api.com/
//https://publicapis.io/currency-api/#:~:text=Here%E2%80%99s%20an%20example%20code%20snippet%3A%20fetch%28%27https%3A%2F%2Fcurrencyapi.com%2Fapi%2Fv1%2Frates%3Fkey%3DYOUR_API_KEY%27%29.then%28response%20%3D%3E%20response.json%28%29%29.then%28data,the%20latest%20exchange%20rates%20%7D%29.catch%28error%20%3D%3E%20%7B%20console.error%28error%29%3B
