import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React ,{useState}from 'react'
import { SideBarBtnElementsOverlay } from './SideBarBtnElements'
import { ElementType, FormElements } from '../../utils/types'

export default function DragOverlayWrapper() {
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

    let node = <div>no drag overlay</div>
    const isDesignerBtn = dragItem?.data?.current?.isDesignerBtnElement;
    if(isDesignerBtn){
        const type = dragItem?.data?.current?.type as ElementType
        node=<SideBarBtnElementsOverlay formElement={FormElements[type]}/>
    }
  return (
<DragOverlay>
    {node}
</DragOverlay>
  )
}
