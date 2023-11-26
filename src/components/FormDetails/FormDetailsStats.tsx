import React, { useEffect, useState } from "react";
import {
  ScaleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { useUserFormContext } from "../../context/formcontext";
import { PuffLoader } from "react-spinners";

export default function FormDetailStats({ formData, loading }:{formData:any,loading:boolean}) {
  const { userId }: any = useUserFormContext();

  const [totalForms, setTotalForms] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [bounceRate, setBounceRate] = useState(0);

  const cards = [
    // { name: 'Total Forms', href: '#', icon: ScaleIcon, amount: totalForms },
    {
      name: "Total Submission",
      href: "#",
      icon: CheckCircleIcon,
      amount: formData?.submissions,
    },
    {
      name: "Total Visits",
      href: "#",
      icon: ArrowTrendingUpIcon,
      amount: formData?.visits,
    },
    {
      name: "Bounce Rate",
      href: "#",
      icon: ArrowTrendingDownIcon,
      amount: formData?.submissions,
    },
  ];

  return (
    <div className=" w-full flex justify-between gap-10">
      {cards.map((card) => (
        <div
          key={card.name}
          className="overflow-hidden rounded-lg bg-white shadow w-full" // Adjust the width as needed
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
                  <dd>{loading ? <PuffLoader size={30} /> : card.amount}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3"></div>
        </div>
      ))}
    </div>
  );
}
