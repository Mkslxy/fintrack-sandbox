import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DEFAULT_TRANSACTION_FILTERS } from "../../constants/transaction/transaction.constant";

import type {
    Transaction,
    TransactionPayload,
    TransactionSort,
    TransactionTypeFilter,
} from "../../types/transaction/transaction.type";

import {
    calculateTransactionSummary,
    filterAndSortTransactions,
    formatCurrency,
} from "../../utils/transaction/transaction.utils";

import { SummaryCard } from "./components/SummaryCard";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";

import styles from "./DashboardPage.module.css"
import {useTransactions} from "../../hooks/transaction/useTransaction.ts";
import {DeleteTransactionDialog} from "./components/dialog/DeleteTransaction.tsx";
import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

export function DashboardPage() {
    const {
        transactions,
        isLoading,
        loadError,
        mutationError,
        isSaving,
        deletingId,
        reload,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        clearMutationError,
    } = useTransactions();

    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);

    const [transactionToDelete, setTransactionToDelete] =
        useState<Transaction | null>(null);

    const [filters, setFilters] =
        useState<
            {
                search: string;
                type: TransactionTypeFilter;
                sort: TransactionSort;
            }
        >(
            DEFAULT_TRANSACTION_FILTERS,
        );

    const summary = useMemo(
        () => calculateTransactionSummary(transactions),
        [transactions],
    );

    const visibleTransactions = useMemo(
        () => filterAndSortTransactions(transactions, filters),
        [transactions, filters],
    );

    async function handleSave(
        payload: TransactionPayload,
    ): Promise<boolean> {
        if (!editingTransaction) {
            return createTransaction(payload);
        }

        const success = await updateTransaction(
            editingTransaction.id,
            payload,
        );

        if (success) {
            setEditingTransaction(null);
        }

        return success;
    }

    function handleDeleteRequest(transaction: Transaction): void {
        clearMutationError();
        setTransactionToDelete(transaction);
    }

    function handleCloseDeleteDialog(): void {
        if (deletingId) {
            return;
        }

        clearMutationError();
        setTransactionToDelete(null);
    }

    async function handleDeleteConfirm(
        id: string,
    ): Promise<boolean> {
        const success = await deleteTransaction(id);

        if (success && editingTransaction?.id === id) {
            setEditingTransaction(null);
        }

        return success;
    }

    if (isLoading) {
        return (
            <main className={styles.loadingState}>
                <div className={styles.loader} />
                <p>Завантаження транзакцій...</p>
            </main>
        );
    }

    if (loadError) {
        return (
            <main className={styles.loadingState}>
                <h1>Не вдалося завантажити дані</h1>
                <p>{loadError}</p>

                <button
                    className={styles.primaryButton}
                    type="button"
                    onClick={() => void reload()}
                >
                    Спробувати ще раз
                </button>
            </main>
        );
    }

    return (
        <main className={styles.dashboard}>
            <header className={styles.topbar}>
                <div>
                    <span className={styles.brand}>FinTrack</span>
                    <h1>Фінансовий кабінет</h1>
                </div>
                <div className={styles.topbar__right}>
                    <Link className={styles.backLink} to="/">
                        Вийти
                    </Link>
                    <ThemeToggle />
                </div>
            </header>

            <section className={styles.summaryGrid}>
                <SummaryCard
                    label="Поточний баланс"
                    value={formatCurrency(summary.balance)}
                />

                <SummaryCard
                    label="Доходи"
                    value={formatCurrency(summary.income)}
                />

                <SummaryCard
                    label="Витрати"
                    value={formatCurrency(summary.expenses)}
                />

                <SummaryCard
                    label="Кількість операцій"
                    value={String(summary.count)}
                />
            </section>

            {mutationError && !transactionToDelete && (
                <div className={styles.errorBox} role="alert">
                    <span>{mutationError}</span>

                    <button
                        type="button"
                        onClick={clearMutationError}
                    >
                        Закрити
                    </button>
                </div>
            )}

            <div className={styles.contentGrid}>
                <TransactionForm
                    editingTransaction={editingTransaction}
                    isSaving={isSaving}
                    onSave={handleSave}
                    onCancelEdit={() => setEditingTransaction(null)}
                />

                <section className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <div>
                            <span>Історія</span>
                            <h2>Транзакції</h2>
                        </div>

                        <strong>
                            {visibleTransactions.length} із{" "}
                            {transactions.length}
                        </strong>
                    </div>

                    <TransactionFilters
                        filters={filters}
                        onChange={setFilters}
                    />

                    <TransactionList
                        transactions={visibleTransactions}
                        onEdit={setEditingTransaction}
                        onDeleteRequest={handleDeleteRequest}
                    />
                </section>
            </div>

            <DeleteTransactionDialog
                transaction={transactionToDelete}
                isDeleting={
                    transactionToDelete !== null &&
                    deletingId === transactionToDelete.id
                }
                errorMessage={mutationError}
                onConfirm={handleDeleteConfirm}
                onClose={handleCloseDeleteDialog}
            />

        </main>
    );
}