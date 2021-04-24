import "./functions"

describe('Cadastro', () => {
   // Como o cy.visit pode conter dados sensíveis a melhor forma é importar os dados de um arquivo config.json
   // beforeEach será o primeiro comando a ser executado em todos os "it"
    beforeEach(() => cy.visit(`${Cypress.env('baseUrl')}`));
    beforeEach(() => cy.VerificarCampos()); // Verifica se os campos estão visiveis e vazios
    // afterEach(() => cy.screenshot()); // Captura de Tela do caso de teste

    it('Realizando Cadastro com nome errado', () => { //Define o  caso de teste
        cy.get('#name').type(Cypress.env('user-erro')); // Busca o campo e importa a variável do arquivo config/qa
        cy.get('#email').type(Cypress.env('email2'));
        cy.get('#password').type(Cypress.env('pass2'));
        cy.get('#register').click(); // Executa o click
        cy.contains('Por favor, insira um nome completo.')
        .should('be.visible');  // Validação do campo
    });

    it('Realizando Cadastro com email errado', () => {
        cy.get('#name').type(Cypress.env('user2'));
        cy.get('#email').type(Cypress.env('email-erro'));
        cy.get('#password').type(Cypress.env('pass2'));
        cy.get('#register').click();
        cy.contains('Por favor, insira um e-mail válido.')
        .should('be.visible');
    });

    it('Realizando Cadastro com 1 caracter na senha', () => {
        cy.get('#name').type(Cypress.env('user2'));
        cy.get('#email').type(Cypress.env('email2'));
        cy.get('#password').type(Cypress.env('pass-erro'));
        cy.get('#register').click();
        cy.contains('A senha deve conter ao menos 8 caracteres.')
        .should('be.visible');
    });

    it('Realizando Cadastro com todos campos errados', () => {
        cy.get('#name').type(Cypress.env('user-erro'));
        cy.get('#email').type(Cypress.env('email-erro'));
        cy.get('#password').type(Cypress.env('pass-erro'));
        cy.get('#register').click();
        cy.contains('Por favor, insira um nome completo.')
        .should('be.visible');
        cy.contains('Por favor, insira um e-mail válido.')
        .should('be.visible');
        cy.contains('A senha deve conter ao menos 8 caracteres.')
        .should('be.visible');
    });

    it('Realizando Cadastro Corretamente', () => {
        cy.get('#name').type(Cypress.env('user2'));
        cy.get('#email').type(Cypress.env('email2'));
        cy.get('#password').type(Cypress.env('pass2'));
        cy.get('#register').click();
        cy.log('Novo usuário cadastro');
        cy.get('table')
        .should('be.visible')
        .contains('1').siblings(); // cy.get('table') seleciona o elemento ancora (tabela) e o siblings seleciona os elementos irmãos
    });

    it('Realizando Cadastro Corretamente e excluindo o usuário', () => {
        cy.get('#name').type(Cypress.env('user2'));
        cy.get('#email').type(Cypress.env('email2'));
        cy.get('#password').type(Cypress.env('pass2'));
        cy.get('#register').click();
        cy.log('Novo usuário cadastro');
        cy.get('#name').type(Cypress.env('user3'));
        cy.get('#email').type(Cypress.env('email3'));
        cy.get('#password').type(Cypress.env('pass3'));
        cy.get('#register').click();
        cy.log('Novo usuário cadastro');
        cy.get('table')
        .should('be.visible')
        .contains('1').siblings().eq(0).next(); // cy.get('table') pega o elemento ancora (tabela),
                                                // siblings pega os elementos irmãos, "eq" seleciona um campo e o 
                                                //next seleciona o próximo
        cy.get('#removeUser1').click();
        cy.get('table')
        .contains('2').should('be.visible');

    });
});