import React from 'react'
import SideBarBtnElements from './SideBarBtnElements'
import { FormElements } from '../../utils/types'
export default function FormElementSideBar() {
  return (
 <div>
    
        <p className='raleway font-medium text-2xl'>
            Elements</p>

            <SideBarBtnElements formElement={FormElements.TextField}/>

    
 </div>
  )
}
