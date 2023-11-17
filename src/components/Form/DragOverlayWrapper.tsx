import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React ,{useState}from 'react'
import { SideBarBtnElementsOverlay } from './SideBarBtnElements'
import { ElementType, FormElements } from '../../utils/types'
import { useBuilderContext } from '../../context/designerContext'

export default function DragOverlayWrapper() {
    const { elements}:any= useBuilderContext()
    const [dragItem,setDraggedItem]= useState<Active | null>(null)
    useDndMonitor({
        onDragStart:(event)=> {
   setDraggedItem(event.active)
            
        },
        onDragCancel:(event)=> {
            setDraggedItem(null)
            
        },
        onDragEnd(event) {
            setDraggedItem(null)
        },
    })


if(!dragItem) return null;
    let node = <div>no drag overlay</div>
    const isDesignerBtn = dragItem?.data?.current?.isDesignerBtnElement;
    if(isDesignerBtn){
        const type = dragItem?.data?.current?.type as ElementType
        node=<SideBarBtnElementsOverlay formElement={FormElements[type]}/>
    }

    const isDesignerElement = dragItem.data?.current?.isDesignerElement;
if(isDesignerElement){
    const elementId = dragItem.data?.current?.elementId
    const element = elements.find((el)=> el.id === elementId)
    if(!element)node = <div>Element not found</div>
    else{
        const DesignerElementComponent= FormElements[element.type].designerComponet;
        node= <DesignerElementComponent elementInstance={element}/>
    }
}
  return (
<DragOverlay>
    {node}
</DragOverlay>
  )
}
