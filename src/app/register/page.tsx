"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../types/user";
import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Preencha todos os campos");
            return;
        }

        // Pega usuários existentes
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        // Checa se email já existe
        const emailExists = users.some(u => u.email === email);
        if (emailExists) {
            setError("Email já cadastrado");
            return;
        }

        // Cria novo usuário
        const newUser: User = {
            id: uuidv4(),
            name,
            email,
            password,
        };

        // Salva no localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Redireciona para login
        router.push("/login");
    }

    return (
        <section className="flex justify-center items-center  mt-8  ">
            <div className="flex flex-col gap-6 items-center w-full max-w-sm p-8 rounded-2xl bg-white shadow-md">
                <h1 className="text-2xl font-bold">Registro</h1>

                <form className="flex flex-col gap-4 w-full" onSubmit={handleRegister}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-medium mb-1">Nome</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Seu nome"
                            className="border rounded-lg px-4 py-2"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

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

                    <button
                        type="submit"
                        className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg mt-2"
                    >
                        Registrar
                    </button>
                </form>

                <p className="text-sm mt-2">
                    Já tem conta? <a href="/login" className="text-blue-500 font-bold hover:underline">Login</a>
                </p>
            </div>
        </section>
    );
}
