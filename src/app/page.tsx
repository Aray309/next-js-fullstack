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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[32px]  items-center">
            <div className="flex-shrink-0">
              <h1 className="text-4xl font-bold">QAangel</h1>
            </div>
            <div className="hidden md:flex md:space-x-4 ml-auto">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                Videos
              </a>
              <a href="#" className="hover:underline">
                Books
              </a>
              <a href="#" className="hover:underline">
                Restaurants
              </a>
              <a href="#" className="hover:underline">
                Clothing
              </a>
              <a href="#" className="hover:underline">
                Community
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 relative w-full h-[40vh] overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
          <h4 className="text-2xl text-white font-semibold text-center">
            Welcome , History repeat itself !
          </h4>
          <p className="mt-2 text-white text-center">
            We do not criticize any religion. Join us in connecting traditional
            and modern cultures!
          </p>
          <button className="mt-4 bg-gray-700 text-white py-2 px-4 rounded">
            Let's explore...
          </button>
        </div>
      </section>

      {/* Featured Sections */}
      <div className="flex flex-col md:flex-row md:space-x-4 p-4">
        {/* Featured Videos */}
        <div className="flex-1 bg-white p-4 rounded shadow mb-4 md:mb-0">
          <h3 className="font-semibold text-lg">Featured Videos</h3>
          <ul className="mt-2">
            <li className="mt-2">Video 1</li>
            <li className="mt-2">Video 2</li>
            <li className="mt-2">Video 3</li>
          </ul>
        </div>

        {/* Featured Books */}
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Featured Books</h3>
          <ul className="mt-2">
            <li className="mt-2">Book 1</li>
            <li className="mt-2">Book 2</li>
            <li className="mt-2">Book 3</li>
          </ul>
        </div>
      </div>

      {/* Community Ideas/Forum Section */}
      <div className="bg-white p-4 rounded shadow m-4">
        <h3 className="font-semibold text-lg">Community Ideas/Forum</h3>
        <ul className="mt-2">
          <li className="mt-2">Idea 1</li>
          <li className="mt-2">Idea 2</li>
          <li className="mt-2">Idea 3</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="bg-gray-600 text-white text-center p-4 mt-auto">
        <p>&copy; 2024 Cultural Connect. All rights reserved.</p>
      </footer>
    </div>
  );
  // <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //   {showPopup && <PopupDialog onClose={handleClosePopup} />}
  // </main>
}
