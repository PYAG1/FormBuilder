import { MdTextFields } from "react-icons/md";
import { ElementType, FormElement } from "../../utils/types";

const type: ElementType= "TextField";

export const TextFieldFormElement:FormElement={
type,
construct:(id:string)=>({
    id,
    type,
    extra:{
        label:"",
        placeholder:"hi there",
        helperText:"Ho there",
        required:false
    }
}),
designerBtnElement:{
    icon:MdTextFields,
    label:"Text Field"
},
designerComponet:()=><div>Apple</div>,
formComponent:()=><div>Pear </div>,
propComponent:()=><div>Banana</div>,
}
