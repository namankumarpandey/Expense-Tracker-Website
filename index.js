const expenseForm = document.getElementById("expense-form-id");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

window.onload = function () {
  renderTable();
};

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("expense-name").value;
  const amount = document.getElementById("expense-amount").value;
  const date = document.getElementById("expense-date").value;

  if (!name || !amount || !date) {
    alert("all input fields are required");
    return;
  }

  let newObj = {
    name: name,
    amount: amount,
    date: date,
  };
  expenses.push(newObj);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  console.log("Array of objects", expenses);
  expenseForm.reset();

  renderTable();
});

function renderTable() {
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach((item, index) => {
    console.log("Item is: ", item, index);
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.amount}</td>
    <td>${item.date}</td>
    <td><button onclick="deleteRow(${index})">Delete</button></td>`;
    tableBody.appendChild(row);
  });
}

function deleteRow(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderTable();
}
