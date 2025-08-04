"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, Play } from "lucide-react";

interface VideoItem {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
}

export default function OnBoardingVideo() {
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: "1",
      name: "Sample Presentation",
      url: "/placeholder.svg?height=120&width=200",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        const videoUrl = URL.createObjectURL(file);
        const newVideo: VideoItem = {
          id: Date.now().toString(),
          name: file.name,
          url: videoUrl,
          thumbnail: videoUrl,
        };
        setVideos((prev) => [newVideo]);
      } else {
        alert("Please select a video file.");
      }
    }
  };

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((video) => video.id !== id));
  };

  return (
    <div className="w-full ">
      <Card>
        <CardContent className="p-0">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-[#E6F4EA] border-b">
            <div className="text-green-700 font-medium col-span-2">
              On boarding Video
            </div>
            <div className="text-green-700 font-medium">Action</div>
          </div>

          {/* Video List */}
          <div className="divide-y">
            {videos.map((video) => (
              <div
                key={video.id}
                className="grid grid-cols-3 gap-4 p-4 items-center"
              >
                {/* Video Thumbnail */}

                <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden col-span-2">
                  <img
                    src={video.thumbnail || "/on-boarding-vido-thumbnil.png"}
                    alt={video.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleUpload}
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Change
                  </Button>
                  <Button
                    onClick={() => handleDelete(video.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {videos.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                No on-boarding videos uploaded yet
              </div>
              <Button
                onClick={handleUpload}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
