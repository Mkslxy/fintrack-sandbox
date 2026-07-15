import type {
    TransactionSort,
    TransactionTypeFilter,
} from "../../../types/transaction/transaction.type";

import styles from "../DashboardPage.module.css";

type TransactionFiltersProps = {
    filters: {
        search: string;
        type: TransactionTypeFilter;
        sort: TransactionSort;
    };
    onChange: (filters: {
        search: string;
        type: TransactionTypeFilter;
        sort: TransactionSort;
    }) => void;
};

export function TransactionFilters({
                                       filters,
                                       onChange,
                                   }: TransactionFiltersProps) {
    function resetFilters() {
        onChange({
            search: "",
            type: "all",
            sort: "date-desc",
        });
    }

    return (
        <section className={styles.filters}>
            <label className={styles.filterField}>
                <span>Пошук</span>

                <input
                    type="search"
                    value={filters.search}
                    placeholder="Назва або категорія"
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            search: event.target.value,
                        })
                    }
                />
            </label>

            <label className={styles.filterField}>
                <span>Тип</span>

                <select
                    value={filters.type}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            type: event.target.value as TransactionTypeFilter,
                        })
                    }
                >
                    <option value="all">Усі операції</option>
                    <option value="income">Доходи</option>
                    <option value="expense">Витрати</option>
                </select>
            </label>

            <label className={styles.filterField}>
                <span>Сортування</span>

                <select
                    value={filters.sort}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            sort: event.target.value as TransactionSort,
                        })
                    }
                >
                    <option value="date-desc">Спочатку нові</option>
                    <option value="date-asc">Спочатку старі</option>
                    <option value="amount-desc">Сума: від більшої</option>
                    <option value="amount-asc">Сума: від меншої</option>
                </select>
            </label>

            <button
                className={styles.resetButton}
                type="button"
                onClick={resetFilters}
            >
                Скинути
            </button>
        </section>
    );
}