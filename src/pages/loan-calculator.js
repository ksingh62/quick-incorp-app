export default async function handler(req, res) {
  const { loanAmount, loanTerm, interestRate, compound, payback } = req.query;

  try {
    // Convert inputs to numbers
    const principal = parseFloat(loanAmount);
    const years = parseInt(loanTerm, 10);
    const annualInterestRate = parseFloat(interestRate) / 100;
    const compoundingPeriodsPerYear = parseInt(compound, 10);
    const paymentFrequencyPerYear = parseInt(payback, 10);

    console.log("Received parameters:", {
      principal,
      years,
      annualInterestRate,
      compoundingPeriodsPerYear,
      paymentFrequencyPerYear,
    });

    if (
      isNaN(principal) ||
      isNaN(years) ||
      isNaN(annualInterestRate) ||
      isNaN(compoundingPeriodsPerYear) ||
      isNaN(paymentFrequencyPerYear)
    ) {
      throw new Error("Invalid input parameters");
    }

    // Calculate the periodic interest rate
    const periodInterestRate = annualInterestRate / compoundingPeriodsPerYear;

    // Calculate the total number of payments
    const totalPayments = years * paymentFrequencyPerYear;

    // Calculate the compound factor
    const compoundFactor = Math.pow(
      1 + periodInterestRate,
      compoundingPeriodsPerYear * years
    );

    // Calculate the payment amount
    const payment =
      (principal * periodInterestRate * compoundFactor) / (compoundFactor - 1);

    // Calculate the total payment
    const totalPayment = payment * totalPayments;

    // Calculate the total interest paid
    const totalInterest = totalPayment - principal;

    // Assuming fixed values for tax rates
    const federalTaxRate = 0.15; // 15%
    const provincialTaxRate = 0.1; // 10%

    // Calculate taxes
    const federalTax = totalInterest * federalTaxRate;
    const provincialTax = totalInterest * provincialTaxRate;
    const totalTax = federalTax + provincialTax;

    console.log("Calculated results:", {
      monthlyPayment: payment,
      totalPayment,
      totalInterest,
      federalTax,
      provincialTax,
      totalTax,
    });

    res.status(200).json({
      monthlyPayment: payment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      federalTax: federalTax.toFixed(2),
      provincialTax: provincialTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
    });
  } catch (error) {
    console.error("Error calculating loan:", error.message);
    res.status(500).json({ error: error.message });
  }
}
