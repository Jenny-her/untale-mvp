"use client";

import { useState } from "react";
import UntaleLogoMark from "./UntaleLogoMark";

// Define the props type
interface NavbarProps {
  route: string;
  navigate: (route: string) => void;
  user: {
    premium?: boolean;
    email?: string;
    name?: string;
  } | null;
  onLogout: () => void;
}

// Define the link type
interface Link {
  label: string;
  r: string;
}

export default function Navbar({
  route,
  navigate,
  user,
  onLogout
}: NavbarProps) {
  const [open, setOpen] = useState<boolean>(false);

  const links: Link[] = [
    { label: "Home", r: "/" },
    { label: "Feed", r: "/feed" },
    { label: "Chat", r: "/chat" },
    { label: "💎 Premium", r: "/premium" }
  ];

  const go = (r: string) => {
    navigate(r);
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => go("/")}>
          <UntaleLogoMark size={34} />
          <span className="logo-text">
            Un<span>Tale</span>
          </span>
        </div>

        <ul className="nav-links">
          {links.map((l: Link) => (
            <li key={l.r}>
              <span
                className={`nav-link ${l.r === "/premium" ? "nav-premium" : ""} ${route === l.r ? "active" : ""}`}
                onClick={() => go(l.r)}
              >
                {l.label}
              </span>
            </li>
          ))}
          {user ? (
            <li>
              <div className="nav-user">
                <div className="nav-avatar">🌸</div>
                {user.premium && (
                  <span className="nav-premium-badge">PREMIUM</span>
                )}
                <span
                  className="nav-link"
                  style={{ color: "#5b4d72", fontSize: 13 }}
                  onClick={onLogout}
                >
                  Sign out
                </span>
              </div>
            </li>
          ) : null}
        </ul>

        <button
          className="hamburger"
          onClick={() => setOpen((o: boolean) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((l: Link) => (
          <span
            key={l.r}
            className={`mobile-link ${route === l.r ? "active" : ""}`}
            onClick={() => go(l.r)}
          >
            {l.label}
          </span>
        ))}
        {user && (
          <span
            className="mobile-link"
            style={{ color: "#5b4d72" }}
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
          >
            Sign out
          </span>
        )}
      </div>
    </>
  );
}
