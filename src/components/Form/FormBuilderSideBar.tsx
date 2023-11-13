import React from 'react'
import { FormElements } from '../../utils/types'
import SideBarBtnElements from './SideBarBtnElements'

export default function FormBuilderSideBar() {
  return (
    <div className="w-full h-full p-2">
        <p className='raleway font-medium text-2xl'>
            Elements
            <SideBarBtnElements formElement={FormElements.TextField}/>

        </p>
    </div>
  )
}

