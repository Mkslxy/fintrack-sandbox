import { z } from "zod";

export type AuthMode = "login" | "register";

const authFieldsSchema = z.object({
    name: z.string(),
    email: z
        .string()
        .trim()
        .min(1, "Вкажіть електронну пошту")
        .email("Вкажіть коректну електронну пошту"),
    password: z
        .string()
        .min(1, "Вкажіть пароль")
        .min(6, "Пароль має містити щонайменше 6 символів"),
    confirmPassword: z.string(),
});

export type AuthValues = z.infer<typeof authFieldsSchema>;

export function createAuthSchema(mode: AuthMode) {
    return authFieldsSchema.superRefine((values, context) => {
        if (mode !== "register") {
            return;
        }

        if (values.name.trim().length < 2) {
            context.addIssue({
                code: "custom",
                path: ["name"],
                message: "Ім’я має містити щонайменше 2 символи",
            });
        }

        if (!values.confirmPassword) {
            context.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Повторіть пароль",
            });

            return;
        }

        if (values.password !== values.confirmPassword) {
            context.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Паролі не збігаються",
            });
        }
    });
}