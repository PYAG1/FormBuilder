
import { useBuilderContext } from '../../context/designerContext'
import FormElementSideBar from './FormElementSideBar'
import ElementPropertySidebar from './ElementPropertySidebar'

export default function FormBuilderSideBar() {
  const {selectedElement}= useBuilderContext()
  return (
    <div className="w-full h-full p-2">
{
  !selectedElement && (<FormElementSideBar/>)
}
{
  selectedElement && (<ElementPropertySidebar/>)
}
    </div>
  )
}

