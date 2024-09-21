"use client";

import { useState } from "react";
import { CalendarIcon, CreditCard, EditIcon } from "lucide-react";
import { Expense } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import Link from "next/link";
import ExpenseDelete from "./expense-delete";

export function ExpenseTracker({ expenses }: { expenses: Expense[] }) {
    const [activeTab, setActiveTab] = useState("expenses");

    return (
        <div className="w-full p-2 sm:p-4 space-y-4">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                    <Card>
                        <CardContent className="p-2 sm:p-4">
                            <h2 className="text-lg font-semibold mb-4">
                                Monthly Expenses
                            </h2>
                            <div>TBD</div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="expenses" className="mt-4 space-y-4">
                    {expenses.map((expense) => (
                        <Card key={expense.id}>
                            <CardContent className="p-4 flex justify-between items-center hover:bg-slate-100 group">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">
                                        {expense?.description ??
                                            "No description"}
                                    </p>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <CalendarIcon className="mr-1 h-3 w-3" />
                                        {format(expense.date, "PPPPp")}
                                    </div>
                                    <div className="text-xs font-medium capitalize">
                                        {expense.category_name}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Link
                                        className="hidden mr-2 group-hover:block cursor-pointer text-muted-foreground"
                                        href={`/expense/${expense.id}/edit`}>
                                        <Button type="button" variant="ghost">
                                            <div className="flex flex-row items-center">
                                                <EditIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span>Edit</span>
                                            </div>
                                        </Button>
                                    </Link>
                                    <ExpenseDelete id={expense.id} />
                                    <span title={expense.account_name}>
                                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                                    </span>
                                    <span className="text-lg font-bold">
                                        ${expense.amount}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button className="w-full" variant="secondary">
                        <Link href="/expense">Add New Expense</Link>
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    );
}
