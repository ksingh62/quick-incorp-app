import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "./mockData";

export default function Page() {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "age", headerName: "Age" },
    { field: "phone", headerName: "Phone Number" },
  ];

  return (
    <>
      <h1>Team</h1>
      <DataGrid rows={mockDataTeam} columns={columns} />
    </>
  );
}
// npm i @mui/material @emotion/react @emotion/react @emotion/styled @mui/x-data-grid @mui/icons-material fullcalendar @nivo/core @nivo/pie @nivo/bar @nivo/line
