"use client";

import { Transaction } from "@/types/transaction";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Props = {
    data: Transaction[];
};

const COLORS = ["#4ade80", "#f87171"]; // verde para receita, vermelho para despesa

export default function TransactionChart({ data }: Props) {
    const totalIncome = data
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = data
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const chartData = [
        { name: "Receita", value: totalIncome },
        { name: "Despesa", value: totalExpense },
    ];

    return (
        <div className="w-full max-w-lg h-full  mx-auto bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-center">Resumo</h2>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label={(entry: any) => `${entry.name}: R$ ${entry.value.toFixed(2)}`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
