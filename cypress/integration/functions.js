Cypress.Commands.add('Login', () => {
    cy.visit(`${Cypress.env('baseUrl')}`);
        cy.on('uncaught:exception', (err, runnable) => {
            done()
        })
        cy.get('input[name="email"]').type(Cypress.env('user2'));
        cy.get('input[name="password"]').type(Cypress.env('pass2'));
        cy.get('.hidden-xs').click();
});
Cypress.Commands.add('VerificarCampos', () => {
    cy.get('#name').should('be.empty');
    cy.get('#email').should('be.empty');
    cy.get('#password').should('be.empty');
    cy.get('#register').should('be.visible');
});
