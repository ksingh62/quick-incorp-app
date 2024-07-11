"use client";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Posts from "./Posts";
import "./CommunityPage.css"; // Import CSS file

const Page = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return <div>{!token ? <Login /> : <Posts token={token} />}</div>;
};

export default Page;
