import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-7-19"),
    },
    {
        id: "e2",
        description: "A pair of trousers",
        amount: 89.99,
        date: new Date("2025-7-19"),
    },
    // {
    //     id: "e3",
    //     description: "Some bananas",
    //     amount: 5.99,
    //     date: new Date("2025-7-19"),
    // },
    // {
    //     id: "e4",
    //     description: "A book",
    //     amount: 14.99,
    //     date: new Date("2025-12-19"),
    // },
    // {
    //     id: "e5",
    //     description: "A pair of shoes",
    //     amount: 59.99,
    //     date: new Date("2025-12-19"),
    // },
    // {
    //     id: "e6",
    //     description: "A pair of trousers",
    //     amount: 89.99,
    //     date: new Date("2025-12-19"),
    // },
    // {
    //     id: "e7",
    //     description: "Some bananas",
    //     amount: 5.99,
    //     date: new Date("2025-12-19"),
    // },
    // {
    //     id: "e8",
    //     description: "A book",
    //     amount: 14.99,
    //     date: new Date("2025-7-19"),
    // },
    // {
    //     id: "e9",
    //     description: "A pair of shoes",
    //     amount: 59.99,
    //     date: new Date("2025-12-19"),
    // },
    // {
    //     id: "e10",
    //     description: "A pair of trousers",
    //     amount: 89.99,
    //     date: new Date("2025-7-19"),
    // },
    // {
    //     id: "e11",
    //     description: "Some bananas",
    //     amount: 5.99,
    //     date: new Date("2025-7-19"),
    // },
    // {
    //     id: "e12",
    //     description: "A book",
    //     amount: 14.99,
    //     date: new Date("2025-7-19"),
    // },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case "UPDATE":
            const updateExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updateExpense = state[updateExpenseIndex];
            const updatedExpense = { ...updateExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updateExpenseIndex] = updatedExpense;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
};

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = (expense) => {
        dispatch({ type: "ADD", payload: expense });
    };

    const deleteExpense = (id) => {
        dispatch({ type: "DELETE", payload: id });
    };

    const updateExpense = (id, expense) => {
        dispatch({ type: "UPDATE", payload: { id: id, data: expense } });
    };

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
