"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, ImageIcon } from "lucide-react";
interface ImageItem {
  id: string;
  name: string;
  url: string;
  size?: number;
}

export default function OnboardingImage() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      name: "Sample Image.jpg",
      url: "/on-boarding-page-image.png",
      size: 1024000,
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        const newImage: ImageItem = {
          id: Date.now().toString(),
          name: file.name,
          url: imageUrl,
          size: file.size,
        };
        setImages((prev) => [newImage]);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="w-full  ">
      <Card>
        <CardContent className="p-0">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-[#E6F4EA] border-b">
            <div className="text-green-700 font-medium col-span-2">On Boarding Image</div>
            <div className="text-green-700 font-medium">Action</div>
          </div>

          {/* Image List */}
          <div className="divide-y">
            {images.map((image) => (
              <div
                key={image.id}
                className="grid grid-cols-3 gap-4 p-4 items-center"
              >
                {/* Image Thumbnail */}

                <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden border col-span-2">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1">
                    <ImageIcon className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleUpload}
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                  <Button
                    onClick={() => handleDelete(image.id)}
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
          {images.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                No Onboarding images uploaded{" "}
              </div>
              <Button
                onClick={handleUpload}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
