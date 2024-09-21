export type Expense = {
    id: string;
    account_name: string;
    amount: number;
    date: string;
    category_name: string;
    description?: string;
};

export type Category = {
    id: string;
    name: string;
};

export type Account = {
    id: string;
    name: string;
    cut_day: number;
};

export type ExpenseForm = {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    account: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};
