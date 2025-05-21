"use client";

import { FormEvent, useState, useRef } from "react";
import { IUser } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BASE_API_URL } from "@/global";
import axios from "axios";
import Logo from "@/public/assets/Logo Sehati.png";
import Image from "next/image";
import { InputGroupComponent } from "@/components/inputComponent";
import Select from "@/components/select";
import FileInput from "@/components/fileInput";

export default function RegisterPage() {
  const [user, setUser] = useState<IUser>({
    nama_nasabah: ``,
    username: ``,
    password: ``,
    alamat: ``,
    telepon: ``,
    gender: ``,
    foto: ``,
  });
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/register`;
      const { nama_nasabah, username, password, alamat, gender, telepon } =
        user;
      const payload = new FormData();

      payload.append("nama_nasabah", nama_nasabah || "");
      payload.append("username", username || "");
      payload.append("password", password || "");
      payload.append("alamat", alamat || "");
      payload.append("gender", gender || "");
      payload.append("telepon", telepon || "");
      if (file !== null) {
        payload.append("foto", file);
      }

      const { data } = await axios.post(url, payload);
      console.log("Data yang dikirim : ", data);
      console.log(`file dikirim : `, file);

      if (data?.status) {
        toast.dismiss();
        toast(data?.message, {
          hideProgressBar: false,
          containerId: `toastRegister`,
          autoClose: 2000,
          type: `success`,
        });
        console.log(data?.message);
        setTimeout(() => router.replace(`/`), 2000);
      } else {
        toast.dismiss();
        toast(data?.message, {
          hideProgressBar: false,
          containerId: `toastRegister`,
          autoClose: 2000,
          type: `warning`,
        });
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white px-4 py-6">
      <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Image src={Logo} alt="Logo" width={200} className="rounded-full" />
        </div>
        <h2 className="text-3xl text-center mb-2">
          BANK <span className="text-[#7440FF] font-bold text-4xl">Sehati</span>
        </h2>
        <p className="text-center text-xl mb-6">REGISTER</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputGroupComponent
            id={`nama_nasabah`}
            type="text"
            value={user.nama_nasabah}
            onChange={(val) => setUser({ ...user, nama_nasabah: val })}
            required={true}
            label="Nama Nasabah"
            placeholder="Nasabah Ganteng"
          />

          <InputGroupComponent
            id={`username`}
            type="text"
            value={user.username}
            onChange={(val) => setUser({ ...user, username: val })}
            required={true}
            label="Username"
            placeholder="nasabah_ganteng"
          />

          <InputGroupComponent
            id={`password`}
            type="password"
            value={user.password}
            onChange={(val) => setUser({ ...user, password: val })}
            required={true}
            label="Password"
            placeholder="••••••••"
          />

          <InputGroupComponent
            id={`alamat`}
            type="text"
            value={user.alamat}
            onChange={(val) => setUser({ ...user, alamat: val })}
            required={true}
            label="Alamat"
            placeholder="Jl. in aja dulu"
          />

          <InputGroupComponent
            id={`telepon`}
            type="text"
            value={user.telepon}
            onChange={(val) => setUser({ ...user, telepon: val })}
            required={true}
            label="Nomor Telepon"
            placeholder="08.........."
          />

          <Select
            id={`gender`}
            value={user.gender}
            label="Gender"
            required={true}
            onChange={(val) => setUser({ ...user, gender: val })}
          >
            <option value="">--- Select Gender ---</option>
            <option value="Laki-laki">Laki Laki</option>
            <option value="Perempuan">Perempuan</option>
          </Select>

          <FileInput
            acceptTypes={["image/png", "image/jpeg", "image/jpg"]}
            id={`foto`}
            label="Upload Picture (Max 2MB, JPG/JPEG/PNG)"
            onChange={(f) => setFile(f)}
            required={false}
          />

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
