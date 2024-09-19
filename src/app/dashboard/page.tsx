import { ExpenseTracker } from "@/components/expense/expense-tracker";
import { fetchExpenses } from "@/lib/data";
export default async function Home() {
    const expenses = await fetchExpenses();

    return <ExpenseTracker expenses={expenses} />;
}
