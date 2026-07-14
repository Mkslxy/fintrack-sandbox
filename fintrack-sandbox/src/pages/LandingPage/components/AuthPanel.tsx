import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import styles from "../LandingPage.module.css";
import {type AuthMode, type AuthValues, createAuthSchema} from "../schemas/authSchema.ts";
import {submitAuthForm} from "../services/AuthSevices.tsx";

const defaultValues: AuthValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export function AuthPanel() {
    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [successMessage, setSuccessMessage] = useState("");

    const isLogin = authMode === "login";

    const authFormSchema = useMemo(
        () => createAuthSchema(authMode),
        [authMode],
    );

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<AuthValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues,
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    function changeAuthMode(mode: AuthMode) {
        setAuthMode(mode);
        setSuccessMessage("");
        reset(defaultValues);
    }

    async function onSubmit(values: AuthValues) {
        setSuccessMessage("");

        try {
            const result = await submitAuthForm(authMode, values);

            setSuccessMessage(
                isLogin
                    ? `Вхід виконано для ${result.email}`
                    : `Обліковий запис для ${result.displayName} створено`,
            );
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Сталася невідома помилка";

            setError("root.server", {
                type: "server",
                message,
            });
        }
    }

    return (
        <section className={styles.landing__auth}>
            <div className={styles["auth-card"]}>
                <div className={styles["auth-card__heading"]}>
                    <span>Ласкаво просимо</span>

                    <h2>
                        {isLogin
                            ? "Увійдіть до облікового запису"
                            : "Створіть обліковий запис"}
                    </h2>

                    <p>
                        {isLogin
                            ? "Введіть дані, щоб продовжити роботу з FinTrack."
                            : "Заповніть форму, щоб почати контролювати свої фінанси."}
                    </p>
                </div>

                <div
                    className={styles["auth-switcher"]}
                    aria-label="Вибір форми авторизації"
                >
                    <button
                        className={`${styles["auth-switcher__button"]} ${
                            isLogin ? styles.active : ""
                        }`}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => changeAuthMode("login")}
                    >
                        Вхід
                    </button>

                    <button
                        className={`${styles["auth-switcher__button"]} ${
                            !isLogin ? styles.active : ""
                        }`}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => changeAuthMode("register")}
                    >
                        Реєстрація
                    </button>
                </div>

                <form
                    className={styles["auth-form"]}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {!isLogin && (
                        <label className={styles["auth-form__field"]}>
                            <span>Ім’я</span>

                            <input
                                type="text"
                                placeholder="Олексій"
                                autoComplete="name"
                                disabled={isSubmitting}
                                aria-invalid={Boolean(errors.name)}
                                {...register("name")}
                            />

                            {errors.name && (
                                <p
                                    className={styles["auth-form__error"]}
                                    role="alert"
                                >
                                    {errors.name.message}
                                </p>
                            )}
                        </label>
                    )}

                    <label className={styles["auth-form__field"]}>
                        <span>Електронна пошта</span>

                        <input
                            type="email"
                            placeholder="example@email.com"
                            autoComplete="email"
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errors.email)}
                            {...register("email")}
                        />

                        {errors.email && (
                            <p
                                className={styles["auth-form__error"]}
                                role="alert"
                            >
                                {errors.email.message}
                            </p>
                        )}
                    </label>

                    <label className={styles["auth-form__field"]}>
                        <span>Пароль</span>

                        <input
                            type="password"
                            placeholder="Мінімум 6 символів"
                            autoComplete={
                                isLogin ? "current-password" : "new-password"
                            }
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errors.password)}
                            {...register("password")}
                        />

                        {errors.password && (
                            <p
                                className={styles["auth-form__error"]}
                                role="alert"
                            >
                                {errors.password.message}
                            </p>
                        )}
                    </label>

                    {!isLogin && (
                        <label className={styles["auth-form__field"]}>
                            <span>Повторіть пароль</span>

                            <input
                                type="password"
                                placeholder="Повторіть пароль"
                                autoComplete="new-password"
                                disabled={isSubmitting}
                                aria-invalid={Boolean(errors.confirmPassword)}
                                {...register("confirmPassword")}
                            />

                            {errors.confirmPassword && (
                                <p
                                    className={styles["auth-form__error"]}
                                    role="alert"
                                >
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </label>
                    )}

                    {errors.root?.server && (
                        <p
                            className={styles["auth-form__server-error"]}
                            role="alert"
                        >
                            {errors.root.server.message}
                        </p>
                    )}

                    {successMessage && (
                        <p className={styles["auth-form__message"]}>
                            {successMessage}
                        </p>
                    )}

                    <button
                        className={styles["auth-form__submit"]}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Завантаження..."
                            : isLogin
                                ? "Увійти"
                                : "Створити обліковий запис"}
                    </button>
                </form>

                <p className={styles["auth-card__notice"]}>
                    Демо-версія
                </p>
            </div>
        </section>
    );
}