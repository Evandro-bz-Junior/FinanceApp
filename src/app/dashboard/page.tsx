"use client";

import { useState, useEffect } from "react";
import { getTransactions } from "@/utils/transactionsStorage";
import { Transaction } from "@/types/transaction";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import TransactionFilter from "@/components/TransactionFilter";
import TransactionChart from "@/components/TransactionChart";


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

    const [selectedType, setSelectedType] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categories = Array.from(new Set(transactions.map((t) => t.category)));

    const filteredTransactions = transactions.filter((t) => {
        return (
            (selectedType === "all" || t.type === selectedType) &&
            (selectedCategory === "all" || t.category === selectedCategory)
        );
    });


    return (
        <section className="flex flex-col   gap-8 p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex justify-around ">
                <div className="flex flex-col gap-2 ">
                    <p className="text-lg font-semibold ps-2">
                        Saldo: <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>R$ {balance.toFixed(2)}</span>
                    </p>

                    <TransactionForm userEmail={userEmail} onAdd={refreshTransactions} />
                </div>

                <div className="w-full max-h-fit mt-6">
                    <TransactionChart data={filteredTransactions} />

                </div>
            </div>
            
            <h2 className="text-xl text-center text-white font-semibold mb-2">Transações</h2>
            <TransactionFilter
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            <TransactionList
                transactions={filteredTransactions}
                userEmail={userEmail}
                onDelete={refreshTransactions}
            />



        </section>
    );
}
