import React, { useState, useEffect, Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import NavBar from "../../components/Navigation/NavBar";
import {
  ScaleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import CreateFormButton from "../../components/MainPage/CreateFormBtn";
import { Navigate } from "react-router-dom";

import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { colRef } from "../../../firebase-config";
import FormDataComponent from "../../components/MainPage/FormDisplayComponent";
import { toast } from "react-toastify";

const cards = [
  { name: "Total visits", href: "#", icon: ScaleIcon, amount: "0" },
  { name: "Total Submission", href: "#", icon: CheckCircleIcon, amount: "0" },
  {
    name: "Submission rate",
    href: "#",
    icon: ArrowTrendingUpIcon,
    amount: "0",
  },
  { name: "Bounce rate", href: "#", icon: ArrowTrendingDownIcon, amount: "0" },
  // More items...
];

export default function MainPage() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);


    async function getFormData(updateState:any) {
      try {
        const snapshot = await getDocs(colRef);
        const formD = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setLoading(false);
        updateState(formD);
      } catch (error) {
        toast.error("Failed to Fetch");
        setLoading(false);
        updateState([]);
      }
    }
  
    const deleteForm = async (Id:string) => {
      try {
        // Delete the document
        await deleteDoc(doc(colRef, Id));
        toast.success("Form has been deleted");
  
        // Update state with the current data
        getFormData(setFormData);
      } catch (error) {
        console.error("Delete failed", error);
        toast.error("Delete failed");
      }
    };
  
    useEffect(() => {
      getFormData(setFormData);
    }, []);

  return (
    <div className=" w-full">
      <NavBar />

      <div className="w-full min-h-screen pt-8 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6  lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card */}
            {cards.map((card) => (
              <div
                key={card.name}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          {card.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {card.amount}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a
                      href={card.href}
                      className="font-medium text-cyan-700 hover:text-cyan-900"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6  lg:px-8">
          <p className=" text-2xl font-semibold py-6">Your Form</p>

          <div className=" w-full md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5">
            <CreateFormButton />
            {loading ? (
              <>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton
                    variant="rounded"
                    height={"180px"}
                    animation="wave"
                    key={item}
                  />
                ))}
              </>
            ) : formData.length === 0 ? (
              <div>No data available</div>
            ) : (
              formData.map((item: any) => (
                <FormDataComponent key={item?.id} {...item} deleteForm={deleteForm} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


