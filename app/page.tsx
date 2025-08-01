import VideoPlayer from "@/components/VideoPlayer";
import { videoList } from "@/constants/data";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <VideoPlayer videoList={videoList} />

      <p className="mt-12 text-2xl">Comments</p>
    </section>
  );
}
