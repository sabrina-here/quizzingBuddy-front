import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-sm p-4 ">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
}
