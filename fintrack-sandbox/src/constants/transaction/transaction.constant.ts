import type {
    TransactionSort,
    TransactionType,
    TransactionTypeFilter
} from "../../types/transaction/transaction.type.ts";

export const TRANSACTION_CATEGORIES = {
    income: [ "Зарплата", "Фриланс", "Подарунок", "Інше"],
    expense: [ "Продукти", "Транспорт", "Житло", "Підписки", "Розваги", "Інше"],
} as const satisfies Record<TransactionType, readonly string[]>;

export const DEFAULT_TRANSACTION_FILTERS: {search: string; type: TransactionTypeFilter; sort: TransactionSort;  } = {
    search: "",
    type: "all",
    sort: "date-desc",
};