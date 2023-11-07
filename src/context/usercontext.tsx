import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

export interface Provider {
    children: ReactNode;
  }

const UserAuthContext = createContext(null);

export const useUserAuthContext = ()=>{
  return   useContext(UserAuthContext)
}


export const AuthProvider:React.FC<Provider>= ({children})=>{
const [LoggedUser,setLoggedUser]= useState({})
const token = localStorage.getItem("UserToken")

//@ts-ignore
return <UserAuthContext.Provider value={{LoggedUser,setLoggedUser,token}}>{children}</UserAuthContext.Provider>
}