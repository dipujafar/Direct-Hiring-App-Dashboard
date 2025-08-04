"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { message, Pagination, Popconfirm, PopconfirmProps } from "antd";
import { PlusCircle } from "lucide-react";
import AddPostDialog from "./AddPostDialog";

interface HiringCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

export default function PostContainer() {
  const [openDialog, setOpenDialog] = useState(false);
  const [cards, setCards] = useState<HiringCard[]>([
    {
      id: 1,
      title: "Hire with Direct Hiring",
      description:
        "You will complete the hiring process through direct hiring for any position.",
      image: "/post_image.png",
    },
    {
      id: 2,
      title: "Hire with Direct Hiring",
      description:
        "You will complete the hiring process through direct hiring for any position.",
      image: "/post_image.png",
    },
    {
      id: 3,
      title: "Hire with Direct Hiring",
      description:
        "You will complete the hiring process through direct hiring for any position.",
      image: "/post_image.png",
    },
    {
      id: 4,
      title: "Hire with Direct Hiring",
      description:
        "You will complete the hiring process through direct hiring for any position.",
      image: "/post_image.png",
    },
    {
      id: 5,
      title: "Hire with Direct Hiring",
      description:
        "You will complete the hiring process through direct hiring for any position.",
      image: "/post_image.png",
    },
    {
      id: 6,
      title: "Hire with Direct Hiring",
      description:
        "You will complete the hiring process through direct hiring for any position.",
      image: "/post_image.png",
    },
  ]);

  const handleEdit = (id: number) => {
    setOpenDialog(true);
  };

  return (
    <div>
      <div className="flex justify-end ml-auto mt-5 mb-3">
        <Button
          onClick={() => setOpenDialog(true)}
          size={"sm"}
          className="bg-main-color"
        >
          <PlusCircle size={24} /> Add new Post
        </Button>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-64 w-full">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0  bg-white/30 backdrop-blur-sm p-2">
                  <h3 className="text-sm text-[#008725] font-medium">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-900 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
                </div> */}

                {/* Buttons Section */}
                <div className="flex gap-2">
                  <Popconfirm
                    title="Delete the Post"
                    description="Are you sure to delete this post?"
                    onConfirm={confirmBlock}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs border-green-600 text-green-700 hover:bg-gray-50"
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button
                    size="sm"
                    onClick={() => handleEdit(card.id)}
                    className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No cards available</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <Pagination defaultCurrent={1} total={cards.length} />
      </div>

      <AddPostDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}
