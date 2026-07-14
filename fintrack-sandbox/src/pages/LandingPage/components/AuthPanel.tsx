import { useState, type FormEvent } from "react";
import styles from "../LandingPage.module.css";

type AuthMode = "login" | "register";

export function AuthPanel() {
    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [message, setMessage] = useState("");

    const isLogin = authMode === "login";

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setMessage(
            isLogin
                ? "Логін демо режим"
                : "Реєстрація демо режим",
        );
    }

    function changeAuthMode(mode: AuthMode) {
        setAuthMode(mode);
        setMessage("");
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
                        onClick={() => changeAuthMode("login")}
                    >
                        Вхід
                    </button>

                    <button
                        className={`${styles["auth-switcher__button"]} ${
                            !isLogin ? styles.active : ""
                        }`}
                        type="button"
                        onClick={() => changeAuthMode("register")}
                    >
                        Реєстрація
                    </button>
                </div>

                <form className={styles["auth-form"]} onSubmit={handleSubmit}>
                    {!isLogin && (
                        <label className={styles["auth-form__field"]}>
                            <span>Ім’я</span>

                            <input
                                type="text"
                                name="name"
                                placeholder="Олексій"
                                minLength={2}
                                required
                            />
                        </label>
                    )}

                    <label className={styles["auth-form__field"]}>
                        <span>Електронна пошта</span>

                        <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            required
                        />
                    </label>

                    <label className={styles["auth-form__field"]}>
                        <span>Пароль</span>

                        <input
                            type="password"
                            name="password"
                            placeholder="Мінімум 6 символів"
                            minLength={6}
                            required
                        />
                    </label>

                    {!isLogin && (
                        <label className={styles["auth-form__field"]}>
                            <span>Повторіть пароль</span>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Повторіть пароль"
                                minLength={6}
                                required
                            />
                        </label>
                    )}

                    {message && (
                        <p className={styles["auth-form__message"]}>{message}</p>
                    )}

                    <button className={styles["auth-form__submit"]} type="submit">
                        {isLogin ? "Увійти" : "Створити обліковий запис"}
                    </button>
                </form>

                <p className={styles["auth-card__notice"]}>Демо-версія</p>
            </div>
        </section>
    );
}