import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserFormContext } from "../../context/formcontext";
import NavBar from "../../components/Navigation/NavBar";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import FormDetailStats from "../../components/FormDetails/FormDetailsStats";
import SubmissionsTable from "../../components/FormDetails/SubmissionsTable";

export default function FormDetails() {
  const { id } = useParams();
  const { userId, getDataByIdAndUserId, formData }: any = useUserFormContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting to fetch data
        setLoading(true);

        await getDataByIdAndUserId(id, userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Set loading to false when done fetching data
        setLoading(false);
      }
    };

    fetchData();
  }, [id, userId]);

  console.log(formData);

  const shareUrl = `${window.location.origin}/submit/${formData?.shareUrl}`;

  return (
    <div className="w-full">
      <NavBar />
      <main className="w-full p-8 space-y-8 bg-background h-full">
        <div className="w-full flex items-center justify-between">
          <p className="raleway text-2xl font-semibold ">
            {formData?.title || "Loading..."}
          </p>
          <button
            onClick={() => {
              window.open(shareUrl, "_blank");
            }}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Visit
          </button>
        </div>
        <div className="w-full flex items-center justify-between ">
          <div className="flex flex-col">
            <p>Share Link</p>
            <input
              readOnly
              className="min-w-[550px] border text-sm h-full border-gray-300 font-normal text-gray-500 placeholder:text-gray-400 rounded-md  pl-4 py-2"
              value={shareUrl}
            />
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast.success("Link Copied");
            }}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            <IoCopyOutline />
          </button>
        </div>

        <FormDetailStats formData={formData} loading={loading} />

        <div>
          <SubmissionsTable />
        </div>
      </main>
    </div>
  );
}
