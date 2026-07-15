import type {
    Transaction,
    TransactionSort,
    TransactionSummary,
    TransactionTypeFilter
} from "../../types/transaction/transaction.type.ts";

const currencyFormatter = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeZone: "UTC",
});

export function calculateTransactionSummary(transactions: Transaction[]): TransactionSummary {
    return transactions.reduce<TransactionSummary>(
        (summary, transaction) => {
            const income =
                transaction.type === "income" ? summary.income + transaction.amount : summary.income;

            const expenses =
                transaction.type === "expense" ? summary.expenses + transaction.amount : summary.expenses;

            return {
                income,
                expenses,
                balance: income - expenses,
                count: summary.count + 1,
            };
        },
        {
            income: 0,
            expenses: 0,
            balance: 0,
            count: 0,
        },
    );
}

export function filterAndSortTransactions(
    transactions: Transaction[],
    filters: {
        search: string;
        type: TransactionTypeFilter;
        sort: TransactionSort;
    },
): Transaction[] {
    const normalizedSearch = filters.search.trim().toLowerCase();

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesType =
            filters.type === "all" || transaction.type === filters.type;

        const searchableValues = [
            transaction.title,
            transaction.category,
            transaction.description ?? "",
        ];

        const matchesSearch =
            normalizedSearch.length === 0 ||
            searchableValues.some((value) =>
                value.toLowerCase().includes(normalizedSearch),
            );

        return matchesType && matchesSearch;
    });

    return [...filteredTransactions].sort((first, second) => {
        switch (filters.sort) {
            case "date-asc":
                return first.date.localeCompare(second.date);

            case "amount-desc":
                return second.amount - first.amount;

            case "amount-asc":
                return first.amount - second.amount;

            case "date-desc":
            default:
                return second.date.localeCompare(first.date);
        }
    });
}

export function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
}

export function formatTransactionDate(date: string): string {
    return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}