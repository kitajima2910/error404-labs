import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../utils/date";
import useExpensesStore from "../store/zustand/expensesStore";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()

    const expensesCtx = useContext(ExpensesContext);

    const expensesStoreExpenses = useExpensesStore((state) => state.expenses);
    const expensesStoreSetExpenses = useExpensesStore((state) => state.setExpense);

    useEffect(() => {

        const getExpenses = async () => {
            setIsFetching(true)

            try {
                const expenses = await fetchExpenses()
                expensesStoreSetExpenses(expenses)
            } catch (error) {
                setError("Could not fetch expenses!")
            }
            
            setIsFetching(false)
        }

        getExpenses()
    }, [])

    const errorHandler = () => {
        setError(null)
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />

    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesStoreExpenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });

    
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"} fallBackText={"No expenses registered for the last 7 days."} />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
