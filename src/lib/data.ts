import { sql } from "@vercel/postgres";
import { Expense, Category, Account } from "./definitions";

export async function fetchExpenses() {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const data = await sql<Expense>`
        SELECT
            e.id,
            e.amount,
            e.date,
            e.description,
            c.name AS category_name,
            a.name AS account_name
        FROM expenses e
        JOIN categories c ON e.category = c.id
        JOIN accounts a ON e.account = a.id
        ORDER BY e.date DESC;
      `;

        const expenses = data.rows;
        return expenses;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch all expenses.");
    }
}

export async function fetchCategories() {
    try {
        const data = await sql<Category>`
        SELECT *
        FROM categories
        ORDER BY name ASC;
      `;

        const categories = data.rows;
        return categories;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch all categories.");
    }
}

export async function fetchAccounts() {
    try {
        const data = await sql<Account>`
        SELECT *
        FROM accounts
        ORDER BY name ASC;
      `;

        const accounts = data.rows;
        return accounts;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch all accounts.");
    }
}
