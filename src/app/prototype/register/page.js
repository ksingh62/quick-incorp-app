'use client'
import Layout from '@/components/Layout'
import React from 'react'
import { useUserAuth } from "../_utils/auth-context";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

function page() {
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
    <div>Register Company page</div>
    </Layout>
  )
}

export default page