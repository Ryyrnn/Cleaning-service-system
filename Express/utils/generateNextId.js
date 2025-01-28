// ฟังก์ชันสำหรับสร้าง ID ถัดไป
function generateNextID(maxID) {
    let number = parseInt(maxID.substring(1)); // เอาตัวเลขหลังสุดแล้วแปลงเป็นตัวเลข
    number++;
    let paddedNumber = String(number).padStart(maxID.length - 1, '0');
    return maxID[0] + paddedNumber;
}

module.exports  = generateNextID