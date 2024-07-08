// pages/api/calculate-payroll.js

export default async function handler(req, res) {
  const { income, province } = req.query;

  const federalTaxRates = [
    { rate: 0.15, threshold: 49020 },
    { rate: 0.205, threshold: 98040 },
    { rate: 0.26, threshold: 151978 },
    { rate: 0.29, threshold: 216511 },
    { rate: 0.33, threshold: Infinity },
  ];

  const provincialTaxRates = {
    AB: [
      { rate: 0.1, threshold: 131220 },
      { rate: 0.12, threshold: 157464 },
      { rate: 0.13, threshold: 209952 },
      { rate: 0.14, threshold: 314928 },
      { rate: 0.15, threshold: Infinity },
    ],
    BC: [
      { rate: 0.0506, threshold: 42184 },
      { rate: 0.077, threshold: 84369 },
      { rate: 0.105, threshold: 96866 },
      { rate: 0.1229, threshold: 117623 },
      { rate: 0.147, threshold: 159483 },
      { rate: 0.168, threshold: Infinity },
    ],
    MB: [
      { rate: 0.108, threshold: 33389 },
      { rate: 0.1275, threshold: 72164 },
      { rate: 0.174, threshold: Infinity },
    ],
    NB: [
      { rate: 0.094, threshold: 43835 },
      { rate: 0.1482, threshold: 87671 },
      { rate: 0.1652, threshold: 142534 },
      { rate: 0.1784, threshold: 162383 },
      { rate: 0.203, threshold: Infinity },
    ],
    NL: [
      { rate: 0.087, threshold: 39147 },
      { rate: 0.145, threshold: 78294 },
      { rate: 0.158, threshold: 139780 },
      { rate: 0.173, threshold: 195693 },
      { rate: 0.183, threshold: Infinity },
    ],
    NS: [
      { rate: 0.0879, threshold: 29590 },
      { rate: 0.1495, threshold: 59180 },
      { rate: 0.1667, threshold: 93000 },
      { rate: 0.175, threshold: 150000 },
      { rate: 0.21, threshold: Infinity },
    ],
    ON: [
      { rate: 0.0505, threshold: 45142 },
      { rate: 0.0915, threshold: 90287 },
      { rate: 0.1116, threshold: 150000 },
      { rate: 0.1216, threshold: 220000 },
      { rate: 0.1316, threshold: Infinity },
    ],
    PE: [
      { rate: 0.098, threshold: 31984 },
      { rate: 0.138, threshold: 63969 },
      { rate: 0.167, threshold: Infinity },
    ],
    QC: [
      { rate: 0.15, threshold: 45105 },
      { rate: 0.2, threshold: 90200 },
      { rate: 0.24, threshold: 109755 },
      { rate: 0.2575, threshold: Infinity },
    ],
    SK: [
      { rate: 0.105, threshold: 45677 },
      { rate: 0.125, threshold: 130506 },
      { rate: 0.145, threshold: Infinity },
    ],
    NT: [
      { rate: 0.059, threshold: 44843 },
      { rate: 0.086, threshold: 89783 },
      { rate: 0.122, threshold: 145430 },
      { rate: 0.1405, threshold: Infinity },
    ],
    NU: [
      { rate: 0.04, threshold: 46740 },
      { rate: 0.07, threshold: 93480 },
      { rate: 0.09, threshold: 151978 },
      { rate: 0.115, threshold: Infinity },
    ],
    YT: [
      { rate: 0.064, threshold: 49020 },
      { rate: 0.09, threshold: 98040 },
      { rate: 0.109, threshold: 151978 },
      { rate: 0.128, threshold: 216511 },
      { rate: 0.15, threshold: Infinity },
    ],
  };

  const cppRate = 0.057;
  const eiRate = 0.0158;
  const cppMax = 3166.45;
  const eiMax = 889.54;

  function calculateTax(income, taxRates) {
    let tax = 0;
    let remainingIncome = income;
    for (const bracket of taxRates) {
      const taxableIncome = Math.min(remainingIncome, bracket.threshold);
      tax += taxableIncome * bracket.rate;
      remainingIncome -= taxableIncome;
      if (remainingIncome <= 0) break;
    }
    return tax;
  }

  const federalTax = calculateTax(income, federalTaxRates);
  const provincialTax = calculateTax(income, provincialTaxRates[province]);

  const cpp = Math.min(income * cppRate, cppMax);
  const ei = Math.min(income * eiRate, eiMax);

  const totalDeductions = federalTax + provincialTax + cpp + ei;
  const netIncome = income - totalDeductions;

  res.status(200).json({
    federalTax: federalTax.toFixed(2),
    provincialTax: provincialTax.toFixed(2),
    cpp: cpp.toFixed(2),
    ei: ei.toFixed(2),
    netIncome: netIncome.toFixed(2),
  });
}
