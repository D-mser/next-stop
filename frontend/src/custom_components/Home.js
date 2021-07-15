import React from "react";

export default function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
  const user = localStorage.getItem("user") || "default";

  return (
    <div className="bg">
      <div className="homepage vh-centered">
        <h1>{isLoggedIn ? `Welcome back, ${user}` : "Please log in"}</h1>
      </div>
    </div>
  );
}
