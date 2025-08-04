"use client";

import type React from "react";

import { Dispatch, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlusCircle, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, and .png files are accepted."
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function UploadPostDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      form.setValue("image", e.dataTransfer.files);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      form.setValue("image", e.target.files);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleCancelUpload = () => {
    // Clean up the preview URL to prevent memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedFile(null);
    setImagePreview(null);
    form.setValue("image", undefined);
    form.clearErrors("image");
    // Reset the file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", {
      image: data.image[0],
      description: data.description,
    });
    // Handle form submission here
    setOpen(false);
    form.reset();
    setSelectedFile(null);
  };

  const handleClose = () => {
    // Clean up the preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setOpen(false);
    form.reset();
    setSelectedFile(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-center text-xl font-semibold">
            Upload New Post
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 pb-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className={`relative border-2 border-dashed rounded-lg overflow-hidden transition-colors ${
                          dragActive
                            ? "border-primary bg-primary/5"
                            : "border-gray-300 hover:border-gray-400"
                        } ${selectedFile ? "p-0" : "p-8"}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={handleFileSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        {selectedFile && imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <div className="text-white text-center">
                                <p className="text-sm mb-2">
                                  Drop new image to replace
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={handleCancelUpload}
                              className="absolute top-2 right-2 h-8 w-8 p-0 z-20"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                              <p className="text-xs font-medium truncate">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs opacity-80">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="text-sm text-gray-500">
                              <p>Drop your images here, or browse</p>
                              <p>jpg, png are allowed</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Short Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Details"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                size="lg"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
