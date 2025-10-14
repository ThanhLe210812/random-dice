window.onload = function () {
  const storedName = localStorage.getItem("playerName");
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

  const number = Math.floor(Math.random() * 6) + 1;
  document.getElementById("result").textContent = `🎉 ${name} quay được số: ${number}`;

  // Lưu tên vào localStorage và khóa lại
  localStorage.setItem("playerName", name);
  nameInput.disabled = true;
  document.getElementById("rollBtn").disabled = true;
}
