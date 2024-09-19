"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";

const FormSchema = z.object({
    id: z.string(),
    description: z.string(),
    account: z.string(),
    amount: z.coerce.number(),
    date: z.string(),
    category: z.string(),
});

const CreateExpense = FormSchema.omit({ id: true, date: true });

export async function createExpense(formData: FormData) {
    const { description, amount, account, category } = CreateExpense.parse({
        description: formData.get("description"),
        amount: formData.get("amount"),
        account: formData.get("account"),
        category: formData.get("category"),
    });
    console.log({ description, amount, account, category });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    await sql`
    INSERT INTO expenses (amount, description, account, category, date)
    VALUES (${amountInCents}, ${description}, ${account}, ${category}, ${date})
  `;
}
