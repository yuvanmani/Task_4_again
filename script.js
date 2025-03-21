
let incomeAmount = [];
let expenseAmount = [];
let allDetail = [];

updateIncomeUI(incomeAmount);

function updateIncomeUI(incomeAmount) {
    let addIncome = parseFloat(0);
    const incomeLog = document.getElementById("incomeUl");
    incomeLog.innerHTML = "";

    incomeAmount.forEach((income, index) => {
        const incomeLi = document.createElement("li");
        incomeLi.className = "ml-6 w-3/4 md:ml-11 mb-3 flex justify-between items-center text-lg text-gray-800 md:w-1/2 bg-green-100";
        const key = Object.keys(income)[0];
        const value = income[key];

        addIncome = addIncome + value;
        const totalIncome = document.getElementById("total-income");
        totalIncome.innerHTML = `₹ ${addIncome}`;

        incomeLi.innerHTML = `${key} : ₹ ${value} <button class="text-blue-500" onclick="editIncome(${index})">Edit</button> <button class="text-red-500" onclick="removeIncome(${index})">Delete</button>`;
        incomeLog.appendChild(incomeLi);

    })

    if (incomeAmount.length === 0) {
        updateIncomeBalance();
    }

}

function updateExpenseUI(expenseAmount) {
    let addExpense = parseFloat(0);
    const expenseLog = document.getElementById("expenseUl");
    expenseLog.innerHTML = "";

    expenseAmount.forEach((expense, index) => {
        const expenseLi = document.createElement("li");
        expenseLi.className = "ml-6 w-3/4 md:ml-11 mb-3 flex justify-between items-center text-lg text-gray-800 md:w-1/2 bg-red-100";
        const key = Object.keys(expense)[0];
        const value = expense[key];

        addExpense = addExpense + value;
        const totalExpense = document.getElementById("total-expense");
        totalExpense.innerHTML = `₹ ${addExpense}`;


        expenseLi.innerHTML = `${key} : ₹ ${value} <button class="text-blue-500" onclick="editExpense(${index})">Edit</button> <button class="text-red-500" onclick="removeExpense(${index})">Delete</button>`;
        expenseLog.appendChild(expenseLi);



    })
    if (expenseAmount.length === 0) {
        updateExpenseBalance();
    }
}


function updateAllUI(allDetail) {
    let allBalance = parseFloat(0);
    const allLog = document.getElementById("allUl");
    allLog.innerHTML = "";

    allDetail.forEach((all, index) => {
        const allLi = document.createElement("li");
        allLi.className = "ml-6 w-3/4 md:ml-11 mb-3 flex justify-between items-center text-lg text-gray-800 md:w-1/2 bg-blue-100";
        const key = Object.keys(all)[0];
        const value = all[key];

        allBalance = allBalance + value;
        const netBalance = document.getElementById("net-balance");
        netBalance.innerHTML = `₹ ${allBalance}`;

        allLi.innerHTML = `${key} : ₹ ${value}`;
        allLog.appendChild(allLi);
    })
    if (allDetail.length === 0) {
        updateNetBalance();
    }

}


document
    .getElementById("form")
    .addEventListener("submit", submit);



function submit(event) {
    event.preventDefault();
    const detail = document.getElementById("detail").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (amount > 0) {
        incomeAmount.push({ [detail]: amount })
        // console.log(incomeAmount)
        // localStorage.setItem("incomeAmount",JSON.stringify(incomeAmount));
        updateIncomeUI(incomeAmount);

    } else if (amount < 0) {
        expenseAmount.push({ [detail]: amount });
        // console.log(expenseAmount)
        // localStorage.setItem("expenseAmount",JSON.stringify(expenseAmount));
        updateExpenseUI(expenseAmount);
    }
    let allDetail = [...incomeAmount, ...expenseAmount];
    // localStorage.setItem("allDetail",JSON.stringify(allDetail));
    updateAllUI(allDetail);
    resetDescription();
    resetAmount();

}

function removeIncome(index) {

    incomeAmount.splice(index, 1);
    // localStorage.setItem("incomeAmount",JSON.stringify(incomeAmount));
    updateIncomeUI(incomeAmount);
    let allDetail = [...incomeAmount, ...expenseAmount];
    // localStorage.setItem("allDetail",JSON.stringify(allDetail));
    updateAllUI(allDetail);
}
function removeExpense(index) {

    expenseAmount.splice(index, 1);
    // localStorage.setItem("expenseAmount",JSON.stringify(expenseAmount));
    updateExpenseUI(expenseAmount);
    let allDetail = [...incomeAmount, ...expenseAmount];
    // localStorage.setItem("allDetail",JSON.stringify(allDetail));
    updateAllUI(allDetail);
}


