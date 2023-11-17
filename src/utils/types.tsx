import { TextFieldFormElement } from "../components/fields/TextField"


export interface Form  {
    content: string
    createdAt?: any
    description: string
    formId:any
    published: boolean
    shareUrl: string
    submissions: number
    title: string
    userId: string
    visits: number
  
};

export type ElementType = "TextField" 


export type FormElement= {
    type:ElementType;
    construct:(id:string)=> FormElementInstance
    designerBtnElement:{
        icon:React.ElementType;label:string
    }
    designerComponet:React.FC <{elementInstance:FormElementInstance}>
    formComponent:React.FC,
    propComponent:React.FC
}
export type FormElementInstance={
    id:string;
    type:ElementType
    extra?:Record<string,any>
}
 
type FormElementsType= {
    [key in ElementType]:FormElement;
}
export const FormElements:FormElementsType= {
    TextField:TextFieldFormElement
}