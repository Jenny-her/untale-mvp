"use client";

import { useState } from "react";
import UntaleLogoMark from "./UntaleLogoMark";

export default function Navbar({ route, navigate, user, onLogout }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", r: "/" },
    { label: "Feed", r: "/feed" },
    { label: "Chat", r: "/chat" },
    { label: "💎 Premium", r: "/premium" }
  ];

  const go = (r) => {
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
          {links.map((l) => (
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

        <button className="hamburger" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((l) => (
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
