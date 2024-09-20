"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
    errors?: {
        description?: string[];
        account?: string[];
        amount?: string[];
        category?: string[];
    };
    message?: string | null;
};
const FormSchema = z.object({
    id: z.string(),
    description: z.string().min(1, {
        message: "Please enter a description.",
    }),
    account: z.string().refine((data) => data !== "default", {
        message: "Please select an account.",
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    date: z.string(),
    category: z.string({
        invalid_type_error: "Please select a category.",
    }),
});

const CreateExpense = FormSchema.omit({ id: true, date: true });

export async function createExpense(prevState: State, formData: FormData) {
    const validatedFields = CreateExpense.safeParse({
        description: formData.get("description"),
        amount: formData.get("amount"),
        account: formData.get("account"),
        category: formData.get("category"),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Expense.",
        };
    }
    // Prepare data for insertion into the database
    const { description, amount, account, category } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    try {
        await sql`
        INSERT INTO expenses (amount, description, account, category, date)
        VALUES (${amountInCents}, ${description}, ${account}, ${category}, ${date})
      `;
    } catch (error) {
        return {
            message: "Database Error: Failed to create expense.",
        };
    }

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
    try {
        await sql`
        UPDATE expenses
        SET description = ${description}, amount = ${amountInCents}, account = ${account}, category = ${category}
        WHERE id = ${id}
      `;
    } catch (error) {
        return { message: "Database Error: Failed to Update Expense." };
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function deleteExpense(id: string) {
    try {
        await sql`DELETE FROM expenses WHERE id = ${id}`;
    } catch (error) {
        return { message: "Database Error: Failed to Delete Expense." };
    }
    revalidatePath("/dashboard");
}
