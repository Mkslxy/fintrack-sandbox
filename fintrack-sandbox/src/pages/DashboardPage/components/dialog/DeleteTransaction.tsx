import * as AlertDialog from "@radix-ui/react-alert-dialog";

import type { Transaction } from "../../../../types/transaction/transaction.type";

import styles from "../../DashboardPage.module.css";

type DeleteTransactionDialogProps = {
    transaction: Transaction | null;
    isDeleting: boolean;
    errorMessage: string | null;
    onConfirm: (id: string) => Promise<boolean>;
    onClose: () => void;
};

export function DeleteTransactionDialog({
                                            transaction,
                                            isDeleting,
                                            errorMessage,
                                            onConfirm,
                                            onClose,
                                        }: DeleteTransactionDialogProps) {
    async function handleConfirm(): Promise<void> {
        if (!transaction) {
            return;
        }

        const success = await onConfirm(transaction.id);

        if (success) {
            onClose();
        }
    }

    return (
        <AlertDialog.Root
            open={transaction !== null}
            onOpenChange={(open) => {
                if (!open && !isDeleting) {
                    onClose();
                }
            }}
        >
            <AlertDialog.Portal>
                <AlertDialog.Overlay className={styles.dialogOverlay} />

                <AlertDialog.Content className={styles.dialogContent}>
                    <AlertDialog.Title className={styles.dialogTitle}>
                        Видалити транзакцію?
                    </AlertDialog.Title>

                    <AlertDialog.Description
                        className={styles.dialogDescription}
                    >
                        Ви впевнені, що хочете видалити транзакцію{" "}
                        <strong>«{transaction?.title}»</strong>? Цю дію неможливо
                        скасувати.
                    </AlertDialog.Description>

                    {errorMessage && (
                        <p className={styles.dialogError} role="alert">
                            {errorMessage}
                        </p>
                    )}

                    <div className={styles.dialogActions}>
                        <AlertDialog.Cancel asChild>
                            <button
                                className={styles.dialogCancelButton}
                                type="button"
                                disabled={isDeleting}
                            >
                                Скасувати
                            </button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <button
                                className={styles.dialogDeleteButton}
                                type="button"
                                disabled={isDeleting}
                                onClick={(event) => {
                                    event.preventDefault();
                                    void handleConfirm();
                                }}
                            >
                                {isDeleting ? "Видалення..." : "Видалити"}
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}