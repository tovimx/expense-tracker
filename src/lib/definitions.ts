export type Expense = {
    id: string;
    account_name: string;
    amount: number;
    date: string;
    status: "pending" | "paid";
    category_name: string;
    description?: string;
};
