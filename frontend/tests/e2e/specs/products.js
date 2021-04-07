describe("products test suite", () => {
  it("shows a list of products",() => {
    cy.login()
    cy.fixture('products.json')
    .then((products)=>{
      cy.get('[data-cy="products"] li').should("have.length",products.length)
    });
  })
})