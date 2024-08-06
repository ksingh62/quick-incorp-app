"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "./_utils/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/prototype/homepage");
    }
  }, [user, router]);

  if (user) {
    return <div>Redirecting to your homepage...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center text-gray-100">
        <h1 className="text-4xl font-bold mb-5">QuickIncorp App</h1>
        <p className="font-bold text-2xl mb-6">Login to get started!</p>

        <div className="space-y-4">
          <button
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-4 border p-3 rounded-xl bg-white text-gray-800 hover:bg-gray-100"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google logo"
              width={25}
              height={25}
            />
            Sign in with Google
          </button>

          <button
            onClick={gitHubSignIn}
            className="w-full flex items-center justify-center gap-4 border p-3 rounded-xl bg-gray-700 hover:bg-gray-600"
          >
            <Image
              src="/github-mark-white.png"
              alt="GitHub logo"
              width={25}
              height={25}
            />
            Sign in with GitHub
          </button>
        </div>

        {user && (
          <div className="mt-6">
            <button
              className="text-red-400 hover:underline"
              onClick={firebaseSignOut}
            >
              Sign out
            </button>
          </div>
        )}

        <div className="mt-6">
          {user ? (
            <Link
              className="text-blue-400 hover:underline"
              href="/prototype/homepage"
            >
              Continue to Homepage
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
