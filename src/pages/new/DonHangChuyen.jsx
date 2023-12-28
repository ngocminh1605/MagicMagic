import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import "./donhangchuyen.scss";
import { useNavigate } from 'react-router-dom';

const DonHangChuyen = ({ goodID, officeID, closePopup }) => {
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState({});
  const [officeInfo, setOfficeInfo] = useState({});
  const [options, setOptions] = useState("");
  const [officeSelected, setOfficeSelected] = useState('');

  useEffect(() => {
    async function fetchOrderInfo() {
      try {
        const response = await fetch('http://localhost:3001/goods/infoOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goodID: goodID }),
        });


        if (response.ok) {
          const data = await response.json();
          const orderData = data.data;
          setOrderInfo(orderData);
        } else {
          console.error('Failed to fetch order information. Server responded with:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching order information:', error);
      }
    };


    async function fetchOption() {
      try {
        if (officeID !== null) {  // Check if officeID is not null
          const response = await fetch('http://localhost:3001/office/options', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ officeID: officeID, goodID: goodID }),
          });


          console.log(response.status);

          if (response.ok) {
            const data = await response.json();
            const officeData = data.data;
            const option = data.option;

            if (setOfficeInfo) {
              setOfficeInfo(officeData);
            }
            if (setOptions) {
              setOptions(option);
            }
          } else {
            console.error('Failed to fetch option information:', response.status, response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }


    async function fetchData() {
      await fetchOrderInfo();
      await fetchOption();
    }
    fetchData();

  }, [goodID, officeID]);



  const handleAddClick = async (e) => {
    // e.preventDefault();

    const requestData = {
      goodID: goodID,
      officeIDSend: officeID,
      officeIDWait: officeSelected
    };

    try {
      const response = await fetch('http://localhost:3001/transfer/sendAndWait', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        alert('Tạo đơn chuyển hàng thành công!');
        return;
      } else {
        console.error('Failed to create order:', response.statusText);
        alert('Tạo đơn chuyển thất bại! Vui lòng kiểm tra lại thông tin!');
        return;
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };


  const handleChangeOffice = (event) => {
    event.stopPropagation();
    setOfficeSelected(event.target.value);
  };


  return (
    <div >
      <form onSubmit={handleAddClick}>
        <div>
          <div className="forward-title">
            Tạo đơn chuyển hàng
          </div>
          <div className='popup-content'>
            <div className='popup-text'>

              {orderInfo.length > 0 && (
                <>
                  <div>Mã đơn hàng: {orderInfo[0].QR_code} </div>
                  <div>Địa chỉ người gửi: {orderInfo[0].Address_sender} </div>
                  <div>Địa chỉ người nhận: {orderInfo[0].Address_receiver} </div>
            </>
              )}

            {officeInfo.length > 0 && (
              <>
                <div> Tên office hiện tại: {officeInfo[0].Name} </div>
                <div> Địa chỉ hiện tại: {officeInfo[0].Address} </div>
              </>
            )}
          </div>

          {options.destination && (
            <div style={{ marginLeft: '5px', color: 'gray' }}>
              Chuyển đến người nhận tại: {options.destination}
            </div>
          )}


          {options.length > 0 && (
            <div className="forward-choice" style={{ width: "450px" }}>
              <label htmlFor="officeSelect">Chọn Office chuyển đến</label>
              <select
                id="officeSelect"
                value={officeSelected}
                onChange={handleChangeOffice}
              >
                {options.map((option) => (
                  <option key={option.ID_office} value={option.ID_office} >
                    {option.Name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="card-footer">
          <button type="submit" className="btn-modal btn1 ">Xác nhận</button>
          <button onClick={closePopup} className='btn1 btn-modal'>Close</button>
        </div>


    </div>

      </form >

    </div >
  );
};

export default DonHangChuyen;