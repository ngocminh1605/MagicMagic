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
        onClick={() => navigate(`/nhanvien/view/${props.data["ID_User"]}`)}
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
        onClick={() => navigate(`/nhanvien/edit/${props.data["ID_User"]}`)}
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
        onClick={() => DeleteHandle(props.data["ID_User"])}
      >
        Delete
      </Button>
    </div>
  );
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
  ]);
  const fetchUser = async (officeID, userID, title) => {
    console.log('useEffect is called');
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
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        console.log("Dữ liệu người dùng:", userData);
        const formattedData = userData.map(item => {
          return {
            "ID_User": item.ID_user,
            "UserName": item.UserName,
            "Title": item.title,
            "Office": item.UserName.substring(3),
            "DateStart": new Date(item.datestart).toLocaleDateString(undefined, options),
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

  useEffect(() => {
    console.log('useEffect is called');
    fetchUser(officeID, userID, title);
  }, [officeID, userID, title]);

  const DeleteHandle = async (userID) => {
    const confirmed = window.confirm("Bạn có chắc là muốn xóa người này ?");
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:3001/users/delete/${userID}`);
        fetchUser(officeID, userID, title)
        if (response.status === 200) {
          console.log('Xóa nhân viên thành công');
        } else {
          console.error('Delete failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const [colDefs, setColDefs] = useState([
    { field: "ID_User" },
    { field: "UserName" },
    { field: "Title" },
    { field: "Office" },
    { field: "DateStart" },
    {
      headerName: "Action",
      minWidth: 245,
      cellRenderer: ActionButtonsRenderer,
    },
  ]);

  const defaultColDef = useMemo(() => ({
    filter: true,
  }));
  const gridOptions = {
    headerHeight: 45,
    rowHeight: 45,
    suppressHorizontalScroll: false,
    PaginationPanel: false,
  };
  return (
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
