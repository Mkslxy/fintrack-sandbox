import type { Transaction } from "../../../types/transaction/transaction.type";

import {
    formatCurrency,
    formatTransactionDate,
} from "../../../utils/transaction/transaction.utils";

import styles from "../DashboardPage.module.css";

type TransactionItemProps = {
    transaction: Transaction;
    onEdit: (transaction: Transaction) => void;
    onDeleteRequest: (transaction: Transaction) => void;
};

export function TransactionItem({
                                    transaction,
                                    onEdit,
                                    onDeleteRequest,
                                }: TransactionItemProps) {
    const amountPrefix =
        transaction.type === "income" ? "+" : "-";

    return (
        <article className={styles.transactionItem}>
            <div className={styles.transactionInfo}>
                <strong>{transaction.title}</strong>

                <span className={styles.meta}>
          {transaction.category} ·{" "}
                    {formatTransactionDate(transaction.date)}
        </span>

                {transaction.description && (
                    <p>{transaction.description}</p>
                )}
            </div>

            <strong
                className={`${styles.amount} ${
                    transaction.type === "income"
                        ? styles.income
                        : styles.expense
                }`}
            >
                {amountPrefix}
                {formatCurrency(transaction.amount)}
            </strong>

            <div className={styles.itemActions}>
                <button
                    className={styles.editButton}
                    type="button"
                    onClick={() => onEdit(transaction)}
                >
                    Редагувати
                </button>

                <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => onDeleteRequest(transaction)}
                >
                    Видалити
                </button>
            </div>
        </article>
    );
}