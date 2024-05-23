"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "./_utils/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (user) {
      router.push("/prototype/homepage");
    }
    // If there is a user, stay on this page or manage other routes as needed
  }, [user, router]);

  if (user) {
    return <div>Redirecting to your homepage...</div>;
  }

  return (
    <div className="mt-4 flex justify-center flex-col items-center gap-5">
      <h1 className="text-4xl font-bold mb-5">QuickIncorp App</h1>
      <p className="font-bold text-2xl mb-2 ">Login to get stated!</p>
      {user ? (
        <p className="text-lg">
          Signed In as {user.displayName} ({user.email}).
        </p>
      ) : (
        ""
      )}

      {user ? (
        <div className="text-lg">
          <button className="hover:underline" onClick={firebaseSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="text-lg">
          <button
            onClick={googleSignIn}
            className="hover:underline ml-4 flex flex-direction items-center justify-center gap-5 border p-2 rounded-xl px-4 my-2"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="GitHub logo"
              width={25}
              height={25}
            />{" "}
            Sign in with Google
          </button>

          <button
            onClick={gitHubSignIn}
            className="hover:underline ml-4 flex flex-direction items-center justify-center gap-5 border p-2 rounded-xl px-4"
          >
            <Image
              src="/github-mark-white.png"
              alt="GitHub logo"
              width={25}
              height={25}
            />{" "}
            Sign in with GitHub
          </button>
        </div>
      )}

      {user !== null && (
        <Link className="text-lg hover:underline" href={`prototype/homepage`}>
          Continue to Homepage
        </Link>
      )}
    </div>
  );
}
