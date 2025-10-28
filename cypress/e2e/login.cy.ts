describe("Login", () => {
  beforeEach(() => {
    // Visita uma rota inicial qualquer
    cy.visit("http://localhost:3000");

    // Só então seta o localStorage
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
  });

  it("permite login e navega para o dashboard", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.contains("Dashboard").should("be.visible"); 
  });
});
