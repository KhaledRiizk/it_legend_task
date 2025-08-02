"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState, useMemo, useCallback } from "react";

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
  const initialVideo = useMemo(
    () => videoList[0] ?? { id: "", title: "No Video", url: "" },
    [videoList]
  );
  const [currentVideo, setCurrentVideo] = useState<Video>(initialVideo);
  const [isWatched, setIsWatched] = useState<Record<string, boolean>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("watchedVideos");
        if (stored) setIsWatched(JSON.parse(stored));
      } catch {
        setIsWatched({});
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("watchedVideos", JSON.stringify(isWatched));
    }
  }, [isWatched]);

  const handleProgress = useCallback(
    (progress: Progress) => {
      if (progress.played >= 0.8 && !isWatched[currentVideo.id]) {
        setIsWatched((prev) => ({ ...prev, [currentVideo.id]: true }));
      }
    },
    [currentVideo, isWatched]
  );

  const handleVideoClick = useCallback(
    (video: Video) => setCurrentVideo(video),
    []
  );

  if (!videoList.length) {
    return <div>No videos available.</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 max-sm:hidden">{heading}</h1>

      {/* Mobile drawer button */}
      <button
        className="sm:hidden mb-4 px-4 py-2 border border-blue-100 bg-blue-50 text-white rounded"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open video list"
      >
        <Image
          src={`/icons/hamburger-menu.svg`}
          width={24}
          height={24}
          alt="Open video list"
        />
      </button>
      {/* Drawer for mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-40 sm:hidden">
          <div className="absolute left-0 top-0 h-full w-[350px] bg-white shadow-lg p-4 z-50">
            <button
              className="mb-4 px-2 py-1  rounded flex justify-self-end"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close video list"
            >
              <Image
                src={`/icons/close.svg`}
                width={24}
                height={24}
                alt="Close video list"
              />
            </button>
            <ul className="space-y-2">
              {videoList.map((video) => (
                <li
                  key={video.id}
                  className={`cursor-pointer p-2 rounded-md ${
                    currentVideo.id === video.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    handleVideoClick(video);
                    setDrawerOpen(false);
                  }}
                  aria-label={`Play ${video.title}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleVideoClick(video);
                      setDrawerOpen(false);
                    }
                  }}
                >
                  <div className="px-2 gap-2 flex items-center">
                    {isWatched[video.id] && (
                      <Image
                        src={"/icons/green-check2.svg"}
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
          {/* Click outside to close */}
          <div
            className="absolute inset-0 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        </div>

      )}

      <div className="flex space-x-4">
        <nav className="w-1/3 max-sm:hidden" aria-label="Video list">
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
                aria-label={`Play ${video.title}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleVideoClick(video);
                }}
              >
                <div className="px-2 gap-2 flex items-center">
                  {isWatched[video.id] && (
                    <Image
                      src={"/icons/green-check2.svg"}
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
        </nav>
        <section className="w-2/3 flex flex-col-reverse sm:flex-col max-sm:flex-1 max-sm:w-full">
          <h2 className="text-3xl font-semibold my-4">{currentVideo.title}</h2>
          <ReactPlayer
            key={currentVideo.id}
            url={currentVideo.url}
            controls
            width={"100%"}
            height={"360px"}
            onProgress={handleProgress}
          />
        </section>
      </div>
    </div>
  );
};

export default VideoPlayer;
