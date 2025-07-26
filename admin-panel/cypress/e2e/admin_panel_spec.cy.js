describe('Admin Panel Product Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // Adjust port if needed
  });

  it('should display the admin panel header', () => {
    cy.contains('Admin Panel - ShopEase').should('be.visible');
  });

  it('should add a new product', () => {
    cy.get('input[name="name"]').type('Cypress Test Product');
    cy.get('input[name="price"]').type('123');
    cy.get('textarea[name="description"]').type('Test description for Cypress');
    cy.get('input[type="file"]').attachFile('test-image.png'); // Requires cypress-file-upload plugin
    cy.contains('Add Product').click();
    cy.contains('Cypress Test Product').should('be.visible');
  });

  it('should edit an existing product', () => {
    cy.contains('Cypress Test Product').parent().within(() => {
      cy.contains('Edit').click();
    });
    cy.get('input[name="name"]').clear().type('Cypress Edited Product');
    cy.contains('Update Product').click();
    cy.contains('Cypress Edited Product').should('be.visible');
  });

  it('should delete a product', () => {
    cy.contains('Cypress Edited Product').parent().within(() => {
      cy.contains('Delete').click();
    });
    cy.contains('Cypress Edited Product').should('not.exist');
  });
});
