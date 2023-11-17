import {ReactNode,createContext,useContext,useState} from "react"
import { FormElementInstance } from "../utils/types"

interface DesignerContextType{
    elements: FormElementInstance[]
    addElement:(index:number,element:FormElementInstance)=>void;
}

 const BuilderContext= createContext<DesignerContextType | null>(null)
 
export const useBuilderContext = ()=>{
    return useContext(BuilderContext)
}

export const BuilderProvider = ({children}:{children:ReactNode})=>{
    const [elements,setElement]= useState<FormElementInstance[]>([])
    const addElement=(index:number,element:FormElementInstance)=>{
setElement((prev)=>{
    const newElements = [...prev]
    newElements.splice(index,0,element)
    return newElements

})
    }

return <BuilderContext.Provider value={{elements,addElement}}>{children}</BuilderContext.Provider>
}