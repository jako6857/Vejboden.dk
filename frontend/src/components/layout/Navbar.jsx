"use client";

import { useState } from "react";

import {
  Menu,
  X,
  MapPin,
  User,
} from "lucide-react";

import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] =
    useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* LOGO */}
        <div className="logo-wrapper">
          <div className="logo-box">
            <MapPin size={22} />
          </div>

          <h2>Vejboden.dk</h2>
        </div>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          <a href="#">Kort</a>
          <a href="#">Vejboder</a>
          <a href="#">Om os</a>
          <a href="#">Kontakt</a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">
          <button className="profile-btn">
            <User size={20} />
          </button>

          <button
            className="menu-btn"
            onClick={() =>
              setOpen(!open)
            }
          >
            {open ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          <a href="#">Kort</a>
          <a href="#">Vejboder</a>
          <a href="#">Om os</a>
          <a href="#">Kontakt</a>
        </div>
      )}
    </header>
  );
}