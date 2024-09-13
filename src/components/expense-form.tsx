"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    DollarSignIcon,
    CreditCardIcon,
    WalletIcon,
    SearchIcon,
} from "lucide-react";
// import { DatePickerWithPresets } from "./date-picker";

const categories = [
    { id: "food", name: "Food", icon: WalletIcon },
    { id: "transport", name: "Transport", icon: CreditCardIcon },
    { id: "entertainment", name: "Entertainment", icon: WalletIcon },
    { id: "utilities", name: "Utilities", icon: CreditCardIcon },
    { id: "shopping", name: "Shopping", icon: WalletIcon },
    { id: "health", name: "Health", icon: CreditCardIcon },
    { id: "education", name: "Education", icon: WalletIcon },
    { id: "travel", name: "Travel", icon: CreditCardIcon },
];

export function ExpenseForm() {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Expense recorded:", { amount, paymentMethod, category });
        // Here you would typically send this data to your backend or state management system
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Nuevo gasto
                </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Cantidad</Label>
                        <div className="relative">
                            <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
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
                        <Select
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                            required>
                            <SelectTrigger id="paymentMethod">
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="credit">
                                    Credit Card
                                </SelectItem>
                                <SelectItem value="debit">
                                    Debit Card
                                </SelectItem>
                                <SelectItem value="bank">
                                    Bank Transfer
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search categories"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 mb-2"
                            />
                        </div>
                        <RadioGroup
                            value={category}
                            onValueChange={setCategory}
                            className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                            {filteredCategories.map((cat) => (
                                <Label
                                    key={cat.id}
                                    htmlFor={cat.id}
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <RadioGroupItem
                                        value={cat.id}
                                        id={cat.id}
                                        className="sr-only"
                                    />
                                    <cat.icon className="mb-3 h-6 w-6" />
                                    {cat.name}
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
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
