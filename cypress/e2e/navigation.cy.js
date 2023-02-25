describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    
    cy.get("li").contains( "Tuesday").click();
    cy.contains("li", "Tuesday").should("have.class", "day-list__item--selected");

    cy.contains("li", "Tuesday")
    .click()
    .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});