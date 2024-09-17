"use client";
import PopupDialog from "@/components/PopupDialog";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // Show popup after 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showPopup && <PopupDialog onClose={handleClosePopup} />}
    </main>
  );
}
