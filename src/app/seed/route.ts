import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
    {
        id: "410544b2-4001-4271-9855-fec4b6a6442a",
        name: "User",
        email: "user@nextmail.com",
        password: "123456",
    },
];

const accountsAndCards = [
    {
        id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
        name: "Credit Card 1",
        cut_day: 1,
    },
    {
        id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        name: "Credit Card 2",
        cut_day: 15,
    },
    {
        id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
        name: "Cash",
        cut_day: 20,
    },
    {
        id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
        name: "Debit account",
        cut_day: 30,
    },
];

const categories = [
    {
        id: "5de2ab61-e49a-4d16-bd4a-55434345c314",
        name: "mandado",
        test: "foo",
    },
    {
        id: "c7cd8fb4-ef36-42e7-b4ae-aaabba3f5eeb",
        name: "gasolina",
        test: "foo",
    },
    {
        id: "11d0f3b6-a3af-4bbe-9141-c579b25b9a2b",
        name: "viaje",
        test: "foo",
    },
    {
        id: "a179c335-21a0-4553-80ac-2d188521ad6d",
        name: "renta",
        test: "foo",
    },
];

const expenses = [
    {
        payment_method_id: accountsAndCards[0].id,
        amount: 15795,
        status: "pending",
        date: "2022-12-06",
        category: categories[0].id,
    },
    {
        payment_method_id: accountsAndCards[1].id,
        amount: 20348,
        status: "pending",
        date: "2022-11-14",
        category: categories[1].id,
    },
    {
        payment_method_id: accountsAndCards[2].id,
        amount: 3040,
        status: "paid",
        date: "2022-10-29",
        category: categories[2].id,
    },
    {
        payment_method_id: accountsAndCards[3].id,
        amount: 44800,
        status: "paid",
        date: "2023-09-10",
        category: categories[3].id,
    },
    {
        payment_method_id: accountsAndCards[0].id,
        amount: 34577,
        status: "pending",
        date: "2023-08-05",
        category: categories[0].id,
    },
    {
        payment_method_id: accountsAndCards[1].id,
        amount: 54246,
        status: "pending",
        date: "2023-07-16",
        category: categories[1].id,
    },
    {
        payment_method_id: accountsAndCards[2].id,
        amount: 666,
        status: "pending",
        date: "2023-06-27",
        category: categories[2].id,
    },
    {
        payment_method_id: accountsAndCards[3].id,
        amount: 32545,
        status: "paid",
        date: "2023-06-09",
        category: categories[3].id,
    },
    {
        payment_method_id: accountsAndCards[0].id,
        amount: 1250,
        status: "paid",
        date: "2023-06-17",
        category: categories[0].id,
    },
    {
        payment_method_id: accountsAndCards[1].id,
        amount: 8546,
        status: "paid",
        date: "2023-06-07",
        category: categories[1].id,
    },
    {
        payment_method_id: accountsAndCards[2].id,
        amount: 500,
        status: "paid",
        date: "2023-08-19",
        category: categories[2].id,
    },
    {
        payment_method_id: accountsAndCards[3].id,
        amount: 8945,
        status: "paid",
        date: "2023-06-03",
        category: categories[3].id,
    },
    {
        payment_method_id: accountsAndCards[0].id,
        amount: 1000,
        status: "paid",
        date: "2022-06-05",
        category: categories[0].id,
    },
];

const monthExpenses = [
    { month: "Jan", revenue: 2000 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2200 },
    { month: "Apr", revenue: 2500 },
    { month: "May", revenue: 2300 },
    { month: "Jun", revenue: 3200 },
    { month: "Jul", revenue: 3500 },
    { month: "Aug", revenue: 3700 },
    { month: "Sep", revenue: 2500 },
    { month: "Oct", revenue: 2800 },
    { month: "Nov", revenue: 3000 },
    { month: "Dec", revenue: 4800 },
];

const client = await db.connect();

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
        })
    );

    return insertedUsers;
}

async function seedCategories() {
    console.log("hola");
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log("hola2");
    await client.sql`
    CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    `;
    console.log("hola3");
    const insertedCategories = await Promise.all(
        categories.map(
            (category) => client.sql`
                INSERT INTO categories (id, name)
                VALUES (${category.id}, ${category.name})
                ON CONFLICT (id) DO NOTHING;
            `
        )
    );

    return insertedCategories;
}

async function seedInvoices() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS expenses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      payment_method_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      category UUID NOT NULL
    );
  `;

    const insertedExpenses = await Promise.all(
        expenses.map(
            (invoice) => client.sql`
        INSERT INTO expenses (payment_method_id, amount, status, date, category)
        VALUES (${invoice.payment_method_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date}, ${invoice.category})
        ON CONFLICT (id) DO NOTHING;
      `
        )
    );

    return insertedExpenses;
}

async function seedAccountsAndCards() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS accounts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      cut_day INT NOT NULL
    );
  `;

    const insertedAccounts = await Promise.all(
        accountsAndCards.map(
            (account) => client.sql`
        INSERT INTO accounts (id, name, cut_day)
        VALUES (${account.id}, ${account.name}, ${account.cut_day})
        ON CONFLICT (id) DO NOTHING;
      `
        )
    );

    return insertedAccounts;
}

async function seedRevenue() {
    await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

    const totalExpenses = await Promise.all(
        monthExpenses.map(
            (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
        )
    );

    return totalExpenses;
}

export async function GET() {
    console.log("test");
    try {
        await client.sql`BEGIN`;
        await seedUsers();
        await seedAccountsAndCards();
        await seedCategories();
        await seedInvoices();
        await seedRevenue();
        await client.sql`COMMIT`;

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}
