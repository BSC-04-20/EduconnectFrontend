import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineMenuBook } from "react-icons/md";

export default function WhatWeOffer() {
  return (
    <div className="bg-sky-800 py-10">
      <div className="flex flex-col text-center px-4">
        <span className="text-white text-2xl font-bold">What We Offer</span>
        <span className="text-white text-sm font-light mt-2">
          Empowering Learning with Smart Collaboration and Seamless Access to Resources
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-[15%] px-6 mt-8">
        <div className="border border-white/30 rounded-md p-6">
          <div className="bg-sky-900 rounded-full w-fit p-3 mb-4">
            <MdOutlineMenuBook className="text-white size-7" />
          </div>
          <span className="text-white text-xl font-semibold">Resource Sharing</span>
          <p className="text-white text-sm mt-2">
            Lecturers upload, access, manage, and share academic resources seamlessly for efficient learning.
          </p>
        </div>

        <div className="border border-white/30 rounded-md p-6">
          <div className="bg-sky-900 rounded-full w-fit p-3 mb-4">
            <HiUserGroup className="text-white size-7" />
          </div>
          <span className="text-white text-xl font-semibold">Real-Time Discussions</span>
          <p className="text-white text-sm mt-2">
            Engage, collaborate, and exchange ideas instantly through interactive academic discussions.
          </p>
        </div>

        <div className="border border-white/30 rounded-md p-6">
          <div className="bg-sky-900 rounded-full w-fit p-3 mb-4">
            <HiUserGroup className="text-white size-7" />
          </div>
          <span className="text-white text-xl font-semibold">Classroom Management</span>
          <p className="text-white text-sm mt-2">
            Create, organize, and manage digital classrooms for structured academic collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}
