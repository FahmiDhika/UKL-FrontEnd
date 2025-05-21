"use client";

import { BASE_API_URL } from "@/global";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PlaylistDetailPage() {
  const { uuid } = useParams();
  const [songs, setSongs] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_API_URL}/playlists/song-list/${uuid}`
        );
        if (data?.success) {
          setSongs(data.data);
        }
      } catch (error) {
        console.error("Error fetching playlist detail:", error);
      }
    };

    if (uuid) fetchSongs();
  }, [uuid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center drop-shadow-md">
          🎶 Lagu dalam Playlist
        </h1>

        <div className="grid gap-8">
          {songs.map((song: any) => {
            const thumbnailUrl = `${BASE_API_URL}/thumbnail/${encodeURIComponent(
              song.thumbnail
            )}`;

            return (
              <div
                key={song.uuid}
                className="border border-gray-300 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-tr from-white to-purple-50 flex gap-6 items-center"
                onClick={() =>
                  router.push(`/dashboard/playlist/${uuid}/song/${song.uuid}`)
                }
              >
                <Image
                  src={thumbnailUrl}
                  alt={song.title}
                  width={120}
                  height={120}
                  unoptimized={true}
                  className="rounded-xl object-cover shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold text-purple-700">
                    {song.title}
                  </h2>
                  <p className="text-gray-700 font-semibold">
                    🎤 {song.artist}
                  </p>
                  <p className="text-sm mt-1 text-gray-800">
                    {song.description}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    👍 {song.likes.toLocaleString()} likes
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
