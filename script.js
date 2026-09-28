// Кнопки для відкриття форм
const earnedButton = document.getElementById("earnedButton");
const expensButton = document.getElementById("expensButton");

// Форми для показу
const incomeForm = document.getElementById("income");
const expenseForm = document.getElementById("expense");

// Елементи форми Income
const incomeNameInput = document.getElementById("incomeNameInput");
const incomeNumberInput = document.getElementById("incomeNumberInput");
const incomeDescriptionInput = document.getElementById("incomeDescriptionInput");
const addIncomeButton = document.getElementById("addIncomeButton");

// Елементи форми Expense
const expenseNameInput = document.getElementById("nameInput");
const expenseNumberInput = document.getElementById("numberInput");
const expenseDescriptionInput = document.getElementById("descriptionInput");
const addExpenseButton = document.getElementById("addExpenseButton");

// Елементи верхнього рахунку балансу 
const earnedCountEl = document.getElementById("earnedCount");
const spentCountEl = document.getElementById("spentCount");
const currentCountEl = document.getElementById("currentCount");
const boxHistoryEl = document.getElementById("box");

// Головний масив для зберігання всіх дій на сайті
let transactions = JSON.parse(localStorage.getItem("moneyTrackerTransactions")) || [];

// Показ форм
earnedButton.addEventListener('click', () => {
    expenseForm.style.display = 'none';
    incomeForm.style.display = incomeForm.style.display === 'flex' ? 'none' : 'flex';
});

expensButton.addEventListener('click', () => {
    incomeForm.style.display = 'none';
    expenseForm.style.display = expenseForm.style.display === 'flex' ? 'none' : 'flex';
});

// Функція для оновлення інтерфейсу
function updateUI() {
    localStorage.setItem("moneyTrackerTransactions", JSON.stringify(transactions));

    let totalEarned = 0;
    let totalSpent = 0;

    transactions.forEach(t => {
        if (t.type === 'income') totalEarned += t.amount;
        if (t.type === 'expense') totalSpent += t.amount;
    });

    let currentBalance = totalEarned - totalSpent;

    // Виводимо цифри на екран
    earnedCountEl.innerHTML = `+${totalEarned}`;
    spentCountEl.innerHTML = `-${totalSpent}`;
    currentCountEl.innerHTML = `${currentBalance}`;

    boxHistoryEl.innerHTML = '';

    // Створюємо історію транзакцій
    transactions.forEach(t => {
        const itemHtml = `
            <div class="transaction-item">
                <div>
                    <strong>${t.name}</strong> <span style="font-size: 11px; color: #8a8b9c; margin-left: 10px;">${t.time}</span>
                    <p style="font-size: 12px; color: #8a8b9c; margin-top: 4px;">${t.description}</p>
                </div>
                <span class="${t.type === 'income' ? 'earnedText' : 'spendText'}">
                    ${t.type === 'income' ? '+' : '-'}${t.amount}
                </span>
            </div>
        `;
        boxHistoryEl.insertAdjacentHTML('beforeend', itemHtml);
    });
}

// Додавання доходу
addIncomeButton.addEventListener('click', () => {
    if (!incomeNameInput.value || !incomeNumberInput.value) {
        alert("Заповніть всі поля!");
        return;
    }
    
    let nameInput = incomeNameInput.value;
    let numberInput = Number(incomeNumberInput.value);
    let descriptionInput = incomeDescriptionInput.value;

    const newIncome = {
        id: Date.now(),
        type: 'income',
        name: nameInput,
        amount: numberInput,
        description: descriptionInput || 'No description',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    transactions.push(newIncome);

    // Скидає поля форми
    incomeNameInput.value = '';
    incomeNumberInput.value = '';
    incomeDescriptionInput.value = '';

    incomeForm.style.display = 'none';

    updateUI();
});

// Додавання витрат
addExpenseButton.addEventListener('click', () => {
    if (!expenseNameInput.value || !expenseNumberInput.value) {
        alert("Заповніть всі поля!");
        return;
    }

    let nameInput = expenseNameInput.value;
    let numberInput = Number(expenseNumberInput.value);
    let descriptionInput = expenseDescriptionInput.value;

    const newExpense = {
        id: Date.now(),
        type: 'expense',
        name: nameInput,
        amount: numberInput,
        description: descriptionInput || 'No description',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    transactions.push(newExpense);

    // Скидає поля форми
    expenseNameInput.value = '';
    expenseNumberInput.value = '';
    expenseDescriptionInput.value = '';

    expenseForm.style.display = 'none';

    updateUI();
});

// Перший запуск для відображення збережених даних
updateUI();
