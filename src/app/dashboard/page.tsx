"use client";

import { useState, useEffect } from "react";
import { getTransactions } from "@/utils/transactionsStorage";
import { Transaction } from "@/types/transaction";
import TransactionForm from "@/components/TransactionForm";
import { deleteTransaction } from "@/utils/transactionsStorage";
import TransactionList from "@/components/TransactionList";


export default function Dashboard() {
    const [userEmail, setUserEmail] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const logged = localStorage.getItem("loggedUser");
        if (logged) {
            const user = JSON.parse(logged);
            setUserEmail(user.email);
            setTransactions(getTransactions(user.email));
        }
    }, []);

    function refreshTransactions() {
        if (userEmail) {
            setTransactions(getTransactions(userEmail));
        }
    }

    const balance = transactions.reduce((acc, t) => acc + (t.type === "income" ? t.amount : -t.amount), 0);

    return (
        <section className="flex flex-col items-center gap-8 p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-lg font-semibold">
                Saldo: <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>R$ {balance.toFixed(2)}</span>
            </p>

            <TransactionForm userEmail={userEmail} onAdd={refreshTransactions} />

            <div className="w-full max-w-2xl mt-6">
                <h2 className="text-xl text-center text-white font-semibold mb-2">Transações</h2>
                <ul className="bg-white shadow-md rounded-xl divide-y">
                    {transactions.map((t) => (
                        <li key={t.id} className="flex justify-between items-center px-4 py-2">
                            <div>
                                <p className="font-medium">{t.category}</p>
                                <p className="text-sm text-gray-500">{t.date.split("-").reverse().join("/")}
                                </p>
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
                                        refreshTransactions();
                                    }}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                    {transactions.length === 0 && <p className="text-gray-500 p-4 text-center">Nenhuma transação registrada</p>}
                </ul>
            </div>
        </section>
    );
}
