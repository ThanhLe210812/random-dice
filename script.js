const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("user");

let availableNumbers = [1, 2, 3, 4, 5, 6];
let usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || {};
let assignedNumber = usedNumbers[userName];

window.onload = function () {
  if (!userName) {
    document.getElementById("result").textContent = "❌ Không có tên người dùng trong link!";
    document.getElementById("rollBtn").disabled = true;
    return;
  }

  if (assignedNumber) {
    document.getElementById("result").textContent = `👋 ${userName} đã quay số: ${assignedNumber}`;
    document.getElementById("rollBtn").disabled = true;
  }
};

function rollDice() {
  if (assignedNumber) return;

  // Loại bỏ số đã dùng
  const used = Object.values(usedNumbers);
  const remaining = availableNumbers.filter(n => !used.includes(n));

  if (remaining.length === 0) {
    document.getElementById("result").textContent = "🎉 Tất cả số đã được quay!";
    return;
  }

  const number = remaining[Math.floor(Math.random() * remaining.length)];
  usedNumbers[userName] = number;
  localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));

  document.getElementById("result").textContent = `🎉 ${userName} quay được số: ${number}`;
  document.getElementById("rollBtn").disabled = true;

  // Gửi kết quả về người quản lý
  sendResultToAdmin(userName, number);
}

function sendResultToAdmin(name, number) {
  const webhookURL = "https://script.google.com/macros/s/AKfycbzfh48L7NEG7nezPArcMdeMBRkJdx14eNgGs6hqjiliuigrxAYHmidw-8vWlOgEw2I6/exec"; // Google Apps Script URL
  fetch(webhookURL, {
    method: "POST",
    body: JSON.stringify({ name, number }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => console.log("Gửi thành công:", msg))
  .catch(err => console.error("Lỗi gửi:", err));
}
