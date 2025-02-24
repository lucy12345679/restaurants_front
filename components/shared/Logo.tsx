"use client";

// import Image from "next/image";
import Link from "next/link";
// import logos from "assets/logoadore.webp"

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="hover:opacity-70 hover:text-[#D4AF37] text-3xl uppercase font-bold flex items-center pt-2"
    >
      {/* <Image
        src={logos}
        width={60}
        height={60}
        className="object-cover"
        alt="Logo"
      /> */}
      Adore
    </Link>
  );
}
