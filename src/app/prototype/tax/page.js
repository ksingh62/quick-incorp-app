"use client";
import TaxForm from "@/components/TaxForm";
import Layout from "@/components/Layout";

export default function TaxFormPage() {
  return (
    <Layout>
      <section className="py-24">
        <div className="container">
          <TaxForm />
        </div>
      </section>
    </Layout>
  );
}
