import { DocumentData, doc, getDocs, query, where } from "firebase/firestore";
import { ReactNode, useEffect, useState } from "react";
import { colRef, formSubsRef } from "../../../firebase-config";
import { ElementType, FormElementInstance, Row } from "../../utils/types";
import { useParams } from "react-router-dom";
import { formatDistance } from "date-fns";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SubmissionsTable() {
  const { id } = useParams();
  console.log("this is the id", id);

  const [people, setPeople] = useState([]);
  const [Form, setForm] = useState<any>();
  const getFormWithSubmission = async (FormID: string | undefined) => {
    try {
      const q = query(colRef, where("formId", "==", FormID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log("No matching documents found.");
        return null;
      }

      const documentData = querySnapshot.docs[0].data();

      setForm(documentData);
      console.log("Form", Form);
    } catch (error) {
      console.error("Error getting documents: ", error);
      // You might want to handle the error appropriately, e.g., throw it or log it.
    }
  };

  useEffect(() => {
    getFormWithSubmission(id);
  }, []);

  const formElement = JSON.parse(
    Form?.content || "[]"
  ) as FormElementInstance[];

  console.log("nice", formElement);

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: any;
  }[] = [];

  formElement.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extra?.label,
          required: element.extra?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];

  console.log("here", Form?.FormSubmission[0].createdAt.seconds);
  Form?.FormSubmission.forEach((sub: any) => {
    const content = JSON.parse(sub?.content);
    rows.push({ ...content, submittedAt: sub?.createdAt.seconds });
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.id}
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        {column.label}
                      </th>
                    ))}

                    <th
                      key={7}
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Submitted At
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {rows.map((sub, subIdx) => (
                    <tr key={subIdx * Math.random()}>
                      {columns.map((item) => (
                        <RowCell
                          key={item.id}
                          type={item.type}
                          value={sub[item.id]}
                        />
                      ))}
      <td
  className={classNames(
    subIdx !== rows.length - 1 ? "border-b border-gray-200" : "",
    "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
  )}
>
  {sub?.submittedAt
    ? formatDistance(
        new Date(sub?.submittedAt * 1000), // Convert seconds to milliseconds
        new Date(),
        { addSuffix: true }
      )
    : ''}
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementType; value: string }) {
  let node: ReactNode = value;
  return <td>{node}</td>;
}
