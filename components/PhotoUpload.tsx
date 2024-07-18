"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "../utils/supabase/client";

const PhotoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("photos")
      .upload(`public/${file.name}`, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
    } else {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(`public/${file.name}`);

      if (!data) {
        console.error("Error getting public URL");
      } else {
        const { publicUrl } = data;
        const { error: insertError } = await supabase
          .from("photos")
          .insert([{ url: publicUrl, description }]);

        if (insertError) {
          console.error("Error inserting photo:", insertError);
        } else {
          // Ideally, you'd call a fetchPhotos function here to refresh the photo list
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Input type="file" onChange={handleFileChange} className="mb-4" />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="mb-4"
      />
      <Button onClick={handleUpload} className="bg-blue-500 text-white">
        Upload
      </Button>
    </div>
  );
};

export default PhotoUpload;
