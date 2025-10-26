
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/login/page";

// 🧩 Mock do router do Next.js
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));


describe("Tela de Login", () => {
    beforeEach(() => {
        localStorage.clear();
        mockPush.mockClear();
    });

    it("renderiza corretamente os campos e o botão", () => {
        render(<Login />);

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Senha")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    });

    it("realiza login com sucesso", () => {
        localStorage.setItem(
            "users",
            JSON.stringify([{ name: "Teste3", email: "teste3@gmail.com", password: "123" }])
        );
        render(<Login />);

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Senha");
        const loginButton = screen.getByRole("button", { name: "Entrar" });

        fireEvent.change(emailInput, { target: { value: "teste3@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.click(loginButton);

        expect(mockPush).toHaveBeenCalledWith("/dashboard");

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
        expect(loggedUser.email).toBe("teste3@gmail.com");
    });

    it("exibe erro ao tentar login com credenciais inválidas", () => {
        // Simula que existe apenas um usuário
        localStorage.setItem(
            "users",
            JSON.stringify([{ name: "Teste3", email: "teste3@gmail.com", password: "123" }])
        );

        render(<Login />);

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Senha");
        const loginButton = screen.getByRole("button", { name: "Entrar" });

        fireEvent.change(emailInput, { target: { value: "teste3@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "senhaerrada" } });

        fireEvent.click(loginButton);

        expect(screen.getByText("Email ou senha incorretos")).toBeInTheDocument();

        expect(mockPush).not.toHaveBeenCalled();

        expect(localStorage.getItem("loggedUser")).toBeNull();
    });

    it("exibe erro quando não há usuários cadastrados", () => {
        localStorage.clear(); // garante array vazio

        render(<Login />);

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Senha");
        const loginButton = screen.getByRole("button", { name: "Entrar" });

        fireEvent.change(emailInput, { target: { value: "teste@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.click(loginButton);

        expect(screen.getByText("Email ou senha incorretos")).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });

});
