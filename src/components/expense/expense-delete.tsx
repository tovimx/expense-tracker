import { deleteExpense } from "@/lib/actions";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
export default function ExpenseDelete({ id }: { id: string }) {
    const deleteExpenseWithId = deleteExpense.bind(null, id);

    return (
        <form action={deleteExpenseWithId}>
            <Button
                type="submit"
                variant="ghost"
                className="hidden group-hover:block cursor-pointer text-muted-foreground">
                <div className="flex flex-row items-center ">
                    <TrashIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Delete</span>
                </div>
            </Button>
        </form>
    );
}
