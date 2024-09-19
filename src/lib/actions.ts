"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    await sql`
    INSERT INTO expenses (amount, description, account, category, date)
    VALUES (${amountInCents}, ${description}, ${account}, ${category}, ${date})
  `;
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateExpense(id: string, formData: FormData) {
    const { description, amount, account, category } = UpdateInvoice.parse({
        description: formData.get("description"),
        amount: formData.get("amount"),
        account: formData.get("account"),
        category: formData.get("category"),
    });
    const amountInCents = amount * 100;
    // const date = new Date().toISOString().split("T")[0];

    await sql`
    UPDATE expenses
    SET description = ${description}, amount = ${amountInCents}, account = ${account}, category = ${category}
    WHERE id = ${id}
  `;

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function deleteExpense(id: string) {
    await sql`DELETE FROM expenses WHERE id = ${id}`;
    revalidatePath("/dashboard");
}
