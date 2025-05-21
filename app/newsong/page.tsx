"use client";

import { FormEvent, useState, useRef } from "react";
import { ISong } from "../types";
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
  const [user, setUser] = useState<ISong>({
    title: ``,
    artist: ``,
    description: ``,
    source: ``,
    thumbnail: ``,
  });
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/playlists/song`;
      const { title, artist, description, source } = user;
      const payload = new FormData();

      payload.append("title", title || "");
      payload.append("artist", artist || "");
      payload.append("description", description || "");
      payload.append("source", source || "");
      if (file !== null) {
        payload.append("thumbnail", file);
      }

      const { data } = await axios.post(url, payload);
      console.log("Data yang dikirim : ", data);
      console.log(`file dikirim : `, file);

      if (data?.success == true) {
        toast.dismiss();
        toast(data?.message, {
          hideProgressBar: false,
          containerId: `toastNewSong`,
          autoClose: 2000,
          type: `success`,
        });
        console.log(data?.message);
        setTimeout(() => router.replace(`/`), 3000);
      } else {
        toast.dismiss();
        toast(data?.message, {
          hideProgressBar: false,
          containerId: `toastNewSong`,
          autoClose: 2000,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Terjadi Sebuah Kesalahan Dari Server`, {
        hideProgressBar: false,
        containerId: `toastNewSong`,
        autoClose: 2000,
        type: `error`,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white px-4 py-6">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-4">
          <Image src={Logo} alt="Logo" width={200} className="rounded-full" />
        </div>
        <h2 className="text-3xl text-center mb-2">
          PLAYLIST{" "}
          <span className="text-[#7440FF] font-bold text-4xl">Sehati</span>
        </h2>
        <p className="text-center text-xl mb-6">New Song</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputGroupComponent
            id={`title`}
            type="text"
            value={user.title}
            onChange={(val) => setUser({ ...user, title: val })}
            required={true}
            label="Title"
            placeholder="Backburner"
          />

          <InputGroupComponent
            id={`artist`}
            type="text"
            value={user.artist}
            onChange={(val) => setUser({ ...user, artist: val })}
            required={true}
            label="Artist"
            placeholder="NIKI"
          />

          <InputGroupComponent
            id={`description`}
            type="text"
            value={user.description}
            onChange={(val) => setUser({ ...user, description: val })}
            required={true}
            label="Description"
            placeholder="Lagu tentang second choice."
          />

          <InputGroupComponent
            id={`source`}
            type="url"
            value={user.source}
            onChange={(val) => setUser({ ...user, source: val })}
            required={true}
            label="Link Source"
            placeholder="Jl. in aja dulu"
          />

          <FileInput
            acceptTypes={[
              "image/png",
              "image/jpeg",
              "image/jpg",
              "application/pdf",
            ]}
            id={`thumbnail`}
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
