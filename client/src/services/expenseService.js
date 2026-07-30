import api from "./api";


// Get All Expenses
export const getExpenses = () => {

    return api.get("/expense");

};


// Add Expense
export const createExpense = (data) => {

    return api.post("/expense", data);

};


// Delete Expense
export const deleteExpense = (id) => {

    return api.delete(`/expense/${id}`);

};