let availableNumbers = [1, 2, 3, 4, 5, 6];

window.onload = function () {
  const storedName = localStorage.getItem("playerName");
  const usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];

  // Cập nhật danh sách số còn lại
  availableNumbers = availableNumbers.filter(n => !usedNumbers.includes(n));

  if (storedName) {
    document.getElementById("username").value = storedName;
    document.getElementById("username").disabled = true;
    document.getElementById("rollBtn").disabled = true;
    document.getElementById("result").textContent = `👋 Chào ${storedName}, bạn đã quay rồi!`;
  }
};

function rollDice() {
  const nameInput = document.getElementById("username");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Vui lòng nhập tên trước khi quay!");
    return;
  }

  const storedName = localStorage.getItem("playerName");
  if (storedName === name) {
    alert("Tên này đã quay rồi. Vui lòng nhập tên mới!");
    return;
  }

  if (availableNumbers.length === 0) {
    document.getElementById("result").textContent = "🎉 Tất cả số đã được quay!";
    return;
  }

  // Random số từ danh sách còn lại
  const index = Math.floor(Math.random() * availableNumbers.length);
  const number = availableNumbers[index];

  // Hiển thị kết quả
  document.getElementById("result").textContent = `🎉 ${name} quay được số: ${number}`;

  // Lưu tên và số đã dùng
  localStorage.setItem("playerName", name);
  const usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];
  usedNumbers.push(number);
  localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));

  // Khóa lại
  nameInput.disabled = true;
  document.getElementById("rollBtn").disabled = true;
}

function resetGame() {
  document.getElementById("username").value = "";
  document.getElementById("username").disabled = false;
  document.getElementById("rollBtn").disabled = false;
  document.getElementById("result").textContent = "Bạn có thể nhập tên mới để quay!";
}
