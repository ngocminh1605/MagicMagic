import React, { useMemo, useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrdersTable = ({ officeID, userID, title }) => {
  const navigate = useNavigate();
  const ActionButtonsRenderer = (props) => (
    <div>
      <Button
        onClick={() => navigate(`/orders/view/${props.data["ID"]}`)}
        style={{
          textTransform: 'none',
          backgroundColor: 'green',
          color: 'white',
          width: 60,
          borderRadius: 20,
          height: 35,
        }}
      >
        View
      </Button>
    </div>
  );
  
  const [rowData, setRowData] = useState([]);

  // Hàm để lấy danh sách đơn hàng từ server
  useEffect(() => {
    const fetchOrders = async (officeID) => {
      try {
        const response = await axios.get('http://localhost:3001/goods/getAll', {
          params: {
            "officeID": officeID
          },
        });
  
        const formattedData = response.data.data.map(item => ({
          "ID": item.ID_good,
          "Mã đơn hàng": item.QR_code,
          "Loại hàng": item.Type,
          "Ngày gửi": new Date(item.Senddate).toLocaleString(),
          "Giá": item.Price,
          "Cân nặng": item.Weight,
          "Mã Bưu chính": item.PostalcodeSend,
          "Tên người gửi": item.Name_sender,
          "Địa chỉ người gửi": item.Address_sender,
          "Số điện thoại người gửi": item.Phone_sender,
          "Tên người nhận": item.Name_receiver,
          "Địa chỉ người nhận": item.Address_receiver,
          "Số điện thoại người nhận": item.Phone_receiver,
        }));
  
        setRowData(formattedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(officeID);
  }, [officeID]);

  // Cấu hình cột
  const colDefsBase = [
    { field: "Mã đơn hàng" },
    { field: "Loại hàng" },
    { field: "Ngày gửi" },
    { field: "Giá" },
    { field: "Cân nặng" },
    { field: "Mã Bưu chính" },
    { field: "Tên người gửi" },
    { field: "Địa chỉ người gửi" },
    { field: "Số điện thoại người gửi" },
    { field: "Tên người nhận" },
    { field: "Địa chỉ người nhận" },
    { field: "Số điện thoại người nhận" },
  ];

  // Định nghĩa cột Action
  const actionColDef = {
    headerName: "Action",
    minWidth: 100,
    maxWidth: 120,
    cellRenderer: ActionButtonsRenderer,
  };
// Nếu là Nhân viên giao dịch, thêm cột Action
  const colDefs = title === "Nhân viên giao dịch" ? [...colDefsBase, actionColDef] : colDefsBase;

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
      style={{ width: '98.5%', height: '70%',flexDirection:"column",marginTop:"20px",marginLeft:"15px",borderRadius:"20px" }}
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
export default OrdersTable;
