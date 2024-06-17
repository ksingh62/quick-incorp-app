import { mockDataTeam } from "../mockData";
import { DataGrid } from "@mui/x-data-grid";

export default function Page() {
    const columns = [
        { field: "id", headerName: "ID", headerClassName: "bg-purple-900" },
        { field: "name", headerName: "Name", headerClassName: "bg-purple-900"},
        { field: "email", headerName: "Email", headerClassName: "bg-purple-900"},
        { field: "age", headerName: "Age", headerClassName: "bg-purple-900"},
        { field: "phone", headerName: "Phone Number", headerClassName: "bg-purple-900", flex: "1"},
      ];
    
      return (
        <>
          <h1>Team</h1>
          <DataGrid rows={mockDataTeam}  columns={columns } sx={{color: "white"}} />
        </>
      );
}