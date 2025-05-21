"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/global";
import { IPlaylist } from "../types";
import axios from "axios";
import Image from "next/image";
import Logo from "@/public/assets/Logo Sehati.png";

// export const getPlaylist = async (): Promise<IPlaylist[]> => {
//   try {
//     const url = `${BASE_API_URL}/playlists`;
//     const { data } = await axios.get(url);

//     let result: IPlaylist[] = [];
//     if (data?.status || data?.success) result = [...data.data];
//     return result;
//   } catch (error) {
//     console.error("Failed to fetch playlist:", error);
//     return [];
//   }
// };

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const router = useRouter();
  const url = `${BASE_API_URL}/playlists`;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { data } = await axios.get(url);
        if (data.success) {
          setPlaylists(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-4">
          <Image src={Logo} alt="Logo" width={200} className="rounded-full" />
        </div>

        <h2 className="text-3xl text-center mb-9">
          🎵 PLAYLIST{" "}
          <span className="text-[#7440FF] font-bold text-4xl">Sehati</span>
        </h2>

        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.uuid}
              onClick={() =>
                router.push(`/dashboard/playlist/${playlist.uuid}`)
              }
              className="border border-gray-300 p-4 rounded-lg hover:bg-indigo-200 transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold">
                {playlist.playlist_name}
              </h2>
              <p className="text-sm text-gray-600">
                Song count: {playlist.song_count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
