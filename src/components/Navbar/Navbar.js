import Link from "next/link";
import "./Navbar.css";
// import { useUserAuth } from "@/app/prototype/_utils/auth-context";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";

export default function Navbar() {
  console.log(useUserAuth);
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  console.log(user);
  return (
    <>
      <nav className="nav-bar">
        <div>Solutions</div>
        <div>
          <Link href={"/prototype/pricing"}>Pricing</Link>
        </div>
        <div>
          <Link href={"/prototype/library"}>Library</Link>
        </div>
        <div>
          <Link href={"/prototype/about"}>About us</Link>
        </div>
        <div>
          <Link href={"/prototype/faq"}>FAQs</Link>
        </div>
        <div className="button-container">
          {user ? (
            <>
              <button className="user-info-button">
                @
                {user.auth.currentUser.reloadUserInfo.screenName ||
                  user.displayName ||
                  "No Name"}
              </button>
              <button className="sign-out-button" onClick={firebaseSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
}
