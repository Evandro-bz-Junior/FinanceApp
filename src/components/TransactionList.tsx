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
        return (
            <p className="text-gray-500 text-center bg-white shadow-md p-6 rounded-xl">
                Nenhuma transação encontrada
            </p>
        );
    }

    return (
        <ul className="bg-white shadow-md rounded-xl divide-y">
            {transactions.map((t) => (
                <li key={t.id} className="flex justify-between items-center px-4 py-3">
                    <div>
                        <p className="font-medium">{t.category}</p>
                        <p className="text-sm text-gray-500">{t.date.split("-").reverse().join("/")}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span
                            className={`font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"
                                }`}
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
