import React, { useMemo, useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

const TableTK = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchTK = async () => {
        try {
          const response = await fetch('http://localhost:3001/thongke/TK', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();

        const formattedData = responseData.data.map(item => ({
          "STT": item.STT,
          "Ten": item.Name,
          "Gui": item.sentTotal,
          "Nhan": item.receivedTotal,
          "Tong": item.total,
        }));
        setRowData(formattedData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
    };

    fetchTK();
  }, []);

const [colDefs] = useState([
  { headerName: "STT", field: "STT", width: 75},
  { headerName: "Tên điểm", field: "Ten", width: 150},
  { headerName: "Số hàng đã gửi", field: "Gui", width: 110},
  { headerName: "Số hàng đã nhận", field: "Nhan", width: 110},
  { headerName: "Tổng cộng", field: "Tong",width: 151 },
]);
  
  const defaultColDef = useMemo(() => {
    return {
      resizable: false, 
      filter: true,
      cellDataType: false,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  const gridOptions = {
    //domLayout: 'autoHeight',
    autoHeight: true,
    headerHeight: 60,
    rowHeight: 45,
    suppressHorizontalScroll: false,
    pagination: true,
    autoSizeColumns: true,
  };
  return (
    <div className={"ag-theme-quartz ag-theme-acmecorp"} style={{ width: '40vw', height: '60vh', flexDirection: "column" }}>
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

export default TableTK;