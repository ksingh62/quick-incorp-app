"use client";
import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-900 text-gray-100">
        <section className="p-8 text-center bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Get Started Today!
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Join thousands of businesses that have successfully incorporated
            with QuickIncorp.
          </p>
          <Link
            href={"/prototype/form"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition duration-300"
          >
            Register Now
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default Page;
