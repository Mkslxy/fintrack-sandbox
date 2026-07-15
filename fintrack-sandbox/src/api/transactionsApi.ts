import { httpClient } from "./httpClient";
import type {
    Transaction,
    TransactionPayload,
} from "../types/transaction/transaction.type";

export async function getTransactions(
    signal?: AbortSignal,
): Promise<Transaction[]> {
    const response = await httpClient.get<Transaction[]>(
        "/transactions",
        {
            signal,
        },
    );

    return response.data;
}

export async function createTransaction(
    payload: TransactionPayload,
): Promise<Transaction> {
    const response = await httpClient.post<Transaction>(
        "/transactions",
        payload,
    );

    return response.data;
}

export async function updateTransaction(
    id: string,
    payload: TransactionPayload,
): Promise<Transaction> {
    const response = await httpClient.patch<Transaction>(
        `/transactions/${id}`,
        payload,
    );

    return response.data;
}

export async function deleteTransaction(id: string): Promise<void> {
    await httpClient.delete(`/transactions/${id}`);
}