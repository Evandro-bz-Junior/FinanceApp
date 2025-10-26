"use client";

type Props = {
    selectedType: string;
    setSelectedType: (type: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: string[];
};

export default function TransactionFilter({
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    categories,
}: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
            {/* Filtrar por tipo */}
            <select
                data-testid="filter-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-black rounded px-3 py-2 "
            >
                <option value="all">Todos os tipos</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
            </select>

            {/* Filtrar por categoria */}
            <select
                data-testid="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-black rounded px-3 py-2"
            >
                <option value="all">Todas as categorias</option>
                {categories.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
        </div>
    );
}
