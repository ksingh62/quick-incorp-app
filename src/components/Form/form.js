import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/prototype/_utils/firebase";
import { useRouter } from 'next/navigation';

const steps = [
  {
    id: "Step 1",
    name: "Personal Details",
    fields: ["firstName", "lastName", "email", "phoneNumber"],
  },
  {
    id: "Step 2",
    name: "Corporation Details",
    fields: ["corporationName", "corpType", "corpProvince"],
  },
  {
    id: "Step 3",
    name: "Business Address",
    fields: ["address", "city", "province", "postalCode"],
  },
  {
    id: "Step 4",
    name: "Plans",
    fields: [],
  },
  { id: "Step 5", name: "Payment", fields: [] },
  { id: "Step 6", name: "Complete", fields: [] },
];

const provinces = [
  { province: "Alberta", abbr: "AB" },
  { province: "British Columbia", abbr: "BC" },
  { province: "Manitoba", abbr: "MB" },
  { province: "New Brunswick", abbr: "NB" },
  { province: "Newfoundland and Labrador", abbr: "NL" },
  { province: "Northwest Territories", abbr: "NT" },
  { province: "Nova Scotia", abbr: "NS" },
  { province: "Nunavut", abbr: "NU" },
  { province: "Ontario", abbr: "ON" },
  { province: "Prince Edward Island", abbr: "PE" },
  { province: "Quebec", abbr: "QC" },
  { province: "Saskatchewan", abbr: "SK" },
  { province: "Yukon", abbr: "YT" },
];

export default function Form() {
  const { user } = useUserAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const sendEmail = async (data) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Email sent successfully:', responseData);
    } catch (error) {
      console.error('Error sending email:', error.message);
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

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        const onSubmit = async (data) => {
          const success = await addDataToFirestore(data);
          await sendEmail(data);
          console.log(data);
          reset();
        };
        await handleSubmit(onSubmit)();
      }
      setCurrentStep((step) => step + 1);
    }
  };

  const addDataToFirestore = async (data) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...data,
        userId: user.uid,
      });
      return true;
    } catch (error) {
      console.error("Error " + error);
      return false;
    }
  };

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      const timer = setTimeout(() => {
        router.push('/prototype/homepage');
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [currentStep, router]);

  return (
    <section className="absolute inset-0 flex flex-col justify-between p-24 bg-gray-900 text-gray-100">
      {/* steps */}
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
      <form>
        {/* Personal Details */}
        {currentStep === 0 && (
          <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: {
                        value: "true",
                        message: "First Name is Required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                      required: {
                        value: "true",
                        message: "Last Name is Required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: {
                        value: "true",
                        message: "Email is required"
                      },
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email"
                      }
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: {
                        value: "true",
                        message: "Phone number is required"
                      },
                      pattern: {
                        value: /(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                        message: "Please enter a valid phone number"

                      }
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phoneNumber?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Corporation Details */}
        {currentStep === 1 && (
          <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="corporationName"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Corporation name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="corporationName"
                    {...register("corporationName", {
                      required: {
                        value: "true",
                        message: "Corporation Name is Required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.corporationName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.corporationName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="corpType"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Incorporation Type
                </label>
                <div className="mt-2">
                  <select
                    id="corpType"
                    {...register("corpType", {
                      required: {
                        value: "true",
                        message: "Incorporation type is required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={""}></option>
                    <option value={"federal"}>Federal</option>
                    <option value={"provincial"}>Provincial</option>
                  </select>
                  {errors.corpType?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.corpType?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="corpProvince"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Corporation Province
                </label>
                <div className="mt-2">
                  <select
                    id="corpProvince"
                    {...register("corpProvince", {
                      required: {
                        value: true,
                        message: "Corporation Province is required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value=""></option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province.abbr}>
                        {province.province}
                      </option>
                    ))}
                  </select>
                  {errors.corpProvince?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.corpProvince?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Business Address */}
        {currentStep === 2 && (
          <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="address"
                    {...register("address", {
                      required: {
                        value: "true",
                        message: "Address is Required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.address?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city", {
                      required: {
                        value: "true",
                        message: "City is Required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="province"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Province
                </label>
                <div className="mt-2">
                  <select
                    id="province"
                    {...register("province", {
                      required: {
                        value: true,
                        message: "Province is required",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value=""></option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province.abbr}>
                        {province.province}
                      </option>
                    ))}
                  </select>
                  {errors.province?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.province?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Postal Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="postalCode"
                    {...register("postalCode", {
                      required: {
                        value: "true",
                        message: "Postal Code is Required",
                      },
                      pattern: {
                        value: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
                        message: "Please enter a valid postal code."
                      }
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.postalCode?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && <p>Plans</p>}
        {currentStep === 4 && <p>Payment</p>}
        {currentStep === 5 && (
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Thank you for your submission!</p>
            <p className="text-lg">Redirecting to the homepage...</p>
          </div>
        )}
      </form>

      {/* Navigation */}
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
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* 
https://github.com/warsylewicz/webdev2-demos/blob/100cc0edb5c7a22c3533f79d2ead165db1bd6ab2/app/week-10/_services/blog-service.js
*/