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
function getFormData(){
  getDocs(colRef).then((snapshot)=>{
    let formD = []
    snapshot.docs.forEach((doc)=>{
      formD.push({...doc.data(), id:doc.id})
    })
    console.log("apple",formD)
  }).catch(err=>{
    console.log(err)
  })
  
}

//@ts-ignore
return <UserFormContext.Provider value={{formTitle,setFormTitle,setdescription,description,getFormData}}>{children}</UserFormContext.Provider>
}