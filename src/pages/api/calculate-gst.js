// pages/api/calculate-gst.js

import axios from "axios";

const TAX_DATA_URL = "https://api.salestaxapi.ca/v2/province";

export default async function handler(req, res) {
  const { income, province } = req.query;

  try {
    const response = await axios.get(`${TAX_DATA_URL}/${province}`);
    const taxData = response.data;

    // Calculate GST based on income and GST rate
    const gstRate = taxData.gst_rate;
    const gst = income * (gstRate / 100);

    res.status(200).json({ gst });
  } catch (error) {
    console.error("Error calculating GST:", error.message);
    res.status(500).json({ error: "Failed to calculate GST" });
  }
}
