describe("Appointments", () => {
  beforeEach(() => {
    // Reset the database everytime we run as this test modifies the state
    return cy.request("GET", "/api/debug/reset")
      .then(() => {
        cy.visit("/");
        cy.contains("Monday");
      });

  });

  // Find the first Add button in the DOM and click it
  it("should book an interview", async () => {
    await cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Find the interviewer and click it
    cy.get('[alt="Sylvia Palmer"]').click();

    await cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", async () => {
    // Find the first Edit button in the DOM and click it
    cy.get("[alt=Edit]").first().click({ force: true });

    await cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    
    cy.get("[alt='Tori Malcolm']").click();
    // Find the save button and click it
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", async () => {
    // Force a click on the delete button overriding the hover state 
    await cy.get("[alt=Delete]").first().click({ force: true });
    // Find the confirm button in cancel state
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
