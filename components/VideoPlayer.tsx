"use client";

import { videoList } from "@/constants/data";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
interface Video {
  id: string;
  url: string;
  title: string;
}

const VideoPlayer = () => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const [currentVideo, setCurrentVideo] = useState<Video>(videoList[0]);
  const [isWatched, setIsWatched] = useState<Record<string, boolean>>({});
  // const playerRef = useRef<any>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const player = playerRef.current;
  //     if (player && player.getCurrentTime && player.getDuration) {
  //       const played = player.getCurrentTime() / player.getDuration();

  //       if (played >= 0.8 && !isWatched[currentVideo.id]) {
  //         setIsWatched((prev) => ({ ...prev, [currentVideo.id]: true }));
  //       }
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [currentVideo, isWatched]);

  useEffect(() => {
    const storedWatched = localStorage.getItem("watchedVideos") || "{}";
    setIsWatched(JSON.parse(storedWatched));
  }, []);

  useEffect(() => {
    console.log("isWatched:", isWatched);

    localStorage.setItem("watchedVideos", JSON.stringify(isWatched));
  }, [isWatched]);

  const handleProgress = (progress: any) => {
    console.log("Progress:", progress);

    if (progress.played >= 0.8 && !isWatched[currentVideo.id]) {
      setIsWatched((prev) => ({ ...prev, [currentVideo.id]: true }));
    }
  };
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Course Videos</h1>
      <div className="flex space-x-4">
        <div className="w-1/3">
          {/* Video List  */}
          <ul className="space-y-2">
            {videoList.map((video) => (
              <li
                key={video.id}
                className={`cursor-pointer p-2 rounded-md ${currentVideo.id === video.id ? "bg-blue-100" : "hover:bg-gray-100"} `}
                onClick={() => setCurrentVideo(video)}
              >
                <div className=" px-2 gap-2 flex items-center">
                  {isWatched[video.id] && (
                    <Image
                      src={"/icons/green-check.svg"}
                      width={24}
                      height={24}
                      alt="watched"
                    />
                  )}
                  <h2>{video.title}</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3">
          {/* Video Player */}
          <ReactPlayer
            key={currentVideo.id}
            url={currentVideo.url}
            controls
            width={"100%"}
            height={"360px"}
            onProgress={handleProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
