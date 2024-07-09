export default function handler(req, res) {
  const { income, province } = req.query;

  // Hardcoded GST rates for each province (in percentage)
  const gstRates = {
    AB: 5,
    BC: 5,
    MB: 5,
    NB: 5,
    NL: 5,
    NS: 5,
    ON: 5,
    PE: 5,
    QC: 5,
    SK: 5,
    NT: 5,
    NU: 5,
    YT: 5,
  };

  if (!income || !province || !gstRates[province]) {
    return res.status(400).json({ error: "Invalid income or province" });
  }

  const gstRate = gstRates[province];
  const gst = income * (gstRate / 100);

  res.status(200).json({ gst });
}
