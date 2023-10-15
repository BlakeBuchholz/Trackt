import React from "react";

const LoginButton = ({ steamId }) => {
  if (steamId) {
    const handleLogout = () => {
      // Handle the logout logic here
      // For example, redirect to the logout endpoint:
      window.location.href = "/logout";
    };

    return (
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    );
  } else {
    return (
      <a href="https://steamcommunity.com/openid/" target="_self">
        <button className="login-button">Login with Steam</button>
      </a>
    );
  }
};

export default LoginButton;
