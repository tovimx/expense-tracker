import { ExpenseForm } from "@/components/expense-form";
import { Suspense } from "react";
export default async function NewExpense() {
    return (
        <Suspense fallback={<div>loading form</div>}>
            <ExpenseForm />;
        </Suspense>
    );
}
