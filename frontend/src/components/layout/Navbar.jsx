"use client";

import Link from "next/link";
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
        <Link
          href="/"
          className="logo-wrapper"
        >
          <div className="logo-box">
            <MapPin size={22} />
          </div>

          <h2>Vejboden.dk</h2>
        </Link>

        {/* DESKTOP NAV */}
        <nav
          className="desktop-nav"
          aria-label="Hovednavigation"
        >
          <Link href="/">
            Forside
          </Link>

          <Link href="/stalls">
            Vejboder
          </Link>

          <Link href="/create-stall">
            Opret vejbod
          </Link>

          <Link href="/privacy">
            Privatliv
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          <button
            className="profile-btn"
            aria-label="Profil"
          >
            <User size={20} />
          </button>

          <button
            className="menu-btn"
            aria-label="Åbn menu"
            aria-expanded={open}
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

          <Link
            href="/"
            onClick={() =>
              setOpen(false)
            }
          >
            Forside
          </Link>

          <Link
            href="/stalls"
            onClick={() =>
              setOpen(false)
            }
          >
            Vejboder
          </Link>

          <Link
            href="/create-stall"
            onClick={() =>
              setOpen(false)
            }
          >
            Opret vejbod
          </Link>

          <Link
            href="/privacy"
            onClick={() =>
              setOpen(false)
            }
          >
            Privatliv
          </Link>

        </div>
      )}

    </header>
  );
}