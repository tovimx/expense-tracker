// import { useState } from "react";
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
import { createExpense } from "@/lib/actions";
import { ExpenseCategorySelect } from "./expense-category-select";
import { fetchAccounts, fetchCategories } from "@/lib/data";
// import { DatePickerWithPresets } from "./date-picker";

export async function ExpenseForm() {
    const categories = await fetchCategories();
    const accounts = await fetchAccounts();

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Nuevo gasto
                </CardTitle>
            </CardHeader>
            <form action={createExpense}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Description</Label>
                        <div className="relative">
                            <Input
                                id="description"
                                name="description"
                                placeholder="Compra en HEB"
                                defaultValue=""
                                required
                            />
                        </div>
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
                                required
                            />
                        </div>
                    </div>
                    {/* <div className="space-y-2">
                        <Label htmlFor="amount">Fecha</Label>
                        <div className="relative">
                            <DatePickerWithPresets id="amount" />
                        </div>
                    </div> */}

                    <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Select required name="account">
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                {accounts.map((account) => (
                                    <SelectItem
                                        value={account.id}
                                        key={account.id}>
                                        {account.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ExpenseCategorySelect categories={categories} />
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
