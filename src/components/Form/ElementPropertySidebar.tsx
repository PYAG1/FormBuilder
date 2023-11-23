import React from 'react'
import { useBuilderContext } from '../../context/designerContext'
import { FormElements } from '../../utils/types';
import {AiOutlineClose} from "react-icons/ai"

export default function ElementPropertySidebar() {
    const {selectedElement,setSelectedElement}:any= useBuilderContext();
    if(!selectedElement) return null;

    const PropForm = FormElements[selectedElement?.type].propComponent
  return (
    <div className='w-full'>
  
    <div className=' w-full flex justify-between p-2'>
    <p className='raleway font-medium text-2xl'>Element Properties</p>
        <button title='close' onClick={()=>{
            setSelectedElement(null)
        }}>
            <AiOutlineClose/>
        </button>
    </div>
    <div className=' w-[100%] border-b-4 mb-3 '>

    </div>
<PropForm elementInstance={selectedElement}/>
</div>
  )
}
