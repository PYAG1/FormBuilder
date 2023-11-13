import React from 'react'
import { FormElement } from '../../utils/types'
import {useDraggable} from "@dnd-kit/core"

export default function SideBarBtnElements({formElement}:{
    formElement:FormElement
}) {
    const {label,icon:Icon}=formElement.designerBtnElement
   const draggable = useDraggable({id:`designer-btn-${formElement.type}`,
  data:{
    type:formElement.type,
    isDesignerBtnElement:true
    
  }})
  return (
   <button ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} className=' py-2 hover:scale-100 transition-all duration-100 cursor-grab shadow-md hover:shadow-lg flex flex-col p-1 w-full items-center' >
    <Icon className="h-8 w-8 text-primary "/>
    <p className=' text-xs'>{label}</p>
   </button>
  )
}


 export function SideBarBtnElementsOverlay({formElement}:{
  formElement:FormElement
}) {
  const {label,icon:Icon}=formElement.designerBtnElement

return (
 <button  className=' py-2 hover:scale-100 transition-all duration-100 cursor-grab shadow-md hover:shadow-lg flex flex-col p-1 w-full items-center' >
  <Icon className="h-8 w-8 text-primary "/>
  <p className=' text-xs'>{label}</p>
 </button>
)
}
