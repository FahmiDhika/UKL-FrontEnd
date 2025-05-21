"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// icon import
import { PiPlaylistFill } from "react-icons/pi";
import { TbLogin2 } from "react-icons/tb";
import { FaUserPen } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full min-h-dvh">
      <header className="w-full lg:fixed top-0 left-0 bg-[#F5EEDC] text-center py-9 shadow-xl rounded-b-3xl mb-4">
        <h1 className="text-2xl lg:text-4xl font-bold text-[#183B4E]">
          UKL <span className="border-b-4 px-2 text-[#27548A]">Front End</span>{" "}
          Semester 2 <span className="text-red-500">(XI)</span>
        </h1>
      </header>

      <div className="w-full h-dvh flex flex-wrap gap-5 justify-around items-center px-4 lg:px-14 py-4">
        {/* soal 1 */}
        <div
          className="bg-[#98D2C0] px-9 py-6 rounded-2xl shadow-xl text-center cursor-pointer"
          onClick={() => router.push(`/login`)}
        >
          <TbLogin2 size={150} className="mb-4" />
          <p className="text-2xl">Login</p>
        </div>
        {/* end soal 1 */}

        {/* soal 2 */}
        <div
          className="bg-[#98D2C0] px-9 py-6 rounded-2xl shadow-xl text-center cursor-pointer"
          onClick={() => router.push(`/dashboard`)}
        >
          <PiPlaylistFill size={150} className="mb-4" />
          <p className="text-2xl">Playlist</p>
        </div>
        {/* end soal 2 */}

        {/* soal 3 */}
        <div
          className="bg-[#98D2C0] px-9 py-6 rounded-2xl shadow-xl text-center cursor-pointer"
          onClick={() => router.push(`/namasoal`)}
        >
          <GiLoveSong size={150} className="mb-4" />
          <p className="text-2xl">New Song</p>
        </div>
        {/* end soal 3 */}
      </div>
    </div>
  );
}
