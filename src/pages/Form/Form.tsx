import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { colRef } from "../../../firebase-config";
import NavBar from "../../components/Navigation/NavBar";
import { useUserFormContext } from "../../context/formcontext";
import Formbuilder from "../../components/Form/Formbuilder";

const Form = () => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const { userId }:any = useUserFormContext();

  const getDataByIdAndUserId = async (id:any, userId:any) => {
    try {
      const q = query(colRef, where("formId", "==", id), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log("No matching documents found.");
        return null;
      }

      const documentData = querySnapshot.docs[0].data();
      setFormData(documentData);
      console.log("apple", documentData);
    } catch (error) {
      console.error("Error querying data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getDataByIdAndUserId(id, userId);
  }, [id, userId]);

  return (
    <div>
      <NavBar />

      <div className="p-2">
        <Link to="/home" className="underline manrope hover:text-primary">
          Go Back to Home
        </Link>
      </div>
    
<Formbuilder data={formData}/>
    </div>
  );
};

export default Form;
