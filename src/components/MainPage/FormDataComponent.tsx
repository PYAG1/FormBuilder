import React from "react";

 function FormDataComponent() {
  let published = false;
  let description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  return (
    <div className="w-full bg-gray-200 p-5 flex flex-col justify-between rounded-[12px]">
      <div className=" flex justify-between items-center ">
        <p className=" text-xl font-semibold raleway">Form Name</p>

        {published ? (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
            Draft
          </span>
        ) : (
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
            <svg
              className="-ml-1 mr-1.5 h-2 w-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            Published
          </span>
        )}
      </div>
      <div className="w-full h-10 manrope text-sm overflow-hidden">
        {description}

      </div>
      <p className=" text-xs">10 seconds ago</p>
      <button className=" w-full py-1 bg-primary text-secondary rounded-[8px] font-medium">
Edit
      </button>
    </div>
  );
}
