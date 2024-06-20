"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";
import Layout from "@/components/Layout";

const HelpSupport = () => {
  const { user } = useUserAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/submitIssue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, user }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        reset();
      } else {
        console.error("Failed to submit issue");
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-semibold mb-6">Help & Support</h2>
        {/* <p className="text-center">
          Sumbit your Issue and we will get back to you.
        </p> */}
        {formSubmitted ? (
          <p className="text-green-500">
            Your issue has been submitted. We will get back to you soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" p-6 rounded-lg shadow-md text-gray-100"
          >
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                {...register("subject", { required: "Subject is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-gray-900 outline-none p-1"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-gray-900 outline-none p-1 h-48"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default HelpSupport;
