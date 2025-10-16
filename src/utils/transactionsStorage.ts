import { Transaction } from "@/types/transaction";

export function getTransactions(userEmail: string): Transaction[] {
    const data = localStorage.getItem("transactions");
    if (!data) return [];
    const all = JSON.parse(data);
    return all.filter((t: Transaction) => t.userEmail === userEmail);
}

export function saveTransaction(newTransaction: Transaction) {
    const data = localStorage.getItem("transactions");
    const all: Transaction[] = data ? JSON.parse(data) : [];
    all.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(all));
}

export function deleteTransaction(id: string, userEmail: string) {
    const data = localStorage.getItem("transactions");
    if (!data) return;

    const all: Transaction[] = JSON.parse(data);
    const updated = all.filter(
        (t) => !(t.id === id && t.userEmail === userEmail)
    );
    localStorage.setItem("transactions", JSON.stringify(updated));
}