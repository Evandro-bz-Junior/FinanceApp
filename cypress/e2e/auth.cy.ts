describe("Fluxo completo de autenticação", () => {
    beforeEach(() => {

        cy.visit("http://localhost:3000/");

    });

    it("realiza registro e depois login com sucesso", () => {

        cy.contains("Criar conta").click();
        cy.get('input[id="name"]').type("João Teste");
        cy.get('input[id="email"]').type("joao@teste.com");
        cy.get('input[id="password"]').type("123");
        cy.contains("Registrar").click();
        cy.window().then((win) => {
            win.localStorage.setItem(
                "loggedUser",
                JSON.stringify({ name: "João Teste", email: "joao@teste.com", password: "123" })
            );
        });

        cy.visit("http://localhost:3000/login");
        cy.get('input[id="email"]').type("joao@teste.com");
        cy.get('input[id="password"]').type("123");
        cy.contains("Entrar").click();

        cy.url().should("include", "/dashboard");;
        cy.contains("Dashboard").should("be.visible");
    });
});
