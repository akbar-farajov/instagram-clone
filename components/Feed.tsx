import { Photo } from "@/types/custom";
import Image from "next/image";

const Feed = ({ photos }: { photos: Array<Photo> }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-4 mt-8">
      {photos!.map((photo) => (
        <div key={photo.id} className="w-96 h-80">
          <Image src={photo.url} alt="photo" width={300} height={300} />
          <p className="text-white">{photo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
