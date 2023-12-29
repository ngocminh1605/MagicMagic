import React, { useEffect, useMemo, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const OfficeTable = () => {
  const navigate = useNavigate();

  // Renderer cho nút Action
  const ActionButtonsRenderer = (props) => (
    <div style={{ justifyContent: "space-between" }}>
      <Button
       // onClick={() => navigate(`/nhanvien/edit/${props.data["ID_User"]}`)}
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
        onClick={() => DeleteHandle(props.data["ID_Office"])}
      >
        Delete
      </Button>
    </div>
  );

  const [rowData, setRowData] = useState([]);

  // Hàm để lấy danh sách office từ server
  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const response = await fetch('http://localhost:3001/office/listOffice', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
        
        const formattedData = responseData.data.map(item =>({
          "ID_Office": item.ID_office,
          "Name": item.Name,
          "Address": item.Address,
          "Hotline": item.HotLine,
          "Postalcode": item.Postalcode,
          "LeaderName": item.leaderName,
        
        }));
        setRowData(formattedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  
    fetchOffice();
  }, []);

  // Hàm xử lý khi nút Delete được click
  const DeleteHandle = async (deleteUserId) => {
    const confirmed = window.confirm("Bạn có chắc là muốn xóa office này ?");
    if (confirmed) {
      try {
        const response = await fetch('http://localhost:3001/office/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({officeID: deleteUserId}),
        });

        if (!response.ok) {
          console.error('Lỗi xóa office:', response.statusText);
        }
    } catch (error) {
        console.error('Lỗi fetch data:', error);
    }
    }
  };

// Cấu hình cột
  const [colDefs] = useState([
    { field: "ID_Office", maxWidth: 175, headerAlign: 'center', align: 'center' },
    { field: "Name", headerAlign: 'center', align: 'center' },
    { field: "LeaderName", headerAlign: 'center', align: 'center' },
    { field: "Address", headerAlign: 'center', align: 'center' },
    { field: "Hotline", headerAlign: 'center', align: 'center' },
    { field: "Postalcode", headerAlign: 'center', align: 'center' },
    {
      headerName: "Action",
      minWidth: 245,
      cellRenderer: ActionButtonsRenderer,
    },
  ]);

  const defaultColDef = useMemo(() => ({
    filter: true,
  }), []);
  const gridOptions = {
    headerHeight: 45,
    rowHeight: 45,
    suppressHorizontalScroll: false,
    PaginationPanel: false,
  };
  return (
    <div
      className={"ag-theme-quartz ag-theme-acmecorp"}
      style={{width: '100%', height: '70%', flexDirection: "column", }}
    >
      <Button
        onClick={() => navigate(``)}
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