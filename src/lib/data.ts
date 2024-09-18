import { sql } from "@vercel/postgres";
import { Expense } from "./definitions";

export async function fetchExpenses() {
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
