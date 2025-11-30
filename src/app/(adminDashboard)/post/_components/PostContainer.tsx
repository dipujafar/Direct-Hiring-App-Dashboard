"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pagination, Popconfirm, PopconfirmProps } from "antd";
import { PlusCircle } from "lucide-react";
import AddPostDialog from "./AddPostDialog";
import {
  useAllAnnouncementsQuery,
  useDeleteAnnouncementMutation,
} from "@/redux/api/announcementApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function PostContainer() {
  const [selectedId, setSelectedId] = useState<string | null>("");
  const [openDialog, setOpenDialog] = useState(false);

  const [deleteAnnouncement] = useDeleteAnnouncementMutation();
  const { data: announceMentData } = useAllAnnouncementsQuery(undefined);
  // console.log("announceMentData", announceMentData?.data);

  const handleEdit = (id: number) => {
    setOpenDialog(true);
  };

  //  Announcement Delete handler
  const confirmBlock: PopconfirmProps["onConfirm"] = async (e) => {
    try {
      const res = await deleteAnnouncement(selectedId).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log("Announcement delete error::", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <div className="flex justify-end ml-auto mt-5 mb-3">
        <Button
          onClick={() => setOpenDialog(true)}
          size={"sm"}
          className="bg-main-color"
        >
          <PlusCircle size={24} /> Add new Announcement
        </Button>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announceMentData?.data?.map((card: any) => (
            <div
              key={card?._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-64 w-full">
                {card?.mimetype?.startsWith("video") ? (
                  <video
                    src={card?.image}
                    className="w-full h-full object-cover rounded-md"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={card?.image || "/placeholder.svg"}
                    alt={card?.title || "image"}
                    fill
                    className="object-cover rounded-md"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0  bg-white/30 backdrop-blur-sm p-2">
                  <h3 className="text-sm text-[#008725] font-medium">
                    {card?.title}
                  </h3>
                  <p className="text-xs text-gray-900 leading-relaxed line-clamp-2">
                    {card?.description}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
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
                      onClick={() => setSelectedId(card?._id)}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                  {/* <Button
                    size="sm"
                    onClick={() => handleEdit(card?._id)}
                    className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                  >
                    Edit
                  </Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {announceMentData?.data?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No cards available</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <Pagination defaultCurrent={1} total={announceMentData?.data?.length} />
      </div>

      <AddPostDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}
