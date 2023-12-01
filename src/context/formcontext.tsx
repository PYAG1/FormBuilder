import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { colRef } from "../../firebase-config";
import { getDocs, collection, query, where, getCountFromServer } from "firebase/firestore";
import { Form } from "../utils/types";


export interface Provider {
    children: ReactNode;
  }

const UserFormContext = createContext(null);
export const useUserFormContext = ()=>{
  return   useContext(UserFormContext)
}


export const FormsProvider:React.FC<Provider>= ({children})=>{
const [formTitle, setFormTitle]= useState("")
const [description,setdescription]= useState("")
const [formData, setFormData] = useState<Form | null>(null);
const [StatsLoading,setStatsLoading]= useState(true)
  const [totalForms, setTotalForms] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [bounceRate, setBounceRate] = useState(0);
  const userId = localStorage.getItem("UserId");

  const fetchStatsData = async () => {
    try {

      const totalFormsQuery = query(colRef, where('userId', '==', userId));
      const totalFormsSnapshot = await getCountFromServer(totalFormsQuery);
      setStatsLoading(false)
      setTotalForms(totalFormsSnapshot.data().count);

      // Fetch and set data for other stats in a similar way
      // ...

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


const getDataByIdAndUserId = async (id: any, userId: any) => {
  try {
    const q = query(
      colRef,
      where("formId", "==", id),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      console.log("No matching documents found.");
      return null;
    }

    const documentData = querySnapshot.docs[0].data();
    //@ts-ignore
    setFormData(documentData);
    console.log("apple", documentData);
  } catch (error) {
    console.error("Error querying data:", error);
    throw error;
  }
};




//@ts-ignore
return <UserFormContext.Provider value={{formTitle,setFormTitle,setdescription,description,userId,getDataByIdAndUserId,formData,fetchStatsData,StatsLoading,setStatsLoading,totalForms,totalSubmissions,totalVisits,bounceRate}}>{children}</UserFormContext.Provider>
}