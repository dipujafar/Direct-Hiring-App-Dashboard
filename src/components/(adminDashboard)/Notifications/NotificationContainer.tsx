"use client";
import { Divider, Pagination } from "antd";
import { useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import moment from "moment";
import { Trash2 } from "lucide-react";

const notificationData = [
  {
    message: "Sanchez Haro Manuel ",
    description: "started a new message from Singapore",
    time: "Mon Aug 03 2025 22:00:00 GMT+0000",
  },
  {
    message: "Sanchez Haro Manuel ",
    description: "started a new message from Singapore",
    time: "Mon Aug 02 2025 22:00:00 GMT+0000",
  },
  {
    message: "Sanchez Haro Manuel ",
    description: "started a new message from Singapore",
    time: "Mon Aug 02 2025 22:00:00 GMT+0000",
  },
];

const NotificationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate start and end index for slicing the doctors data based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div>
      <div className="min-h-[80vh] bg-section-bg p-7">
        <div className="flex gap-x-2">
          <h1 className="text-2xl text-text-color  mb-2">Notification</h1>
          <div className="size-9 bg-main-color  rounded-full flex justify-center items-center text-lg text-white">
            {notificationData?.length}
          </div>
        </div>
        <hr />
        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          {/* showing today notification */}
          <div className="space-y-5">
            {notificationData?.map((notification, index) => (
              <div className="flex items-center gap-x-4">
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg p-3 flex-1"
                >
                  <div className="flex justify-between gap-x-2 items-center">
                    <h5 className="font-medium text-xl">
                      {notification?.message}
                    </h5>
                    <p>{moment(notification?.time).fromNow()}</p>
                  </div>
                  <p className="text-gray-500">{notification?.description}</p>
                </div>
                {/* delete option */}
                {/* <div className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer">
                  <Trash2 color="#D30000"></Trash2>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
