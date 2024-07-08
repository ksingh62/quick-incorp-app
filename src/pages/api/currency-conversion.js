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
