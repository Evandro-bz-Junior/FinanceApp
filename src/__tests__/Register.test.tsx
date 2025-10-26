
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "@/app/register/page";

// 🧩 Mock do router do Next.js
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

// 🆔 Mock do uuid (novo — para evitar erro )

jest.mock("uuid", () => ({
    v4: () => "mocked-uuid-123",
}));


describe("Tela de Registro", () => {
    beforeEach(() => {
        localStorage.clear();
        mockPush.mockClear();
    });

    it("renderiza corretamente os campos e o botão", () => {
        render(<Register />);

        expect(screen.getByText("Registro")).toBeInTheDocument();
        expect(screen.getByLabelText("Nome")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Senha")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Registrar" })).toBeInTheDocument();
    });

    it("realiza registro com sucesso", () => {

        render(<Register />);

        const nameInput = screen.getByLabelText("Nome");
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Senha");
        const registerButton = screen.getByRole("button", { name: "Registrar" });

        fireEvent.change(nameInput, { target: { value: "Teste1" } });
        fireEvent.change(emailInput, { target: { value: "teste1@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.click(registerButton);

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        expect(users).toEqual([
            { id: "mocked-uuid-123", name: "Teste1", email: "teste1@gmail.com", password: "123" },
        ]);

        expect(mockPush).toHaveBeenCalledWith("/login");
    });

    it("Erro quando email ja cadastrado", () => {
        localStorage.setItem(
            "users",
            JSON.stringify([{ name: "Teste3", email: "teste1@gmail.com", password: "123" }])
        );

        render(<Register />);

        const nameInput = screen.getByLabelText("Nome");
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Senha");
        const registerButton = screen.getByRole("button", { name: "Registrar" });

        fireEvent.change(nameInput, { target: { value: "Teste1" } });
        fireEvent.change(emailInput, { target: { value: "teste1@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.click(registerButton);

        expect(screen.getByText(/Email já cadastrado/i)).toBeInTheDocument();
    });

    it("exibe erro se houver campos vazios e não registra o usuário", () => {
        render(<Register />);

        const registerButton = screen.getByRole("button", { name: "Registrar" });

        fireEvent.click(registerButton);

        expect(screen.getByText(/Preencha todos os campos/i)).toBeInTheDocument();

        expect(mockPush).not.toHaveBeenCalled();

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        expect(users).toHaveLength(0);
    });

});
