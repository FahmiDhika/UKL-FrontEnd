"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { BASE_API_URL } from "@/global";

export default function SongDetailPage() {
  const { uuid, suuid } = useParams();

  const [song, setSong] = useState<any>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_API_URL}/playlists/song/${suuid}`
        );
        if (data?.success) {
          setSong(data.data);
        }
      } catch (err) {
        console.error("Gagal ambil detail lagu:", err);
      }
    };

    if (suuid) fetchSong();
  }, [suuid]);

  if (!song) return <div className="p-10 text-center">Loading...</div>;

  const thumbnailUrl = `${BASE_API_URL}/thumbnail/${encodeURIComponent(
    song.thumbnail
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl text-purple-800 mb-8 text-center drop-shadow-md">
          🎵 Detail Lagu: <span className="font-bold border-b-4">{song.title}</span>
        </h1>

        <div className="border border-gray-300 p-6 text-center rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-tr bg-white/30 backdrop-blur-xl">
          <div className="w-full flex justify-center">
            <Image
              src={thumbnailUrl}
              alt={song.title}
              width={300}
              height={300}
              unoptimized={true}
              className="rounded-xl object-cover shadow-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-purple-700">
                {song.title}
              </h2>
              <p className="text-gray-700">🎤 {song.artist}</p>
              <p className="text-sm mt-2 text-gray-800">{song.description}</p>
              <p className="mt-2 text-md text-red-600 flex justify-center items-center gap-1">
                👍 <span>{song.likes.toLocaleString()}</span> likes
              </p>
              <a
                href={song.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-1 text-sm bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
              >
                🎥 Tonton di YouTube
              </a>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg">
              💬 Komentar:
            </h3>
            <ul className="space-y-2 text-start">
              {song.comments.map((comment: any, index: number) => (
                <li
                  key={index}
                  className="bg-purple-100 text-purple-900 p-3 rounded-xl shadow-sm"
                >
                  <span className="font-semibold">{comment.creator}:</span>{" "}
                  {comment.comment_text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
