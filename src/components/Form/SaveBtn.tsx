import React, { useState } from 'react';
import { useBuilderContext } from '../../context/designerContext';
import { getDocs, query, where, updateDoc } from 'firebase/firestore';
import { colRef } from '../../../firebase-config';
import {  ClipLoader } from 'react-spinners';
import { useUserFormContext } from '../../context/formcontext';
import { toast } from 'react-toastify';
import { FormBtnProps } from '../../utils/types';


const SaveBtn:React.FC<FormBtnProps>=({ formId }: { formId: string | undefined }) =>{
  const { elements } = useBuilderContext();
  const { userId }: any = useUserFormContext();

  const [loading, setLoading] = useState(false);

  const UpdateFormContent = async (id: string | undefined, data: string) => {
    try {
      setLoading(true);

      const q = query(colRef, where('formId', '==', id), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log('No matching documents found.');
        return null;
      }

      const documentData = querySnapshot.docs[0].ref;

      // Update the document with the new data
      await updateDoc(documentData, { content: data });

      // Replace "content" with the actual field you want to update
      setLoading(false);
      toast.success('Form has been saved');
    } catch (error) {
      setLoading(false);
      console.error('Error querying data:', error);
      throw error;
    }
  };

  const updateContent = async () => {
    try {
      const JSONelements = JSON.stringify(elements);
      await UpdateFormContent(formId, JSONelements);
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  return (
    <>
      <button className='py-2 px-4 bg-primary rounded-lg text-white flex justify-center items-center' onClick={updateContent}>
      {!loading  ?<p>Save</p>:
          < ClipLoader color='white' size={20}  />}
      </button>
     
    
    </>
  );
}

export default SaveBtn;