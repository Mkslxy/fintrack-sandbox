import type { Transaction } from "../../../types/transaction/transaction.type";

import { TransactionItem } from "./TransactionItem";

import styles from "../DashboardPage.module.css";

type TransactionListProps = {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDeleteRequest: (transaction: Transaction) => void;
};

export function TransactionList({
                                    transactions,
                                    onEdit,
                                    onDeleteRequest,
                                }: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>Транзакцій не знайдено</h3>

                <p>
                    Додайте першу операцію або змініть параметри
                    фільтрації.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.transactionList}>
            {transactions.map((transaction) => (
                <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={onEdit}
                    onDeleteRequest={onDeleteRequest}
                />
            ))}
        </div>
    );
}