"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveTransaction } from "@/utils/transactionsStorage";
import { Transaction } from "@/types/transaction";

export default function TransactionForm({ userEmail, onAdd }: { userEmail: string; onAdd: () => void }) {
    const [type, setType] = useState<"income" | "expense">("income");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!category || !amount || !date) {
            setError("Preencha todos os campos");
            return;
        }

        const newTransaction: Transaction = {
            id: uuidv4(),
            type,
            category,
            amount: parseFloat(amount),
            date,
            userEmail,
        };

        saveTransaction(newTransaction);
        onAdd(); // avisa o componente pai pra recarregar a lista

        // limpa campos
        setCategory("");
        setAmount("");
        setDate("");
        setError("");
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md px-6 py-4 rounded-xl flex flex-col gap-4  w-72 max-w-md">
            <h2 className="text-xl font-semibold">Nova Transação</h2>

            <div className="flex gap-4">
                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        value="income"
                        checked={type === "income"}
                        onChange={() => setType("income")}
                    />
                    Receita
                </label>

                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        value="expense"
                        checked={type === "expense"}
                        onChange={() => setType("expense")}
                    />
                    Despesa
                </label>
            </div>

            <input
                type="text"
                placeholder="Categoria (ex: Alimentação)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-lg px-4 py-2"
            />

            <input
                type="number"
                 min="0"
                placeholder="Valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded-lg px-4 py-2"
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-lg px-4 py-2"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Adicionar
            </button>
        </form>
    );
}
