import { ExpenseTracker } from "@/components/expense-tracker";
import { fetchExpenses } from "@/lib/data";

export default async function Home() {
    const expenses = await fetchExpenses();
    console.log(expenses);

    return <ExpenseTracker expenses={expenses} />;
}
