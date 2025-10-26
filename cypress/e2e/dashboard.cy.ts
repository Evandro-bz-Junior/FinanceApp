describe("Dashboard", () => {
    beforeEach(() => {
        // Mock do usuário logado
        cy.window().then((win) => {
            win.localStorage.setItem(
                "loggedUser",
                JSON.stringify({
                    name: "João Teste",
                    email: "joao@teste.com",
                    password: "123",
                })
            );
        });

        // Acessa diretamente o dashboard
        cy.visit("http://localhost:3000/dashboard");
    });

    it("exibe erro ao tentar adicionar transação sem preencher campos", () => {
        cy.get('input[value="income"]').click();
        cy.contains("Adicionar").click();
        cy.contains("Preencha todos os campos").should("be.visible");
    });

    it("Permite adicionar e excluir transações corretamente", () => {
        // 🟢 Verifica se o título foi renderizado
        cy.contains("Dashboard").should("be.visible");

        // ➕ Adiciona Receita
        cy.get('input[value="income"]').click();
        cy.get('input[placeholder="Categoria (ex: Alimentação)"]').type("Salário");
        cy.get('input[placeholder="Valor"]').type("1000");
        cy.get('input[type="date"]').type("2025-10-30");
        cy.contains("Adicionar").click();

        // Espera a transação aparecer
        cy.contains("Salário").should("be.visible");
        cy.contains("+ R$ 1000.00").should("be.visible");
        cy.contains("R$ 1000.00").should("be.visible");

        // ➖ Adiciona Despesa
        cy.get('input[value="expense"]').click();
        cy.get('input[placeholder="Categoria (ex: Alimentação)"]').clear().type("Alimentação");
        cy.get('input[placeholder="Valor"]').clear().type("500");
        cy.get('input[type="date"]').clear().type("2025-10-30");
        cy.contains("Adicionar").click();

        // Verifica a despesa
        cy.contains("Alimentação").should("be.visible");
        cy.contains("- R$ 500.00").should("be.visible");
        cy.contains("R$ 500.00").should("be.visible");

        // 🗑️ Exclui transação de despesa
        cy.get('button[aria-label="Excluir transação Alimentação"]').should("exist").click();

        // Confirma remoção
        cy.contains("Alimentação").should("not.exist");
        cy.contains("- R$ 500.00").should("not.exist");

        // 🧮 Verifica saldo final (voltou para 1000)
        cy.contains("R$ 1000.00").should("be.visible");
    });

    it("Permite Filtrar por categoria e por tipode transações corretamente", () => {

        // ➕ Adiciona Receita
        cy.get('input[value="income"]').click();
        cy.get('input[placeholder="Categoria (ex: Alimentação)"]').type("Salário");
        cy.get('input[placeholder="Valor"]').type("1000");
        cy.get('input[type="date"]').type("2025-10-30");
        cy.contains("Adicionar").click();

        cy.get('input[value="income"]').click();
        cy.get('input[placeholder="Categoria (ex: Alimentação)"]').type("Comissão");
        cy.get('input[placeholder="Valor"]').type("500");
        cy.get('input[type="date"]').type("2025-10-30");
        cy.contains("Adicionar").click();

        // Espera a transação aparecer
        cy.contains("Salário").should("be.visible");
        cy.contains("+ R$ 1000.00").should("be.visible");
        cy.contains("Comissão").should("be.visible");
        cy.contains("+ R$ 500.00").should("be.visible");
        cy.get('#balance').contains("R$ 1500.00").should("be.visible");

        // ➖ Adiciona Despesa
        cy.get('input[value="expense"]').click();
        cy.get('input[placeholder="Categoria (ex: Alimentação)"]').clear().type("Alimentação");
        cy.get('input[placeholder="Valor"]').clear().type("500");
        cy.get('input[type="date"]').clear().type("2025-10-31");
        cy.contains("Adicionar").click();

        cy.get('input[value="expense"]').click();
        cy.get('input[placeholder="Categoria (ex: Alimentação)"]').clear().type("Combustivel");
        cy.get('input[placeholder="Valor"]').clear().type("300");
        cy.get('input[type="date"]').clear().type("2025-10-31");
        cy.contains("Adicionar").click();

        // Verifica a despesa
        cy.contains("Alimentação").should("be.visible");
        cy.contains("- R$ 500.00").should("be.visible");
        cy.contains("Combustivel").should("be.visible");
        cy.contains("- R$ 300.00").should("be.visible");
        cy.get('#balance').contains("R$ 700.00").should("be.visible");

        // Filtra por receita
        cy.get('[data-testid="filter-type"]').select('income');
        cy.contains("Salário").should("be.visible");
        cy.contains("+ R$ 1000.00").should("be.visible");
        cy.contains("Comissão").should("be.visible");
        cy.contains("+ R$ 500.00").should("be.visible");
        

        // Filtra por despesa
        cy.get('[data-testid="filter-type"]').select('expense');
        cy.contains("Alimentação").should("be.visible");
        cy.contains("- R$ 500.00").should("be.visible");
        cy.contains("Combustivel").should("be.visible");
        cy.contains("- R$ 300.00").should("be.visible");

        // Filtra por categoria
        cy.get('[data-testid="filter-type"]').select('all');

        cy.get('[data-testid="filter-category"]').select('Alimentação');
        cy.contains("Alimentação").should("be.visible");
        cy.contains("- R$ 500.00").should("be.visible");

        cy.get('[data-testid="filter-category"]').select('Combustivel');
        cy.contains("Combustivel").should("be.visible");
        cy.contains("- R$ 300.00").should("be.visible");

        cy.get('[data-testid="filter-category"]').select('Comissão');
        cy.contains("Comissão").should("be.visible");
        cy.contains("+ R$ 500.00").should("be.visible");
        
        cy.get('[data-testid="filter-category"]').select('Salário');
        cy.contains("Salário").should("be.visible");
        cy.contains("+ R$ 1000.00").should("be.visible");
    });

    it("mantém as transações após recarregar a página", () => {

        cy.get('input[value="income"]').click();
        cy.get('input[placeholder="Categoria (ex: Alimentação)"]').type("Salário");
        cy.get('input[placeholder="Valor"]').type("1000");
        cy.get('input[type="date"]').type("2025-10-30");
        cy.contains("Adicionar").click();

        // recarrega a página
        cy.reload();

        cy.contains("Salário").should("be.visible");
        cy.contains("+ R$ 1000.00").should("be.visible");
    });

    it("realiza logout corretamente", () => {
        cy.contains("Sair").click();
        cy.url().should("include", "/login");
        cy.window().its("localStorage.loggedUser").should("not.exist");
    });

});
