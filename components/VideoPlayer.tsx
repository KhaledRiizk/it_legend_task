"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Video = {
  id: string;
  title: string;
  url: string;
};

type Props = {
  videoList: Video[];
  heading?: string;
};

type Progress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const VideoPlayer: React.FC<Props> = ({
  videoList,
  heading = "Course Videos",
}) => {
  const [currentVideo, setCurrentVideo] = useState<Video>(videoList[0]);
  const [isWatched, setIsWatched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("watchedVideos");
      if (stored) setIsWatched(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("watchedVideos", JSON.stringify(isWatched));
    }
  }, [isWatched]);

  const handleProgress = (progress: Progress) => {
    if (progress.played >= 0.8 && !isWatched[currentVideo.id]) {
      setIsWatched((prev) => ({ ...prev, [currentVideo.id]: true }));
    }
  };

  const handleVideoClick = (video: Video) => setCurrentVideo(video);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 max-sm:hidden">{heading}</h1>
      <div className="flex space-x-4">
        <div className="w-1/3 max-sm:hidden">
          <ul className="space-y-2">
            {videoList.map((video) => (
              <li
                key={video.id}
                className={`cursor-pointer p-2 rounded-md ${
                  currentVideo.id === video.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleVideoClick(video)}
              >
                <div className="px-2 gap-2 flex items-center">
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
        <div className="w-2/3 flex flex-col-reverse sm:flex-col max-sm:flex-1 max-sm:w-full">
          <h2 className="text-3xl font-semibold my-4">{currentVideo.title}</h2>
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
