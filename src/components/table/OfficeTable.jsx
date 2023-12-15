import React, { useMemo, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { createRoot } from 'react-dom/client';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const OfficeTable = () => {
  const navigate = useNavigate();
  const handleEditClick = (params) => {
    console.log('Edit clicked for row:', params.data);
  };

  const handleDeleteClick = (params) => {
    console.log('Delete clicked for row:', params.data);
  };

  const ActionButtonsRenderer = (props) => (
    <div style={{ justifyContent: "space-between" }}>
      {/* Check if the icons are visible */}
      {/* {EditIcon && <IconButton onClick={() => handleEditClick(props)}><EditIcon /></IconButton>}
      {DeleteIcon && <IconButton onClick={() => handleDeleteClick(props)}><DeleteIcon /></IconButton>} */}
      <Button
        style={{
          textTransform: 'none',
          backgroundColor: 'green',
          color: 'white',
          width: 60,
          marginRight: 15,
          borderRadius: 20,
          height: 35,
        }}
      >
        View
      </Button>
      <Button
        style={{
          textTransform: 'none',
          backgroundColor: 'orange',
          color: 'white',
          width: 60,
          marginRight: 15,
          borderRadius: 20,
          height: 35,
        }}
      >
        Edit
      </Button>
      <Button
        style={{
          textTransform: 'none',
          backgroundColor: "crimson",
          color: 'white',
          width: 60,
          marginRight: 15,
          borderRadius: 20,
          height: 35,
        }}
      >
        Delete
      </Button>
    </div>
  );
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
    { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },


  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "fullName" },
    { field: "gender" },
    { field: "birth" },
    { field: "phone" },
    { field: "email" },
    { field: "iden" },
    { field: "start" },
    { field: "officeid" },
    { field: "position" },
    {
      headerName: "Action",
      minWidth: 250,
      cellRenderer: ActionButtonsRenderer, // Sử dụng trực tiếp hàm renderer
    },
  ]);

  const defaultColDef = useMemo(() => ({
    filter: true,
  }));
  const gridOptions = {
    // domLayout: 'autoHeight',
    headerHeight: 45,
    rowHeight: 45,
    suppressHorizontalScroll: false,
    pagination: true,
  };
  return (
    // Container with theme & dimensions
      <div
        className={
          "ag-theme-quartz ag-theme-acmecorp"
        }
        style={{ width: '100%', height: '70%', flexDirection: "column" }}
      >
        <Button
          // onClick={() => navigate('/nhanvien/add')}
          style={{
            textTransform: 'none',
            backgroundColor: "#FF9AA2",
            color: 'white',
            width: 70,
            marginRight: 15,
            borderRadius: 10,
            height: 40,
            marginLeft: 'auto',
            display: "flex",
            marginBottom: 15
          }}
        >
          Add
        </Button>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          gridOptions={gridOptions}
        />
      </div>
  );
}
export default OfficeTable;