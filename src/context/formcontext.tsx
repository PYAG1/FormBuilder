import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { getDocs } from "firebase/firestore";
import { colRef } from "../../firebase-config";

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

const userId = localStorage.getItem("UserId");


//@ts-ignore
return <UserFormContext.Provider value={{formTitle,setFormTitle,setdescription,description,userId}}>{children}</UserFormContext.Provider>
}