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
const [userEmail,setUserEmail]= useState("")
const [token, setToken]= useState("")

//@ts-ignore
return <UserAuthContext.Provider value={{userEmail,setUserEmail,token,setToken}}>{children}</UserAuthContext.Provider>
}