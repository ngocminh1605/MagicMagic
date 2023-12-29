import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './NhanvienTable.scss';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { Button } from '@mui/material';


const ReturnTable = ({ officeID }) => {
  const officeIDRef = useRef(officeID);
  const [rowData, setRowData] = useState([]);

  const checkReturn = async (goodID) => {
    try {
      const response = await fetch('http://localhost:3001/transfer/checkTransfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ officeID: officeIDRef.current, goodID: goodID }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.error('Lỗi kiểm tra trả về:', response.statusText);
        return false; // Trả về false nếu có lỗi
      }
    } catch (error) {
      console.error('Lỗi kiểm tra trả về:', error);
      return false;
    }
  };

  const fetchOrders = async (officeID) => {
    if (officeID != null) {
      try {
        const response = await fetch('http://localhost:3001/transfer/getWaitConfirm', {
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

  useEffect(() => {
    officeIDRef.current = officeID;
    fetchOrders(officeID);
  }, [officeID]);

  
  const handleConfirmButtonClick = useCallback(
    async (goodID) => {
        const currentOfficeID = officeIDRef.current;
        if (currentOfficeID != null) {
          try {
            const confirmResponse = await fetch('http://localhost:3001/transfer/receiveSuccess',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({goodID: goodID}),
              }
            );
  
            if (!confirmResponse.ok) {
              console.error('Lỗi xác nhận đơn hàng:',confirmResponse.statusText);
              alert('Vui lòng kiểm tra lại!');
            } else {
              alert('Đã xác nhận đơn hàng tới tay người nhận thành công!');
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

  const handleReturnButtonClick = useCallback(
    async (goodID) => {
        const currentOfficeID = officeIDRef.current;
        if (currentOfficeID != null) {
            const data = {
                goodID: goodID,
                officeID: currentOfficeID
            }
          try {
            const confirmResponse = await fetch('http://localhost:3001/transfer/receiveFail',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              }
            );
  
            if (!confirmResponse.ok) {
              console.error('Lỗi xác nhận đơn hàng:',confirmResponse.statusText);
              alert('Vui lòng kiểm tra lại!');
            } else {
              alert('Người nhận không nhận! Đơn hàng đã trả lại điểm giao dịch!');
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

  const ActionButtonsRenderer = (props) => {
    const goodID = `${props.data["ID"]}`;
    const [canReturn, setCanReturn] = useState();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await checkReturn(goodID);
          setCanReturn(result);
        } catch (error) {
          console.error('Error checking return:', error);
        } 
      };

      fetchData();
    }, [goodID]);

   return (
      <div style={{ justifyContent: 'space-between' }}>
        {canReturn ? (
          <Button
            onClick={() => handleConfirmButtonClick(goodID)}
            style={{
              textTransform: 'none',
              backgroundColor: 'green',
              color: 'white',
              width: 75,
              borderRadius: 20,
              height: 35,
            }}
          >
            Đã trả lại
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleConfirmButtonClick(goodID)}
              style={{
                textTransform: 'none',
                backgroundColor: 'green',
                color: 'white',
                width: 70,
                borderRadius: 20,
                height: 35,
                marginRight: '8px',
              }}
            >
              Đã nhận
            </Button>
            <Button
              onClick={() => handleReturnButtonClick(goodID)}
              style={{
                textTransform: 'none',
                backgroundColor: 'green',
                color: 'white',
                width: 70,
                borderRadius: 20,
                height: 35,
              }}
            >
              Trả về
            </Button>
          </>
        )}
      </div>
    );
  };
  

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
      minWidth: 170,
      maxWidth: 220,
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

export default ReturnTable;