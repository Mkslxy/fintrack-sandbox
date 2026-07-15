export type TransactionType = "income" | "expense";

export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
    description?: string;
};

export type TransactionPayload = Omit<Transaction, "id">;

export type TransactionTypeFilter = "all" | TransactionType;

export type TransactionSort = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export type TransactionSummary = {
    income: number;
    expenses: number;
    balance: number;
    count: number;
};