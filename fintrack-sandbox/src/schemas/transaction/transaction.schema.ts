import { z } from "zod";

export const transactionSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Назва має містити щонайменше 2 символи")
        .max(60, "Назва не може містити більше 60 символів"),

    amount: z
        .number()
        .positive("Сума має бути більшою за 0"),

    type: z.enum(["income", "expense"]),

    category: z
        .string()
        .trim()
        .min(1, "Оберіть категорію"),

    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Оберіть коректну дату"),

    description: z
        .string()
        .trim()
        .max(200, "Опис не може містити більше 200 символів"),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

export function createTransactionDefaultValues(): TransactionFormValues {
    const now = new Date();

    const localDate = new Date(
        now.getTime() - now.getTimezoneOffset() * 60_000,
    )
        .toISOString()
        .slice(0, 10);

    return {
        title: "",
        amount: 0,
        type: "expense",
        category: "Продукти",
        date: localDate,
        description: "",
    };
}