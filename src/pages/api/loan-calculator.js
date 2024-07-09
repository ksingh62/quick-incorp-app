export default function handler(req, res) {
  const { loanAmount, loanTerm, interestRate, monthlyPayment } = req.query;

  const principal = parseFloat(loanAmount);
  const annualRate = parseFloat(interestRate) / 100;
  const termMonths = parseInt(loanTerm, 10) * 12;

  // Calculate monthly interest rate
  const monthlyRate = annualRate / 12;

  // Calculate monthly payment using the formula for an annuity
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, termMonths);
  const denominator = Math.pow(1 + monthlyRate, termMonths) - 1;
  const calculatedMonthlyPayment = principal * (numerator / denominator);

  // If a monthly payment is provided, use it to calculate loan details
  const payment = parseFloat(monthlyPayment) || calculatedMonthlyPayment;
  const totalPayment = payment * termMonths;
  const totalInterest = totalPayment - principal;

  // Assuming fixed tax rates for simplicity
  const federalTaxRate = 0.15;
  const provincialTaxRate = 0.1;
  const totalTax = totalInterest * (federalTaxRate + provincialTaxRate);

  res.status(200).json({
    monthlyPayment: payment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    federalTax: (totalInterest * federalTaxRate).toFixed(2),
    provincialTax: (totalInterest * provincialTaxRate).toFixed(2),
    totalTax: totalTax.toFixed(2),
  });
}
