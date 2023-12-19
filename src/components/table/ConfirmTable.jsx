import React, { useMemo, useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmTable = ({ officeID, userID, title }) => {
  const navigate = useNavigate();

  const ActionButtonsRenderer = (props) => (

    
    <div>
      <Button
        onClick={() => navigate(`transfer/${props.data["ID"]}`)} ///GoodID
        style={{
          textTransform: 'none',
          backgroundColor: 'green',
          color: 'white',
          width: 70,
          borderRadius: 20,
          height: 35,
        }}
      >
        Confirm
      </Button>
    </div>
  );
  

  const [rowData, setRowData] = useState([
    
  ]);



  useEffect(() => {
    const fetchOrders = async (officeID) => {
      if (officeID != null) {
        try {
          const response = await fetch('http://localhost:3001/transfer/getTransfer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ officeID: officeID}),
        });

        const responseData = await response.json();
          
          const formattedData = responseData.data
          .filter(item => Array.isArray(item) && item !== null)
          .flatMap(item => item.map(innerItem => ({
            "ID": innerItem.ID_good,
            "Mã đơn hàng": innerItem.QR_code,
            "Loại hàng": innerItem.Type,
            "Ngày gửi": new Date(innerItem.Senddate).toLocaleString(),
            "Tên người gửi": innerItem.Name_sender,
            "Địa chỉ người gửi": innerItem.Address_sender,
            "Số điện thoại người gửi": innerItem.Phone_sender,
            "Tên người nhận": innerItem.Name_receiver,
            "Địa chỉ người nhận": innerItem.Address_receiver,
            "Số điện thoại người nhận": innerItem.Phone_receiver,
          })));
          setRowData(formattedData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
      
    };

    fetchOrders(officeID);
  }, [officeID]);

  const [colDefs] = useState([
    { field: "Mã đơn hàng" },
    { field: "Loại hàng" },
    { field: "Ngày gửi" },
    { field: "Tên người gửi" },
    { field: "Địa chỉ người gửi" },
    { field: "Số điện thoại người gửi" },
    { field: "Tên người nhận" },
    { field: "Địa chỉ người nhận" },
    { field: "Số điện thoại người nhận" },
    {
      headerName: "Action",
      minWidth: 100,
      maxWidth: 120,
      cellRenderer: ActionButtonsRenderer, 
    },
  ]);
  
  const defaultColDef = useMemo(() => ({
    filter: true,
  }), []);
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
      style={{ width: '100%', height: '70%',flexDirection:"column" }}
    >
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
export default ConfirmTable;
