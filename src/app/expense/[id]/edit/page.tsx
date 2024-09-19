import { ExpenseFormEdit } from "@/components/expense/expense-form-edit";
import { fetchExpenseById } from "@/lib/data";
import { Suspense } from "react";
export default async function EditExpense({
    params,
}: {
    params: { id: string };
}) {
    const id = params.id;
    const expense = await fetchExpenseById(id);
    return (
        <Suspense fallback={<div>loading edit form</div>}>
            <ExpenseFormEdit expense={expense} />;
        </Suspense>
    );
}
