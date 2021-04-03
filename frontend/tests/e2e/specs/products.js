describe("products test suite", () => {
  it("shows a list of products", () => {
    cy.login()
    cy.get('[data-cy="products"] li').should("have.length",1)
  })
})