export type Transaction = {
    id: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    date: string; 
    userEmail: string; 
};
