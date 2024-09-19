import { sql } from "@vercel/postgres";
import { Expense, Category } from "./definitions";

export async function fetchExpenses() {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const data = await sql<Expense>`
        SELECT
            e.id,
            e.amount,
            e.date,
            c.name AS category_name,
            a.name AS account_name
        FROM expenses e
        JOIN categories c ON e.category = c.id
        JOIN accounts a ON e.payment_method_id = a.id
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
