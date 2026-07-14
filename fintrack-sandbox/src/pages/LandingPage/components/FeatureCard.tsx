import styles from "../LandingPage.module.css";

type FeatureCardProps = {
    number: string;
    title: string;
    description: string;
};

export function FeatureCard({
                                number,
                                title,
                                description,
                            }: FeatureCardProps) {
    return (
        <article className={styles["feature-card"]}>
            <span className={styles["feature-card__number"]}>{number}</span>

            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </article>
    );
}