import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import { deleteTransaction, getTransactions } from "@/utils/transactionsStorage";

const mockPush = jest.fn();

jest.mock("@/utils/transactionsStorage", () => ({
    getTransactions: jest.fn(),
    deleteTransaction: jest.fn(),
}));

jest.mock("uuid", () => ({
    v4: () => "mocked-uuid-123",
}));

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));



describe("Dashboard", () => {

    beforeEach(() => {
        localStorage.clear();

        localStorage.setItem(
            "loggedUser",
            JSON.stringify({ name: "João Teste", email: "joao@teste.com", password: "123" })
        );

        // Mock retorna as transações esperadas
        (getTransactions as jest.Mock).mockReturnValue([
            { id: "1", type: "income", category: "Salário", amount: 1000, date: "2025-10-20" },
            { id: "2", type: "expense", category: "Alimentação", amount: 200, date: "2025-10-21" },
        ]);
    });

    it("exibe o título Dashboard", () => {
        render(<Dashboard />);
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("exibe o saldo correto", async () => {
        render(<Dashboard />);
        await waitFor(() => {
            expect(screen.getByText("R$ 800.00")).toBeInTheDocument();
        });
    });

    it("lista todas as transações do usuário", async () => {
        render(<Dashboard />);

        // Aguarda os itens da lista aparecerem
        const incomeItem = await screen.findByTestId("transaction-1");
        const expenseItem = await screen.findByTestId("transaction-2");

        // Verifica conteúdo específico usando query dentro do item
        expect(incomeItem).toHaveTextContent("Salário");
        expect(incomeItem).toHaveTextContent("+ R$ 1000.00");

        expect(expenseItem).toHaveTextContent("Alimentação");
        expect(expenseItem).toHaveTextContent("- R$ 200.00");
    });

    it("exclui uma transação e atualiza o saldo", async () => {
        // Mock para simular a exclusão
        (deleteTransaction as jest.Mock).mockImplementation(() => {
            (getTransactions as jest.Mock).mockReturnValue([
                { id: "1", type: "income", category: "Salário", amount: 1000, date: "2025-10-20" },
            ]);
        });

        render(<Dashboard />);

        // Aguarda os itens da lista aparecerem
        const incomeItem = await screen.findByTestId("transaction-1");
        const expenseItem = await screen.findByTestId("transaction-2");

        // Verifica conteúdo específico usando query dentro do item
        expect(incomeItem).toHaveTextContent("Salário");
        expect(incomeItem).toHaveTextContent("+ R$ 1000.00");

        expect(expenseItem).toHaveTextContent("Alimentação");
        expect(expenseItem).toHaveTextContent("- R$ 200.00");

        // Encontra o botão de excluir dentro do item da transação "Alimentação"
        const deleteButton = expenseItem.querySelector('button[aria-label="Excluir transação Alimentação"]');
        expect(deleteButton).toBeInTheDocument(); // Verifica que o botão existe
        fireEvent.click(deleteButton!); // Clica no botão específico

        // Aguarda a transação ser removida e o saldo atualizado
        await waitFor(() => {
            expect(screen.queryByTestId("transaction-2")).not.toBeInTheDocument();
            expect(screen.getByText("R$ 1000.00")).toBeInTheDocument();
        });
    });
});
