"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedUser");
        if (storedUser) setUser(JSON.parse(storedUser));

        function handleStorageUpdate() {
            const updatedUser = localStorage.getItem("loggedUser");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        }

        window.addEventListener("storageUpdate", handleStorageUpdate);
        return () => window.removeEventListener("storageUpdate", handleStorageUpdate);
    }, []);

    function handleLogout() {
        localStorage.removeItem("loggedUser");
        setUser(null);
        router.push("/login");
    }

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
            <Link href="/" className="text-xl font-bold text-blue-600">
                FinanceApp
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-gray-700 font-medium">
                            Olá, {user.name.split(" ")[0]}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Entrar
                        </Link>
                        <Link
                            href="/register"
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                            Criar Conta
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
