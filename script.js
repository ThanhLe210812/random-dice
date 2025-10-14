function rollDice() {
  const number = Math.floor(Math.random() * 6) + 1;
  document.getElementById("result").textContent = `🎉 Bạn quay được số: ${number}`;
  
  // Khóa nút sau khi quay
  document.querySelector("button").disabled = true;
}