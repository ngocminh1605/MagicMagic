import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { Button } from '@mui/material';
import axios from 'axios';

const NhanDon = ({ officeID }) => {
  // Sử dụng useRef để lưu trữ giá trị officeID không bị thay đổi khi component render lại
  const officeIDRef = useRef(officeID);

  // Hàm fetchOrders để lấy danh sách đơn hàng từ server
  const fetchOrders = async (officeID) => {
    try {
      const response = await axios.get('http://localhost:3001/goods/getWait', {
        params: {
          "officeID": officeID
        },
      });

      // Định dạng dữ liệu trả về từ server
      const formattedData = response.data.data.map(item => ({
        "ID": item.ID_good,
        "Mã đơn hàng": item.QR_code,
        "Loại hàng": item.Type,
        "Ngày gửi": new Date(item.Senddate).toLocaleString(),
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

  // useEffect để gọi hàm fetchOrders khi component được render hoặc khi officeID thay đổi
  useEffect(() => {
    officeIDRef.current = officeID;
    fetchOrders(officeID);
  }, [officeID]);

  // Hàm xử lý khi nút Confirm được click
  const handleConfirmButtonClick = useCallback(
    async (goodID) => {
      // Lấy giá trị officeID từ useRef
      const currentOfficeID = officeIDRef.current;

      if (currentOfficeID != null) {
        const requestData = {
          goodID: goodID,
          officeID: currentOfficeID,
        };

        try {
          // Gửi request xác nhận đơn hàng đến server
          const confirmResponse = await fetch(
            'http://localhost:3001/transfer/updateReceive',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData),
            }
          );

           // Xử lý response từ server khi xác nhận đơn hàng
          if (!confirmResponse.ok) {
            console.error(
              'Lỗi xác nhận đơn hàng:',
              confirmResponse.statusText
            );
            alert('Nhận đơn hàng thất bại! Vui lòng kiểm tra lại thông tin!');
          } else {
            alert('Nhận đơn hàng thành công!');
            // Fetch lại dữ liệu sau khi xác nhận thành công
            fetchOrders(currentOfficeID);
          }
        } catch (confirmError) {
          console.error('Error confirming order:', confirmError);
        }
      } else {
        alert('Lỗiiiii');
      }
    },[]
  );

  const [rowData, setRowData] = useState([]);

  const ActionButtonsRenderer = (props) => (
    <div>
      <Button
        onClick={() => handleConfirmButtonClick(`${props.data["ID"]}`)} ///GoodID
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

  // Cấu hình cột
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
    headerHeight: 45,
    rowHeight: 45,
    suppressHorizontalScroll: false,
    pagination: true,
  };

  return (
    <div className={"ag-theme-quartz ag-theme-acmecorp"} style={{ width: '98.5%', height: '70%',flexDirection:"column",marginTop:"20px",marginLeft:"15px",borderRadius:"20px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default NhanDon;