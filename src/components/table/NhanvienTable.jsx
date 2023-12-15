import React, { useMemo, useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { createRoot } from 'react-dom/client';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { axiosInstance } from '../../constant/axios';

const NhanVienTable = ({ officeID, userID, title }) => {
  const navigate = useNavigate();
  const ActionButtonsRenderer = (props) => (
    <div style={{ justifyContent: "space-between" }}>
      <Button
        onClick={() => navigate('/nhanvien/detail')}
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
          //onclick = {DeleteHandle(${prop.data["ID"]})}
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
  ]);
  useEffect(() => {
    const fetchUser = async (officeID, userID, title) => {
      try {
        
        const response = await axios.get('http://localhost:3001/users/info_users', {
          params: {
            officeID: officeID,
            userID: userID,
            title: title
          }
        });
        if (response.status === 200) {
          const userData = response.data.users;
          console.log("Dữ liệu người dùng:", userData);
          // Format và set dữ liệu cho rowData
          const formattedData = userData.map(item => {
            return {
              "ID_User": item.ID_user,
              "UserName": item.UserName,
            };
          });
          setRowData(formattedData);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUser(officeID, userID, title);
  }, [officeID, userID, title]);


  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "ID_User" },
    { field: "UserName" },
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
        onClick={() => navigate('/nhanvien/add')}
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
export default NhanVienTable;
