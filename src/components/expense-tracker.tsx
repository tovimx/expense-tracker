"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { CalendarIcon, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const data = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 900 },
    { name: "Mar", total: 1600 },
    { name: "Apr", total: 1300 },
    { name: "May", total: 1800 },
];

const expenses = [
    {
        id: 1,
        date: "2023-05-15",
        amount: 50,
        category: "Food",
        description: "Grocery shopping",
    },
    {
        id: 2,
        date: "2023-05-14",
        amount: 30,
        category: "Transport",
        description: "Bus fare",
    },
    {
        id: 3,
        date: "2023-05-13",
        amount: 100,
        category: "Entertainment",
        description: "Movie night",
    },
    {
        id: 4,
        date: "2023-05-12",
        amount: 200,
        category: "Bills",
        description: "Electricity bill",
    },
    {
        id: 5,
        date: "2023-05-11",
        amount: 75,
        category: "Shopping",
        description: "New shirt",
    },
];

export function ExpenseTracker() {
    const [activeTab, setActiveTab] = useState("expenses");

    return (
        <div className="w-full p-2 sm:p-4 space-y-4">
            <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>
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
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="hsl(var(--primary))"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="expenses" className="mt-4 space-y-4">
                    {expenses.map((expense) => (
                        <Card key={expense.id}>
                            <CardContent className="p-4 flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">
                                        {expense.description}
                                    </p>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <CalendarIcon className="mr-1 h-3 w-3" />
                                        {expense.date}
                                    </div>
                                    <div className="text-xs font-medium">
                                        {expense.category}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span className="text-lg font-bold">
                                        ${expense.amount}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button className="w-full" variant="secondary">
                        Add New Expense
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    );
}
