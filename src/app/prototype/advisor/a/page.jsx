/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./page.css";
import Layout from "@/components/Layout";

import { useUserAuth } from "../../_utils/auth-context";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
export default function Page() {
  const { user } = useUserAuth();

  const router = useRouter();

  useEffect(() => {
    // Redirect user based on the authentication status
    if (!user) {
      // If there is no user, redirect to the landing page
      router.push('/');
    }
    // If there is a user, stay on this page or manage other routes as needed
  }, [user, router]);
  
  return (
    <Layout>
    <div className="home-page">
      {/* <Sidebar /> */}
      <div>
        {/* <Navbar /> */}
        <section className="movie-section">
          <div className="movie-poster-container">
            <img src="/pic-3.jpg" alt="" />
          </div>

          <div className="movie-details-container">
            <h2 className="font-bold text-center text-2xl">Andrew Scott</h2>

            <div className="movie-ratings-container"></div>

            <div className="movie-misc-info">
              <div className="info-tab">
                <h3>Title</h3>
                <span>Business Advisor</span>
              </div>

              <div className="info-tab">
                <h3>Education</h3>
                <span>LLB, LLM</span>
              </div>

              <div className="info-tab">
                <h3>Email</h3>
                <span>keith.piper@quickincrops.com</span>
              </div>

              <div className="info-tab">
                <h3>Ratings</h3>
                <span>4.8</span>
              </div>
            </div>

            <div className="movie-synopsis">
              <h3>Synopsis</h3>
              <p>
                Keith Piper is a seasoned legal professional specializing in
                providing strategic counsel to businesses of all sizes. With
                over two decades of experience in the legal industry, Keith has
                developed a reputation for his sharp analytical skills,
                comprehensive understanding of business law, and his ability to
                craft innovative solutions to complex legal challenges. His
                clients range from startups and small enterprises to large
                corporations, across various sectors including technology,
                finance, healthcare, and manufacturing.
              </p>
            </div>
            <Link href={`https://calendly.com/`} className="bg-sky-500 w-1/2 ml-28 p-2 rounded-xl text-center">Book session on Calendly</Link>
          </div>
        </section>
      </div>
    </div>
    </Layout>
  );
}