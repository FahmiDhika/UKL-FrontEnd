"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { LOGIN_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookie";
import Logo from "@/public/assets/Logo Sehati.png";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${LOGIN_API_URL}/login`;
      const payload = JSON.stringify({ username: username, password });

      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data?.accessToken) {
        toast("Login Berhasil.", {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "success",
          autoClose: 2000,
        });

        storeCookie("token", data.accessToken);
        storeCookie("id", data.id);
        storeCookie("username", data.username);
        setTimeout(() => router.replace(`/dashboard`), 2000);
      } else
        toast("Username atau Password salah.", {
          hideProgressBar: false,
          containerId: `toastLogin`,
          type: "warning",
          autoClose: 2000,
        });
    } catch (error) {
      console.log(error);
      toast(`Terjadi Sebuah Kesalahan Dari Server`, {
        hideProgressBar: false,
        containerId: `toastRegister`,
        autoClose: 2000,
        type: `error`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-4">
          <Image src={Logo} alt="Logo" width={200} className="rounded-full" />
        </div>
        <h2 className="text-3xl text-center mb-2">
          PLAYLIST{" "}
          <span className="text-[#7440FF] font-bold text-4xl">Sehati</span>
        </h2>
        <p className="text-center text-xl mb-6">LOGIN</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="admin"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-9">
            <label
              className="block text-sm text-gray-600 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-400 hover:text-gray-600"
                onClick={togglePassword}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223a10.477 10.477 0 00-.726 1.777M2.25 12a10.45 10.45 0 0119.5 0 10.45 10.45 0 01-1.272 4.772M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full flex justify-between">
            <button
              type="button"
              className="w-1/4 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-900"
              onClick={() => router.replace(`/`)}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-1/4 bg-[#7440FF] text-white py-2 rounded-lg font-semibold hover:bg-indigo-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
