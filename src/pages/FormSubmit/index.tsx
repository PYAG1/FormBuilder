import {
  addDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState, useRef, useCallback, useTransition } from "react";
import { useParams } from "react-router-dom";
import { colRef, formSubsRef } from "../../../firebase-config";
import { useUserFormContext } from "../../context/formcontext";
import { FormElementInstance, FormElements } from "../../utils/types";
import NavBar from "../../components/Navigation/NavBar";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function FormSubmit() {
  const { formurl } = useParams();
  const SubmitForm = async (formUrl: string | undefined, content: string) => {
    const formSubmissionData = {
      formurl: formUrl,
      content: content,
      createdAt: new Date(), // Add the createdAt field with the current timestamp
    };
  
    try {
      // Use where() to query documents with the specified shareUrl
      await addDoc(formSubsRef, formSubmissionData);
      const querySnapshot = await getDocs(
        query(colRef, where("shareUrl", "==", formUrl))
      );
  
      const querySnapshotForFormSub = await getDocs(
        query(formSubsRef, where("formurl", "==", formUrl))
      );
      const allDocuments: any[] = [];
  
      // Check if there are any matching documents
      if (!querySnapshot.empty && !querySnapshotForFormSub.empty) {
        const docRef = querySnapshot.docs[0].ref;
        querySnapshotForFormSub.forEach((doc) => {
          const data = doc.data();
          allDocuments.push(data);
        });
        // Use update() to increment the 'submissions' field by 1
        await updateDoc(docRef, {
          submissions: increment(1),
          FormSubmission: allDocuments,
        });
      }
  
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };
  

  console.log(formurl);
  const { userId }: any = useUserFormContext();
  const [content, setContent] = useState<
    string | FormElementInstance[] | undefined
  >();
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [ready, SetReady] = useState(false);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast.error("Please Check for Errors");
      return;
    }
    try {
      const JsonCon = JSON.stringify(formValues.current);
      await SubmitForm(formurl, JsonCon);
      setSubmitted(true);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);

  const [pending, startTransistion] = useTransition();

  const validateForm = useCallback(() => {
    for (const field of content as FormElementInstance[]) {
      const actualValue = formValues.current[field?.id] || "";
      const formElementType = FormElements[field.type];

      if (formElementType && formElementType.validate) {
        const valid = formElementType.validate(field, actualValue);
        if (!valid) {
          formErrors.current[field.id] = true;
        }
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const getFormContentByIdAndUserId = useCallback(
    async (url: any, userId: any) => {
      try {
        const q = query(
          colRef,
          where("shareUrl", "==", url),
          where("userId", "==", userId),
          where("published", "==", true)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
          console.log("No matching documents found.");
          return null;
        }

        const documentData = querySnapshot.docs[0].data();
        const docRef = querySnapshot.docs[0].ref;

        setContent(documentData?.content);
        settitle(documentData?.title);
        setdesc(documentData?.desc);

        const readyTimeOut = setTimeout(() => SetReady(true), 100);
        await updateDoc(docRef, { visits: increment(1) });

        console.log("updated");
        return () => clearTimeout(readyTimeOut);
      } catch (error) {
        console.error("Error querying data:", error);
        throw error;
      }
    },
    [colRef, updateDoc, SetReady]
  );

  useEffect(() => {
    if (formurl && userId) {
      getFormContentByIdAndUserId(formurl, userId);
    }
  }, [formurl, userId]);

  const formContent = content
    ? //@ts-ignore
      (JSON.parse(content) as FormElementInstance[])
    : [];

  return (
    <div className="w-full ">
      <NavBar />
      {!ready ? (
        <div className="flex flex-col h-screen items-center justify-center">
          <ClipLoader />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center manrope p-16">
          {submitted ? (
            <div className="h-[70vh]  w-full flex justify-center items-center">
              <div>
                <p className="text-2xl raleway font-semibold">Form Submitted</p>
                <p>Thank you your feedback will be helpful</p>
              </div>
            </div>
          ) : (
            <div
              key={renderKey}
              className="w-[40%] flex flex-col justify-center space-y-6"
            >
              <div>
                <p className="font-semibold raleway text-2xl">{title}</p>
                <p>{desc}</p>
              </div>
              {formContent.map((ele) => {
                const FormElement = FormElements[ele.type].formComponent;
                return (
                  <FormElement
                    key={ele.id}
                    elementInstance={ele}
                    submitValue={submitValue}
                    isInvalid={formErrors.current[ele.id]}
                    defaultValue={formValues.current[ele.id]}
                  />
                );
              })}
              <button
                className="inline-flex w-max justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:text-sm"
                onClick={() => {
                  startTransistion(() => {
                    submitForm();
                  });
                }}
                disabled={pending}
              >
                {pending ? <ClipLoader size={20} /> : <p>Submit</p>}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
