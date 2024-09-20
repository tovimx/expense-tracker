"use client";
import { useActionState, ReactNode } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DollarSignIcon } from "lucide-react";
import { Suspense } from "react";
import { createExpense, type State } from "@/lib/actions";
import { ExpenseCategorySelect } from "./expense-category-select";
import { Account, Category } from "@/lib/definitions";
// import { DatePickerWithPresets } from "./date-picker";

interface NewExpenseFormProps {
    categories: Category[];
    accounts: Account[];
}
export function ExpenseForm({
    categories,
    accounts,
}: NewExpenseFormProps): ReactNode {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createExpense, initialState);
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Nuevo Gasto
                </CardTitle>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Description</Label>
                        <div className="relative">
                            <Input
                                id="description"
                                name="description"
                                placeholder="Compra en HEB"
                                defaultValue={""}
                            />
                        </div>
                        {state.errors?.description &&
                            state.errors.description.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Cantidad</Label>
                        <div className="relative">
                            <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="0.00"
                                className="pl-10"
                            />
                        </div>
                        {state.errors?.amount &&
                            state.errors.amount.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                    {/* <div className="space-y-2">
                        <Label htmlFor="amount">Fecha</Label>
                        <div className="relative">
                            <DatePickerWithPresets id="amount" />
                        </div>
                    </div> */}

                    <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Select
                            name="account"
                            aria-describedby="account-error"
                            defaultValue={"default"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"default"} key={"default"}>
                                    {"Select payment method"}
                                </SelectItem>
                                {accounts.map((account) => (
                                    <SelectItem
                                        value={account.id.toString()}
                                        key={account.id}>
                                        {account.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div
                            id="account-error"
                            aria-live="polite"
                            aria-atomic="true">
                            {state.errors?.account &&
                                state.errors.account.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ExpenseCategorySelect categories={categories} />
                        {state.errors?.category &&
                            state.errors.category.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </Suspense>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        Agregar
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
