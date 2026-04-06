"use client";

import { useEffect } from "react";

export default function Notification({ msg, type = "", onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return <div className={`notification ${type}`}>{msg}</div>;
}
