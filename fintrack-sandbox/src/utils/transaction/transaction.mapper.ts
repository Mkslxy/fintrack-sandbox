import type {TransactionFormValues} from "../../schemas/transaction/transaction.schema.ts";
import type {Transaction, TransactionPayload} from "../../types/transaction/transaction.type.ts";

export function toTransactionPayload(
    values: TransactionFormValues,
): TransactionPayload {
    return {
        title: values.title.trim(),
        amount: values.amount,
        type: values.type,
        category: values.category,
        date: values.date,
        description: values.description.trim(),
    };
}

export function toTransactionFormValues(
    transaction: Transaction,
): TransactionFormValues {
    return {
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        description: transaction.description ?? "",
    };
}