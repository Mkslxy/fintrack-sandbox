import styles from "../DashboardPage.module.css";

type SummaryCardProps = {
    label: string;
    value: string;
};

export function SummaryCard({
                                label,
                                value,
                            }: SummaryCardProps) {
    return (
        <article className={styles.summaryCard}>
            <span className={styles.summaryLabel}>{label}</span>
            <strong className={styles.summaryValue}>{value}</strong>
        </article>
    );
}