describe("Login", () => {
  it("permite login e navega para o dashboard", () => {
    cy.visit("http://localhost:3000/login");
    
    cy.get('input[id="email"]').type("evandrobzjr@gmail.com");
        cy.get('input[id="password"]').type("123");
        cy.contains("Entrar").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard").should("be.visible");
    cy.contains("João Teste").should("be.visible");
  });
});
