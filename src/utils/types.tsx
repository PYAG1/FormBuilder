import { ParagraphFieldFormElement } from "../components/fields/ParagraphField"
import { SeparatorFieldFormElement } from "../components/fields/SeparatorField"
import { SpacerFieldFormElement } from "../components/fields/SpaceField"
import { SubTitleFieldFormElement } from "../components/fields/SubTitle"
import { TextFieldFormElement } from "../components/fields/TextField"
import { TitleFieldFormElement } from "../components/fields/TitleField"


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

export type ElementType = "TextField" | "TitleField" | "SubTitleField" | "ParagraphField" |"SeparatorField" |"SpacerField" | "NumberField"
export type Row = {
    [key: string]: any;
    submittedAt: Date; // Assuming submittedAt is a Date property
  };
  
export type FormElement= {
    type:ElementType;
    construct:(id:string)=> FormElementInstance
    designerBtnElement:{
        icon:React.ElementType;label:string
    } 
    designerComponet:React.FC <{elementInstance:FormElementInstance}>,
    formComponent:React.FC<{elementInstance:FormElementInstance;
        submitValue?: (key: string, value: string) => void;
        isInvalid?: boolean;
        defaultValue?: string;
    }>,
    propComponent:React.FC<{elementInstance:FormElementInstance}>

    validate:(formElement:FormElementInstance,currentValue:string)=> boolean
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
    TextField:TextFieldFormElement,
    TitleField:TitleFieldFormElement,
    SubTitleField:SubTitleFieldFormElement,
    ParagraphField:ParagraphFieldFormElement,
    SeparatorField:SeparatorFieldFormElement,
    SpacerField:SpacerFieldFormElement,
    NumberField:
}

export interface FormBtnProps {
    formId: string | undefined;
  }