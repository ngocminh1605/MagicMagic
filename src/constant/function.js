function calculateShippingFee(weight, shipmentType) {
    if (!weight || isNaN(weight)) {
        return 0;
    }
    
    let baseFee = 0;

    if (shipmentType === 'Hàng hóa') {
        if (weight < 50) {
            baseFee = 11000;
        } else if (weight <= 100) {
            baseFee = 16000;
        } else if (weight <= 250) {
            baseFee = 22000;
        } else if (weight <= 500) {
            baseFee = 31000;
        } else if (weight <= 1000) {
            baseFee = 43000;
        } else if (weight <= 1500) {
            baseFee = 52000;
        } else if (weight <= 2000) {
            baseFee = 64000;
        } else {
            const additionalWeight = Math.ceil((weight - 2000) / 0.5);
            baseFee = 64000 + additionalWeight * 5;
        }
    } else if (shipmentType === 'Tài liệu') {
        if (weight < 50) {
            baseFee = 10000;
        } else if (weight <= 100) {
            baseFee = 15000;
        } else if (weight <= 250) {
            baseFee = 20000;
        } else if (weight <= 500) {
            baseFee = 28000;
        } else if (weight <= 1000) {
            baseFee = 38000;
        } else if (weight <= 1500) {
            baseFee = 45000;
        } else if (weight <= 2000) {
            baseFee = 55000;
        } else {
            const additionalWeight = Math.ceil((weight - 2000) / 0.5);
            baseFee = 64000 + additionalWeight * 3.5;
        }
    }

    return baseFee;
}

function calculateVatFee(mainFee, extraFee, gtvtFee) {
    const vatFeeValue = (parseFloat(mainFee) + parseFloat(extraFee) + parseFloat(gtvtFee)) * 0.08;
    return isNaN(vatFeeValue) ? '' : vatFeeValue.toFixed(0);
}

module.exports = {calculateShippingFee, calculateVatFee}