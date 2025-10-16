"use client";

import { useState } from "react";
import { User } from "../../types/user";
import Link from "next/link"; 
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: User) => u.email === email && u.password === password);

        if (!user) {
            setError("Email ou senha incorretos");
            return;
        }

        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.dispatchEvent(new Event("storageUpdate"));
        router.push("/dashboard");
    }

    return (
        <section className="flex justify-center items-center h-screen  ">
            <div className="flex flex-col gap-6 items-center w-full max-w-sm p-8 rounded-2xl bg-white shadow-md">
                <h1 className="text-2xl font-bold">Login</h1>

                <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium mb-1">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="E-mail"
                            className="border rounded-lg px-4 py-2"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-medium mb-1">Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Senha"
                            className="border rounded-lg px-4 py-2"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg mt-2">Entrar</button>
                </form>

                <p className="text-sm mt-2">
                    Não tem conta? <Link href="/register" className="text-blue-500 font-bold hover:underline">
                        Registre-se
                    </Link>
                </p>
            </div>
        </section>
    );
}
