import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const steps = [
  { id: "Step 1", name: "Personal Details" },
  { id: "Step 2", name: "Corporation Details" },
  { id: "Step 3", name: "Business Address" },
  { id: "Step 4", name: "Plans" },
  { id: "Step 5", name: "Payment" },
  { id: "Step 6", name: "Complete" },
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  const [currentStep, setCurrentStep] = useState(0);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Details */}

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
              htmlFor="phoneNumber"
              className="block text-sm font-medium leading-6 text-gray-100"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber")}
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

        {/* Corporation Details */}
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

        {/* Business Address */}
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

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

/* 
Personal Details
-First Name
-Last Name
-Phone Number

Corporation Details
-Name of Corporation
-Choose your type of incorporation
-Choose your province

Business Address
-Address
-City
-Province
-Postal Code

Plans
Payment
*/
