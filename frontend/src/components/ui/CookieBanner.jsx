"use client";
 
import { useEffect, useState } from "react";
 
import "./CookieBanner.css";
 
export default function CookieBanner() {
  const [visible, setVisible] =
    useState(false);
 
  useEffect(() => {
    const consent =
      localStorage.getItem(
        "cookieConsent"
      );
 
    if (!consent) {
      setVisible(true);
    }
  }, []);
 
  const acceptCookies = () => {
    localStorage.setItem(
      "cookieConsent",
      "accepted"
    );
 
    setVisible(false);
  };
 
  const declineCookies = () => {
    localStorage.setItem(
      "cookieConsent",
      "declined"
    );
 
    setVisible(false);
  };
 
  if (!visible) return null;
 
  return (
    <div className="cookie-banner">
      <h3>
        Cookieindstillinger
      </h3>
 
      <p>
        Vejboden.dk anvender
        cookies til login,
        brugerindstillinger og
        analyse af trafik.
 
        Vi benytter også
        tredjepartstjenester som
        Google OAuth til
        autentifikation.
      </p>
 
      <a
        href="/privacy"
        className="cookie-link"
      >
        Læs mere
      </a>
 
      <div className="cookie-actions">
        <button
          className="decline-btn"
          onClick={declineCookies}
        >
          Afvis
        </button>
 
        <button
          className="accept-btn"
          onClick={acceptCookies}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}