import React from 'react'
import SideBarBtnElements from './SideBarBtnElements'
import { FormElements } from '../../utils/types'
export default function FormElementSideBar() {
  return (
 <div >
    
        <p className='raleway font-semibold text-2xl'>
            Elements</p>
            <div>
              <p className=' raleway mt-6 '>Layout Elements</p>
<div className=' grid grid-cols-2 gap-5 mt-6 '>
  

            <SideBarBtnElements formElement={FormElements.TitleField}/>
            <SideBarBtnElements formElement={FormElements.SubTitleField}/>
</div>
</div>
<div>
<p className=' raleway mt-6 '>Form Elements</p>
<div className=' grid grid-cols-2 gap-5 mt-6 '>
<SideBarBtnElements formElement={FormElements.TextField}/>
<SideBarBtnElements formElement={FormElements.ParagraphField}/>
<SideBarBtnElements formElement={FormElements.SeparatorField}/>
<SideBarBtnElements formElement={FormElements.SpacerField}/>
<SideBarBtnElements formElement={FormElements.NumberField}/>
<SideBarBtnElements formElement={FormElements.TextAreaField}/>
<SideBarBtnElements formElement={FormElements.DateField}/>
</div>
</div>

    
 </div>
  )
}
