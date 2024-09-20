import { ExpenseFormEdit } from "@/components/expense/expense-form-edit";
import { fetchExpenseById } from "@/lib/data";
import { Suspense } from "react";
import { notFound } from "next/navigation";
export default async function EditExpense({
    params,
}: {
    params: { id: string };
}) {
    const id = params.id;
    const expense = await fetchExpenseById(id);
    if (!expense) {
        notFound();
    }
    return (
        <Suspense fallback={<div>loading edit form</div>}>
            <ExpenseFormEdit expense={expense} />;
        </Suspense>
    );
}
