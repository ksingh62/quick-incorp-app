"use client"
import { createContext } from "react";
import { useState } from "react";
import { db } from "@/app/prototype/_utils/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useMemo, useCallback } from "react";

const EmployeeContext = createContext();

export function EmployeeProvider({children}) {
  const memoizedDb = useMemo(() => db, []);

  const [employees, setEmployees] = useState([]);
  const [noOfUsersAdded, setNoOfUsersAdded] = useState(0);

  const employeesCollection = useMemo(
    () => collection(memoizedDb, "employees"),
    [memoizedDb]
  );

  const getEmployees = useCallback(async () => {
    const employeesDocs = await getDocs(employeesCollection);
    const employeesData = employeesDocs.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setEmployees(employeesData);
  }, [employeesCollection]);

  const addEmployee = async (employeeInfo) => {
    await addDoc(employeesCollection, employeeInfo);
    setNoOfUsersAdded(noOfUsersAdded + 1);
  };

  const deleteEmployee = async (employeeDocId) => {
    const employee = doc(memoizedDb, "employees", employeeDocId);
    await deleteDoc(employee);
    setNoOfUsersAdded(noOfUsersAdded - 1);
  };

  const updateEmployee = async (employeeDocId, newData) => {
    const employee = doc(memoizedDb, "employees", employeeDocId);
    await updateDoc(employee, newData);
    setNoOfUsersAdded(noOfUsersAdded - 1);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        noOfUsersAdded,
        getEmployees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeContext;
