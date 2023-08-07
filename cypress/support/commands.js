Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Luciana') //escreve o nome
    cy.get('#lastName').type('Rodrigues') //escreve o sobrenome
    cy.get('#email').type('lucianacornetet@gmail.com') //escreve o email
    cy.get('#open-text-area').type('Teste') //escreve o como podemos te ajudar
    cy.contains('button', 'Enviar').click() //aperta no botão enviar
})