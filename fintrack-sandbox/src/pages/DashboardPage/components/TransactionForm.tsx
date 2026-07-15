import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm , useWatch } from "react-hook-form";

import { TRANSACTION_CATEGORIES } from "../../../constants/transaction/transaction.constant";
import {
    createTransactionDefaultValues,
    transactionSchema,
    type TransactionFormValues,
} from "../../../schemas/transaction/transaction.schema";
import type {
    Transaction,
    TransactionPayload,
    TransactionType,
} from "../../../types/transaction/transaction.type";
import {
    toTransactionFormValues,
    toTransactionPayload,
} from "../../../utils/transaction/transaction.mapper";

import styles from "../DashboardPage.module.css";

type TransactionFormProps = {
    editingTransaction: Transaction | null;
    isSaving: boolean;
    onSave: (payload: TransactionPayload) => Promise<boolean>;
    onCancelEdit: () => void;
};

export function TransactionForm({
                                    editingTransaction,
                                    isSaving,
                                    onSave,
                                    onCancelEdit,
                                }: TransactionFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: createTransactionDefaultValues(),
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const selectedType = useWatch({
        control,
        name: "type",
        defaultValue: "expense",
    });


    const availableCategories =
        TRANSACTION_CATEGORIES[selectedType];

    const typeRegistration = register("type");

    useEffect(() => {
        if (editingTransaction) {
            reset(toTransactionFormValues(editingTransaction));
            return;
        }

        reset(createTransactionDefaultValues());
    }, [editingTransaction, reset]);

    async function onSubmit(values: TransactionFormValues,): Promise<void> {
        const success = await onSave(
            toTransactionPayload(values),
        );

        if (success && !editingTransaction) {
            reset(createTransactionDefaultValues());
        }
    }

    const isBusy = isSaving || isSubmitting;

    return (
        <section className={styles.panel}>
            <div className={styles.panelHeader}>
                <div>
                    <span>Операція</span>

                    <h2>
                        {editingTransaction
                            ? "Редагування транзакції"
                            : "Нова транзакція"}
                    </h2>
                </div>
            </div>

            <form
                className={styles.form}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles.formGrid}>
                    <label className={styles.field}>
                        <span>Назва</span>

                        <input
                            type="text"
                            placeholder="Наприклад, продукти"
                            disabled={isBusy}
                            aria-invalid={Boolean(errors.title)}
                            {...register("title")}
                        />

                        {errors.title && (
                            <small className={styles.errorText}>
                                {errors.title.message}
                            </small>
                        )}
                    </label>

                    <label className={styles.field}>
                        <span>Сума</span>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            disabled={isBusy}
                            aria-invalid={Boolean(errors.amount)}
                            {...register("amount", {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.amount && (
                            <small className={styles.errorText}>
                                {errors.amount.message}
                            </small>
                        )}
                    </label>

                    <label className={styles.field}>
                        <span>Тип операції</span>

                        <select
                            {...typeRegistration}
                            disabled={isBusy}
                            onChange={(event) => {
                                typeRegistration.onChange(event);

                                const nextType = event.target
                                    .value as TransactionType;

                                setValue(
                                    "category",
                                    TRANSACTION_CATEGORIES[nextType][0],
                                    {
                                        shouldValidate: true,
                                    },
                                );
                            }}
                        >
                            <option value="expense">Витрата</option>
                            <option value="income">Дохід</option>
                        </select>
                    </label>

                    <label className={styles.field}>
                        <span>Категорія</span>

                        <select
                            disabled={isBusy}
                            {...register("category")}
                        >
                            {availableCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        {errors.category && (
                            <small className={styles.errorText}>
                                {errors.category.message}
                            </small>
                        )}
                    </label>

                    <label className={styles.field}>
                        <span>Дата</span>

                        <input
                            type="date"
                            disabled={isBusy}
                            aria-invalid={Boolean(errors.date)}
                            {...register("date")}
                        />

                        {errors.date && (
                            <small className={styles.errorText}>
                                {errors.date.message}
                            </small>
                        )}
                    </label>

                    <label
                        className={`${styles.field} ${styles.fullWidth}`}
                    >
                        <span>Опис</span>

                        <textarea
                            rows={4}
                            placeholder="Необов’язковий опис"
                            disabled={isBusy}
                            aria-invalid={Boolean(errors.description)}
                            {...register("description")}
                        />

                        {errors.description && (
                            <small className={styles.errorText}>
                                {errors.description.message}
                            </small>
                        )}
                    </label>
                </div>

                <div className={styles.formActions}>
                    <button
                        className={styles.primaryButton}
                        type="submit"
                        disabled={isBusy}
                    >
                        {isBusy
                            ? "Збереження..."
                            : editingTransaction
                                ? "Зберегти зміни"
                                : "Додати транзакцію"}
                    </button>

                    {editingTransaction && (
                        <button
                            className={styles.secondaryButton}
                            type="button"
                            disabled={isBusy}
                            onClick={onCancelEdit}
                        >
                            Скасувати
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}