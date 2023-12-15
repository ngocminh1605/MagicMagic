import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NhanDon = ({ officeID }) => {
  const navigate = useNavigate();
  const officeIDRef = useRef(officeID);

  const fetchOrders = async (officeID) => {
    try {
      const response = await axios.get('http://localhost:3001/goods/getWait', {
        params: {
          "officeID": officeID
        },
      });

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

  useEffect(() => {
    officeIDRef.current = officeID;
    fetchOrders(officeID);
  }, [officeID]);

  const handleConfirmButtonClick = useCallback(
    async (goodID) => {
      const currentOfficeID = officeIDRef.current;

      if (currentOfficeID != null) {
        const requestData = {
          goodID: goodID,
          officeID: currentOfficeID,
        };

        try {
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

          // Handle the response from the server for confirming the order
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
    },
    []
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

  const [colDefs, setColDefs] = useState([
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
  }));

  const gridOptions = {
    headerHeight: 45,
    rowHeight: 45,
    suppressHorizontalScroll: false,
    pagination: true,
  };

  return (
    <div className={"ag-theme-quartz ag-theme-acmecorp"} style={{ width: '100%', height: '70%', flexDirection: "column" }}>
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