import { FeatureCard } from "./FeatureCard";
import styles from "../LandingPage.module.css";

const features = [
    {
        number: "01",
        title: "Керування операціями",
        description: "Додавай, редагуй і видаляй свої транзакції.",
    },
    {
        number: "02",
        title: "Фінансова статистика",
        description: "Стеж за доходами, витратами та поточним балансом.",
    },
    {
        number: "03",
        title: "Курси валют",
        description: "Переглядай актуальні дані із зовнішнього API.",
    },
];

export function LandingInfo() {
    return (
        <section className={styles.landing__info}>
            <div className={styles.landing__content}>
                <a className={styles.landing__logo} href="/">
                    FinTrack
                </a>

                <div className={styles.landing__description}>
                    <span className={styles.landing__label}>
                        Трекер особистих фінансів
                    </span>

                    <h1>Контролюй гроші без складних таблиць</h1>

                    <p>
                        Додавай доходи та витрати, аналізуй баланс і стеж за своїми
                        фінансовими звичками в одному застосунку.
                    </p>
                </div>

                <div className={styles.landing__features}>
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.number}
                            number={feature.number}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}