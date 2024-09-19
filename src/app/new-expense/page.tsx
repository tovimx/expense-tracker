import { ExpenseForm } from "@/components/expense-form";
import { fetchCategories } from "@/lib/data";
export default async function NewExpense() {
    const categories = await fetchCategories();
    return <ExpenseForm categories={categories} />;
}
