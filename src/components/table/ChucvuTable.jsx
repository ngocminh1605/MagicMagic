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


const ChucVuTable = () => {
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
    { ID: '1', "Chức Vụ": "Lãnh đạo","Phòng ban làm việc":"Trụ sở chính" },
    { ID: '2', "Chức Vụ": "Trưởng điểm giao dịch", "Phòng ban làm việc":"Điểm giao dịch" },
    { ID: '3', "Chức Vụ": "Trưởng điểm tập kết","Phòng ban làm việc":"Điểm tập kết" },
    { ID: '4', "Chức Vụ": "Nhân viên giao dịch","Phòng ban làm việc":"Điểm giao dịch" },
    { ID: '5', "Chức Vụ": "Nhân viên tập kết","Phòng ban làm việc":"Điểm tập kết" },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    {
      field: "ID", headerAlign: 'center',maxWidth: 175,
      align: 'center'
    },
    {
      field: "Chức Vụ", headerAlign: 'center',
      align: 'center'
    },
    {
      field: "Phòng ban làm việc", headerAlign: 'center',
      align: 'center'
    },
    {
      field: "Mô tả về chức vụ", headerAlign: 'center',
      align: 'center'
    },
    {
      field: "Ghi chú", headerAlign: 'center',
      align: 'center'
    },
    {
      headerName: "Action", 
      headerAlign: 'center',
      align: 'center',
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
      style={{ width: '98.5%', height: '70%',flexDirection:"column",marginTop:"20px",marginLeft:"15px",borderRadius:"20px" }}
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
export default ChucVuTable;
