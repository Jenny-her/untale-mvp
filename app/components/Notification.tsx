"use client";

import { useEffect } from "react";

// Define the props type
interface NotificationProps {
  msg: string;
  type?: string;
  onDone: () => void;
}

export default function Notification({
  msg,
  type = "",
  onDone
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return <div className={`notification ${type}`}>{msg}</div>;
}
