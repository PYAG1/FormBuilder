import React, { useEffect, useState } from 'react';
import {
  ScaleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import { query, where, collection,getCountFromServer } from 'firebase/firestore';
import { colRef } from '../../../firebase-config';
import { useUserFormContext } from '../../context/formcontext';
import { PuffLoader } from 'react-spinners';


export default function StatsCard({}) {
const {userId}:any= useUserFormContext()

const [loading,setLoading]= useState(true)
  const [totalForms, setTotalForms] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [bounceRate, setBounceRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const totalFormsQuery = query(colRef, where('userId', '==', userId));
        const totalFormsSnapshot = await getCountFromServer(totalFormsQuery);
        setLoading(false)
        setTotalForms(totalFormsSnapshot.data().count);

        // Fetch and set data for other stats in a similar way
        // ...

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [colRef]);

  console.log(totalForms);
  

  const cards = [
    { name: 'Total Forms', href: '#', icon: ScaleIcon, amount: totalForms },
    { name: 'Total Submission', href: '#', icon: CheckCircleIcon, amount: totalSubmissions },
    { name: 'Total Visits', href: '#', icon: ArrowTrendingUpIcon, amount: totalVisits },
    { name: 'Bounce Rate', href: '#', icon: ArrowTrendingDownIcon, amount: bounceRate },
    
  ];

  return (
  <>
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
                          {
                            loading ? (<PuffLoader size={30}/>):   card.amount
                          }
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                </div>
              </div>
            ))}
</>
  );
}
