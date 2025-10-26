import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { saveTransaction } from "@/utils/transactionsStorage";
import TransactionForm from "@/components/TransactionForm";
import { useRouter } from "next/navigation";

// Mock das dependências
jest.mock("@/utils/transactionsStorage", () => ({
    saveTransaction: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));
jest.mock("uuid", () => ({
    v4: () => "mocked-uuid-for-test",
}));

describe("TransactionForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        // Simula um usuário logado, necessário para addTransaction
        localStorage.setItem(
            "loggedUser",
            JSON.stringify({ name: "João Teste", email: "joao@teste.com", password: "123" })
        );
    });

    it("renderiza todos os campos do formulário corretamente", () => {
        render(<TransactionForm userEmail="joao@teste.com" onAdd={jest.fn()} />);

        expect(screen.getByRole('radio', { name: /receita/i })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /despesa/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/categoria/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/valor/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument();
        // O input de data não tem um seletor fácil, mas sua presença é testada indiretamente nos outros testes.
    });

    it("permite ao usuário inserir valores nos campos", () => {
        render(<TransactionForm userEmail="joao@teste.com" onAdd={jest.fn()} />);

        fireEvent.click(screen.getByLabelText(/despesa/i)); // Seleciona o tipo "Despesa"
        fireEvent.change(screen.getByPlaceholderText(/categoria/i), { target: { value: "Salário" } });
        fireEvent.change(screen.getByPlaceholderText(/valor/i), { target: { value: "1500" } });
        // O input de data é mais difícil de selecionar sem um label, então vamos confiar que ele funciona se os outros funcionam.

        expect(screen.getByLabelText(/despesa/i)).toBeChecked();
        expect(screen.getByPlaceholderText(/categoria/i)).toHaveValue("Salário");
        expect(screen.getByPlaceholderText(/valor/i)).toHaveValue(1500); // Input type="number" retorna número
    });

    it("submete o formulário com novos dados e limpa os campos", async () => {
        const onAddMock = jest.fn();
        render(<TransactionForm userEmail="joao@teste.com" onAdd={onAddMock} />);

        fireEvent.click(screen.getByLabelText(/despesa/i));
        fireEvent.change(screen.getByPlaceholderText(/categoria/i), { target: { value: "Transporte" } });
        fireEvent.change(screen.getByPlaceholderText(/valor/i), { target: { value: "50" } });
        fireEvent.change(screen.getByDisplayValue(''), { target: { value: "2023-11-10" } }); // Seleciona o input de data pelo seu valor vazio inicial

        fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

        await waitFor(() => {
            expect(saveTransaction).toHaveBeenCalledTimes(1);
            expect(saveTransaction).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "mocked-uuid-for-test",
                    type: "expense",
                    category: "Transporte",
                    amount: 50,
                    date: "2023-11-10",
                    userEmail: "joao@teste.com",
                })
            );
            expect(onAddMock).toHaveBeenCalledTimes(1);
        });

        // Verifica se os campos do formulário foram resetados após a submissão
       
        expect(screen.getByPlaceholderText(/categoria/i)).toHaveValue("");
        expect(screen.getByPlaceholderText(/valor/i)).toHaveValue(null);
    });

    it("mostra mensagens de erro para entrada inválida", async () => {
        render(<TransactionForm userEmail="joao@teste.com" onAdd={jest.fn()} />);

        // Tenta submeter com campos vazios
        fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

        await waitFor(() => {
            expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument();
        });

        // Preenche alguns campos, mas não todos
        fireEvent.change(screen.getByPlaceholderText(/categoria/i), { target: { value: "Comida" } });
        fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));
        await waitFor(() => {
            expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument();
        });
    });
});
