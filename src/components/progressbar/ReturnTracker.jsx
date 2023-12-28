import React from 'react';
import { TiTick } from 'react-icons/ti'; // Import TiTick
import './shipping.scss';


const ReturnTracker = ({ currentStep }) => {
  const steps = ['Trả lại thành công', 'Đang giao hàng trả', 'Đã đến GD gửi', 'Đang vận chuyển', 'Trả lại', 'Người nhận không nhận'];

  return (
    <div className="shipping-tracker">
      {steps.slice().reverse().map((step, index) => (
        <div key={index} className={`step ${index === currentStep ? 'active' : ''}`}>
          <div className="step-number">
            <div className="number">
              {index < currentStep ? <TiTick color='#fff' size={20} /> : index + 1}
            </div>
          </div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default ReturnTracker;

