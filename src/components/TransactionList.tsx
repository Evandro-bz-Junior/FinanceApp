"use client";

import { Transaction } from "@/types/transaction";
import { deleteTransaction } from "@/utils/transactionsStorage";

type Props = {
    transactions: Transaction[];
    userEmail: string;
    onDelete: () => void;
};

export default function TransactionList({ transactions, userEmail, onDelete }: Props) {
    if (transactions.length === 0) {
        return <p className="text-gray-500 p-4 text-center">Nenhuma transação registrada</p>;
    }

    return (
        <ul className="bg-white shadow-md rounded-xl divide-y">
            {transactions.map((t) => (
                <li key={t.id} className="flex justify-between items-center px-4 py-2">
                    <div>
                        <p className="font-medium">{t.category}</p>
                        <p className="text-sm text-gray-500">{t.date.split("-").reverse().join("/")}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span
                            className={t.type === "income" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
                        >
                            {t.type === "income" ? "+" : "-"} R$ {t.amount.toFixed(2)}
                        </span>

                        <button
                            onClick={() => {
                                deleteTransaction(t.id, userEmail);
                                onDelete();
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Excluir
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
