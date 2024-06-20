import { useContext } from "react";
import EmployeeContext from "@/context/EmployeeProvider";

export default function useEmployee() {
  return useContext(EmployeeContext);
}
