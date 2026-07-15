import axios from "axios";
import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    createTransaction as createTransactionRequest,
    deleteTransaction as deleteTransactionRequest,
    getTransactions,
    updateTransaction as updateTransactionRequest,
} from "../../api/transactionsApi.ts";

import type {
    Transaction,
    TransactionPayload,
} from "../../types/transaction/transaction.type.ts";

function getRequestErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return "Не вдалося підключитися до сервера.";
        }

        return `Сервер повернув помилку ${error.response.status}.`;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Сталася невідома помилка.";
}

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [mutationError, setMutationError] = useState<string | null>(
        null,
    );
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const loadTransactions = useCallback(
        async (signal?: AbortSignal): Promise<void> => {
            try {
                const data = await getTransactions(signal);

                if (signal?.aborted) {
                    return;
                }

                setTransactions(data);
                setLoadError(null);
            } catch (error: unknown) {
                if (!signal?.aborted) {
                    setLoadError(getRequestErrorMessage(error));
                }
            } finally {
                if (!signal?.aborted) {
                    setIsLoading(false);
                }
            }
        },
        [],
    );

    useEffect(() => {
        const controller = new AbortController();

        getTransactions(controller.signal)
            .then((data) => {
                if (controller.signal.aborted) {
                    return;
                }

                setTransactions(data);
                setLoadError(null);
            })
            .catch((error: unknown) => {
                if (!controller.signal.aborted) {
                    setLoadError(getRequestErrorMessage(error));
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

    const reload = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setLoadError(null);

        await loadTransactions();
    }, [loadTransactions]);

    async function createTransaction(
        payload: TransactionPayload,
    ): Promise<boolean> {
        setIsSaving(true);
        setMutationError(null);

        try {
            const createdTransaction =
                await createTransactionRequest(payload);

            setTransactions((currentTransactions) => [
                createdTransaction,
                ...currentTransactions,
            ]);

            return true;
        } catch (error: unknown) {
            setMutationError(getRequestErrorMessage(error));
            return false;
        } finally {
            setIsSaving(false);
        }
    }

    async function updateTransaction(
        id: string,
        payload: TransactionPayload,
    ): Promise<boolean> {
        setIsSaving(true);
        setMutationError(null);

        try {
            const updatedTransaction =
                await updateTransactionRequest(id, payload);

            setTransactions((currentTransactions) =>
                currentTransactions.map((transaction) =>
                    transaction.id === id
                        ? updatedTransaction
                        : transaction,
                ),
            );

            return true;
        } catch (error: unknown) {
            setMutationError(getRequestErrorMessage(error));
            return false;
        } finally {
            setIsSaving(false);
        }
    }

    async function deleteTransaction(
        id: string,
    ): Promise<boolean> {
        setDeletingId(id);
        setMutationError(null);

        try {
            await deleteTransactionRequest(id);

            setTransactions((currentTransactions) =>
                currentTransactions.filter(
                    (transaction) => transaction.id !== id,
                ),
            );

            return true;
        } catch (error: unknown) {
            setMutationError(getRequestErrorMessage(error));
            return false;
        } finally {
            setDeletingId(null);
        }
    }

    return {
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
        clearMutationError: () => setMutationError(null),
    };
}