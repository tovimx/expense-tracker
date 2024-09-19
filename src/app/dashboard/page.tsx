import { ExpenseTracker } from "@/components/expense-tracker";
import { fetchExpenses } from "@/lib/data";
export default async function Home() {
    const expenses = await fetchExpenses();

    return <ExpenseTracker expenses={expenses} />;
}
