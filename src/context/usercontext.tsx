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
const [ISuser, ISsetUser]= useState(false)



//@ts-ignore
return <UserAuthContext.Provider value={{LoggedUser,setLoggedUser,ISuser, ISsetUser}}>{children}</UserAuthContext.Provider>
}