describe("login test suite", () => {
  it("does not work with wrong credentials", () => {
    cy.visit("/");
    
    cy.get("[data-cy=username]").type("info");
    cy.get("[data-cy=password]").type("visitor");
    cy.get("[data-cy=login-btn]").click();

    cy.location("pathname").should("equal", "/");
  })
   it("does work with valid credentials", () => {
    cy.login();
    cy.location("pathname").should("equal", "/productos");
   });
})