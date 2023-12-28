import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './shipping.scss';

const ShippingTracker = ({ currentStep, isReturn }) => {
  const [steps, setSteps] = useState(null);

  useEffect(() => {
    if (!isReturn) {
      setSteps(['Đã nhận hàng', 'Đang xử lý', 'Đang vận chuyển', 'Đã đến GD nhận', 'Đang giao hàng', 'Thành công']);
    } else {
      setSteps(['Không thành công', 'Trả lại', 'Đang vận chuyển', 'Đã đến GD gửi', 'Đang trả hàng', 'Trả lại thành công']);
    }
  }, [currentStep]);

  return (
    <div className="shipping-tracker">
      {steps &&
        steps.map((step, index) => (
          <div key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
            <div className="step-number">
              <div className="number">
                {index < currentStep + 1 ? <TiTick color='#fff' size={20} /> : index + 1}
              </div>
            </div>
            <div className="step-label">{step}</div>
          </div>
        ))}
    </div>
  );
};

export default ShippingTracker;
