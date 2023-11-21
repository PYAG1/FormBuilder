import React from 'react'
import { useBuilderContext } from '../../context/designerContext'
import { FormElements } from '../../utils/types';

export default function ElementPropertySidebar() {
    const {selectedElement}:any= useBuilderContext();
    if(!selectedElement) return null;
    const PropForm = FormElements[selectedElement?.type].formComponent
  return (
    <div>
  
        <p className='raleway font-medium text-2xl'>Element Properties</p>
<PropForm/>
</div>
  )
}