function updateIncomeBalance() {
    const totalIncome = document.getElementById("total-income");
    totalIncome.innerHTML = `₹ 0`;
}

function updateExpenseBalance() {
    const totalExpense = document.getElementById("total-expense");
    totalExpense.innerHTML = `₹ 0`;
}

function updateNetBalance() {
    const netBalance = document.getElementById("net-balance");
    netBalance.innerHTML = `₹ 0`;
}

function reset() {

    incomeAmount = [];
    expenseAmount = [];
    allDetail = [];

    updateIncomeUI(incomeAmount);
    updateExpenseUI(expenseAmount);
    updateAllUI(allDetail);
    resetDropdown();
    resetTransaction();
};


const selectedOption = document.getElementById("selectOption");
selectedOption.addEventListener("change", selectOption)

function selectOption() {
    const selectedValue = this.value;

    const allList = document.getElementById("allUl");
    allList.classList.add("hidden");

    const incomeList = document.getElementById("incomeUl");
    incomeList.classList.add("hidden");

    const expenseList = document.getElementById("expenseUl");
    expenseList.classList.add("hidden");

    if (selectedValue === "all") {
        allList.classList.remove("hidden");
    } else if (selectedValue === "income") {
        incomeList.classList.remove("hidden");
    } else if (selectedValue === "expense") {
        expenseList.classList.remove("hidden");
    }

}

function resetDescription() {
    const detailId = document.getElementById("detail");
    detailId.value = "";
}

function resetAmount() {
    const amountId = document.getElementById("amount");
    amountId.value = "";
}
function resetDropdown() {
    const selectIndex = document.getElementById("selectOption");
    selectIndex.selectedIndex = 0;
    resetOption();
}

function resetOption() {
    const allList = document.getElementById("allUl");
    allList.classList.add("hidden");

    const incomeList = document.getElementById("incomeUl");
    incomeList.classList.add("hidden");

    const expenseList = document.getElementById("expenseUl");
    expenseList.classList.add("hidden");
}


function editIncome(index) {

    incomeAmount.splice(index, 1);
    
    updateIncomeUI(incomeAmount);

    let allDetail = [...incomeAmount, ...expenseAmount];
    updateAllUI(allDetail);

    let newDetail = prompt("Enter Description");
    let newAmount = prompt("Enter Amount");

    incomeAmount.push({ [newDetail]: newAmount })

    updateIncomeUI(incomeAmount);
    
}
function editExpense(index) {

    expenseAmount.splice(index, 1);

    updateExpenseUI(expenseAmount);

    let allDetail = [...incomeAmount, ...expenseAmount];
    updateAllUI(allDetail);

    let newDetail = prompt("Enter Description");
    let newAmount = prompt("Enter Amount");


    expenseAmount.push({ [newDetail]: newAmount });

    updateExpenseUI(expenseAmount);
}


const selectedTransaction = document.getElementById("selectTransaction");
selectedTransaction.addEventListener("change",selectTransaction)

function selectTransaction(){
    const selectedValue = this.value;

    const inputField = document.getElementById("inputField");
    inputField.classList.add("hidden");

    if(selectedValue === "income"){
        inputField.classList.remove("hidden");
        inputField.classList.remove("md:hidden");
        inputField.classList.remove("lg:hidden");
    }else if(selectedValue === "expense"){
        inputField.classList.remove("hidden");
        inputField.classList.remove("md:hidden");
        inputField.classList.remove("lg:hidden");
    }else{
        inputField.classList.add("hidden");
        inputField.classList.add("md:hidden");
        inputField.classList.add("lg:hidden");
    }
}

function resetTransaction() {
    const selectIndex = document.getElementById("selectTransaction");
    selectIndex.selectedIndex = 0;
    resetType();
}

function resetType() {
    const inputField = document.getElementById("inputField");
    inputField.classList.add("hidden");
    inputField.classList.add("md:hidden");
  inputField.classList.add("lg:hidden");
}




// function editAll() {
//     document
//         .getElementById("form")
//         .addEventListener("submit", edit);


//     function edit(event) {
//         event.preventDefault();

//         const detail = document.getElementById("detail");
//         const amount = document.getElementById("amount");

//         detail.innerHTML = prompt("Enter Description");
//         amount.innerHTML = prompt("Enter Amount");


//         if (amount > 0) {
            
//             incomeAmount.push({ [detail]: amount })
            
//             updateIncomeUI(incomeAmount);

//         } else if (amount < 0) {

//             expenseAmount.push({ [detail]: amount });
            
//             updateExpenseUI(expenseAmount);
//         }
//         let allDetail = [...incomeAmount, ...expenseAmount];

//         updateAllUI(allDetail);
//         // console.log(allDetail);
//         resetDescription();
//         resetAmount();
//         // removeIncome();
//         // removeExpense();
//     }
// }