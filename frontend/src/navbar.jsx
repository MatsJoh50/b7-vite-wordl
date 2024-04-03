import React from "react";

export default function Navbar() {
  const liClass = "hover:text-green-200 ";

  return (
    <nav className="h-24 bg-bars w-full flex-col flex justify-end pb-2">
      <div className="text-white text-3xl ">
        <ul className="flex flex-row  md:justify-evenly mb-1 mt-auto">
          <li className={liClass}>Game</li>
          <li className={liClass}>HighScore</li>
          <li className={liClass}><a href="../public/about.html">About</a></li>
        </ul>
      </div>
    </nav>
  );
}
