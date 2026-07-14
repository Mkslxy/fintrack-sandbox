import type {
    AuthValues,
    AuthMode,
} from "../schemas/authSchema";

type AuthResult = {
    id: string;
    email: string;
    displayName: string;
};

function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

export async function submitAuthForm(
    mode: AuthMode,
    values: AuthValues,
): Promise<AuthResult> {
    await delay(1000);

    const normalizedEmail = values.email.trim().toLowerCase();

    if (normalizedEmail === "example@gmail.com") {
        throw new Error("Не вдалося виконати запит. Спробуйте ще раз.");
    }

    return {
        id: crypto.randomUUID(),
        email: normalizedEmail,
        displayName:
            mode === "register" ? values.name.trim() : "Користувач",
    };
}