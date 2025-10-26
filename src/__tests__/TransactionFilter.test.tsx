import { render, screen, fireEvent } from "@testing-library/react";
import TransactionFilter from "@/components/TransactionFilter";

describe("TransactionFilter", () => {
    const setTypeMock = jest.fn();
    const setCategoryMock = jest.fn();
    const categories = ["Salário", "Alimentação"];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza filtros corretamente", () => {
        render(
            <TransactionFilter
                selectedType="all"
                setSelectedType={setTypeMock}
                selectedCategory="all"
                setSelectedCategory={setCategoryMock}
                categories={categories}
            />
        );

        expect(screen.getByDisplayValue("Todos os tipos")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Todas as categorias")).toBeInTheDocument();
        expect(screen.getByText("Salário")).toBeInTheDocument();
        expect(screen.getByText("Alimentação")).toBeInTheDocument();
    });

    it("chama setSelectedType ao mudar tipo", () => {
        render(
            <TransactionFilter
                selectedType="all"
                setSelectedType={setTypeMock}
                selectedCategory="all"
                setSelectedCategory={setCategoryMock}
                categories={categories}
            />
        );

        const selectType = screen.getByDisplayValue("Todos os tipos");
        fireEvent.change(selectType, { target: { value: "income" } });

        expect(setTypeMock).toHaveBeenCalledWith("income");
    });

    it("chama setSelectedCategory ao mudar categoria", () => {
        render(
            <TransactionFilter
                selectedType="all"
                setSelectedType={setTypeMock}
                selectedCategory="all"
                setSelectedCategory={setCategoryMock}
                categories={categories}
            />
        );

        const selectCategory = screen.getByDisplayValue("Todas as categorias");
        fireEvent.change(selectCategory, { target: { value: "Alimentação" } });

        expect(setCategoryMock).toHaveBeenCalledWith("Alimentação");
    });
});
