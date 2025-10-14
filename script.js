// Lấy thông tin từ URL
const urlParams = new URLSearchParams(window.location.search);
const group = urlParams.get("group"); // "nam" hoặc "nu"
const userName = urlParams.get("user"); // tên người chơi

// Danh sách số ban đầu
const allNumbers = [1, 2, 3, 4, 5, 6];

// Lấy danh sách người đã quay từ localStorage
let usedUsers = JSON.parse(localStorage.getItem("usedUsers")) || {};
let assignedNumber = usedUsers[userName];

// Khởi động khi trang tải
window.onload = function () {
  if (!userName || !group) {
    document.getElementById("result").textContent = "❌ Thiếu thông tin người chơi hoặc nhóm trong URL!";
    document.getElementById("rollBtn").disabled = true;
    return;
  }

  if (assignedNumber) {
    document.getElementById("result").textContent = `👋 ${userName} (${group}) đã quay số: ${assignedNumber}`;
    document.getElementById("rollBtn").disabled = true;
  }
};

// Hàm quay số
function rollDice() {
  if (assignedNumber) return;

  // Loại bỏ số đã được quay
  const usedNumbers = Object.values(usedUsers);
  const availableNumbers = allNumbers.filter(n => !usedNumbers.includes(n));

  if (availableNumbers.length === 0) {
    document.getElementById("result").textContent = "🎉 Tất cả số đã được quay!";
    return;
  }

  // Random số từ danh sách còn lại
  const number = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];

  // Lưu kết quả vào localStorage
  usedUsers[userName] = number;
  localStorage.setItem("usedUsers", JSON.stringify(usedUsers));

  // Hiển thị kết quả
  document.getElementById("result").textContent = `🎉 ${userName} (${group}) quay được số: ${number}`;
  document.getElementById("rollBtn").disabled = true;

  // Gửi kết quả về Google Sheets
  sendResultToAdmin(userName, group, number);
}

// Gửi kết quả về Web App Google Apps Script
function sendResultToAdmin(name, group, number) {
  const webhookURL = "https://script.google.com/macros/s/AKfycbzfh48L7NEG7nezPArcMdeMBRkJdx14eNgGs6hqjiliuigrxAYHmidw-8vWlOgEw2I6/exec"; // Thay bằng URL thật của bạn

  fetch(webhookURL, {
    method: "POST",
    body: JSON.stringify({ name, group, number }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => console.log("Gửi thành công:", msg))
  .catch(err => console.error("Lỗi gửi:", err));
}

function doGet(e) {
  return ContentService.createTextOutput("Web App is running")
    .setMimeType(ContentService.MimeType.TEXT);
}
