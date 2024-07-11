import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";
import { doc, setDoc, runTransaction } from "firebase/firestore";
import { db, storage } from "@/app/prototype/_utils/firebase";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const steps = [
  {
    id: "Step 1",
    name: "Company Information",
    fields: [
      "companyName",
      "businessNumber",
      "taxYearEnd",
      "businessAddress",
      "corporationType",
      "incorporationDate",
    ],
  },
  {
    id: "Step 2",
    name: "Income Details",
    fields: ["totalRevenue", "costOfGoodsSold", "grossProfit"],
  },
  {
    id: "Step 3",
    name: "Expenses",
    fields: [
      "advertising",
      "salaries",
      "benefits",
      "rent",
      "utilities",
      "officeSupplies",
      "insurance",
      "legalFees",
      "travel",
      "interestCharges",
      "depreciation",
      "miscellaneousExpenses",
    ],
  },
  {
    id: "Step 4",
    name: "Tax Deductions and Credits",
    fields: [
      "capitalCostAllowance",
      "sred",
      "investmentTaxCredit",
      "smallBusinessDeduction",
      "foreignTaxCredits",
    ],
  },
  {
    id: "Step 5",
    name: "Financial Statements",
    fields: ["balanceSheet", "incomeStatement"],
  },
  {
    id: "Step 6",
    name: "Tax Payments and Instalments",
    fields: [
      "previousYearTaxPayable",
      "currentYearInstalments",
      "balanceDueOrRefund",
    ],
  },
  {
    id: "Step 7",
    name: "Supporting Documents",
    fields: [
      "receipts",
      "payrollRecords",
      "bankStatements",
      "contracts",
      "previousTaxReturns",
      "depreciationSchedules",
      "loanAgreements",
    ],
  },
  { id: "Step 8", name: "Review and Submit", fields: [] },
];

export default function TaxForm() {
  const { user } = useUserAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  const sendEmail = async (data) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Email sent successfully:", responseData);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const next = async () => {
    const currentStepFields = steps[currentStep].fields;
    const isDataValid = await trigger(currentStepFields);

    if (!isDataValid) return;

    // Update formData with current step values
    const currentValues = getValues(currentStepFields);
    setFormData((prev) => ({
      ...prev,
      ...currentValues,
    }));

    setCurrentStep((step) => step + 1);
  };

  const onSubmit = async (data) => {
    const finalData = { ...formData, ...data, ...uploadedFiles };

    // Remove any fields that are undefined
    const filteredData = Object.fromEntries(
      Object.entries(finalData).filter(([_, v]) => v !== undefined)
    );

    try {
      const applicationId = await getNextApplicationId();

      await setDoc(doc(db, "tax", `${user.uid}-${applicationId}`), {
        ...filteredData,
        userId: user.uid,
        applicationId,
        userName: user.displayName,
        userEmail: user.email,
      });

      await sendEmail({
        ...filteredData,
        applicationId,
        email: user.email,
      });

      reset();
      setCurrentStep(steps.length - 1); // Set to final step to show the success message
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  async function getNextApplicationId() {
    const counterRef = doc(db, "counters", "taxApplications");
    try {
      const newApplicationId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists()) {
          await transaction.set(counterRef, { current: 0 });
          throw new Error(
            "Counter document did not exist, so it was initialized. Please try again."
          );
        }
        const newCount = counterDoc.data().current + 1;
        transaction.update(counterRef, { current: newCount });
        return newCount;
      });
      return newApplicationId;
    } catch (error) {
      console.error("Error getting next application ID:", error);
      throw error;
    }
  }

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(
      storage,
      `uploads/${user.uid}/${fieldName}/${file.name}`
    );
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: downloadURL,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      const timer = setTimeout(() => {
        router.push("/prototype/homepage");
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [currentStep, router]);

  return (
    <section className="absolute inset-0 flex flex-col justify-between p-24 bg-gray-900 text-gray-100">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-400 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-400">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-400 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)}>
        {steps[currentStep].fields.map((field, index) => (
          <div
            key={index}
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div className="sm:col-span-3">
              <label
                htmlFor={field}
                className="block text-sm font-medium leading-6 text-gray-100"
              >
                {field
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </label>

              <div className="mt-2">
                {[
                  "balanceSheet",
                  "incomeStatement",
                  "receipts",
                  "payrollRecords",
                  "bankStatements",
                  "contracts",
                  "previousTaxReturns",
                  "depreciationSchedules",
                  "loanAgreements",
                ].includes(field) ? (
                  <input
                    type="file"
                    id={field}
                    onChange={(e) => handleFileUpload(e, field)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                ) : (
                  <input
                    type="text"
                    id={field}
                    {...register(field, {
                      required: `${field
                        .split(/(?=[A-Z])/)
                        .join(" ")} is required`,
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                )}
                {errors[field]?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors[field].message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {currentStep === steps.length - 1 && (
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">
              Thank you for your submission!
            </p>
            <p className="text-lg">Redirecting to the homepage...</p>
          </div>
        )}

        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-gray-800 px-2 py-1 text-sm font-semibold text-sky-400 shadow-sm ring-1 ring-inset ring-sky-600 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="rounded bg-gray-800 px-2 py-1 text-sm font-semibold text-sky-400 shadow-sm ring-1 ring-inset ring-sky-600 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="rounded bg-gray-800 px-2 py-1 text-sm font-semibold text-sky-400 shadow-sm ring-1 ring-inset ring-sky-600 hover:bg-gray-700"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
