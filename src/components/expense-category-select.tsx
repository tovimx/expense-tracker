"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Category } from "@/lib/definitions";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
export function ExpenseCategorySelect({
    categories,
}: {
    categories: Category[];
}) {
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
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
                name="category"
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
                        {/* <cat.icon className="mb-3 h-6 w-6" /> */}
                        {cat.name}
                    </Label>
                ))}
            </RadioGroup>
        </div>
    );
}
