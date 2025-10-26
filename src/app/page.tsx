// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center h-screen  ">

      <div className=" min-h-fit p-6 bg-gradient-to-br from-blue-50 to-white text-center mt-24 rounded-3xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao FinanceApp 💰</h1>
        <p className="text-gray-600 mb-8">
          Gerencie suas finanças de forma simples e eficiente.
        </p>

        <div className="flex gap-4">
          <Link
          id="login-link"
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Entrar
          </Link>
          <Link
          id="register-link"
            href="/register"
            className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-100"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </section>
  );
}
