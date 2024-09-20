import { ExpenseForm } from "@/components/expense/expense-form";
import { fetchAccounts, fetchCategories } from "@/lib/data";
export default async function NewExpense() {
    const categories = await fetchCategories();
    const accounts = await fetchAccounts();
    return <ExpenseForm categories={categories} accounts={accounts} />;
}
