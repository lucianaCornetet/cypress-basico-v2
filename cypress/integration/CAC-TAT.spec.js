/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() { //switch do teste, primeiro argumento é um texto com a descrição do teste, o segundo argumento é uma função de callback
    beforeEach(function() {
        cy.visit('./src/index.html') //visita a url
    })

    //exercício seção 3
    it('verifica o título da aplicação', function() { //teste case, primeiro argumento descrição do teste, segundo argumento função de callback
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') //busca o título daa função, depois faz a verificação
    })

    //exercício extra 1 seção 3
    it('preenche os campos obrigatórios e envia o formulário', function() {
        //string longa para teste do delay no campo como podemos ajudar
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        
        cy.get('#firstName').type('Luciana') //escreve o nome
        cy.get('#lastName').type('Rodrigues') //escreve o sobrenome
        cy.get('#email').type('lucianacornetet@gmail.com') //escreve o email
        cy.get('#open-text-area').type(longText, {delay : 0}) //escreve o como podemos te ajudar, preenchendo rapidamente devido ao delay ser igual a zero
        cy.contains('button', 'Enviar').click() //aperta no botão enviar

        cy.get('.success').should('be.visible') //verifica se foi validada e se está visivel
    })

    //exercício extra 2 seção 3
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Luciana') //escreve o nome
        cy.get('#lastName').type('Rodrigues') //escreve o sobrenome
        cy.get('#email').type('lucianacornetetgmail.com') //escreve o email
        cy.get('#open-text-area').type('Teste') //escreve o como podemos te ajudar
        cy.contains('button', 'Enviar').click() //aperta no botão enviar

        cy.get('.error').should('be.visible')
    })

    //exercício extra 3 seção 3
    it('campo telefone continua vazio se o valor for não-numérico', function(){

        cy.get('#phone')
        .type('um dois tres quatro')
        .should('have.value', '')

    })

    //exercício extra 4 seção 3
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Luciana') //escreve o nome
        cy.get('#lastName').type('Rodrigues') //escreve o sobrenome
        cy.get('#email').type('lucianacornetet@gmail.com') //escreve o email
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste') //escreve o como podemos te ajudar
        cy.contains('button', 'Enviar').click() //aperta no botão enviar

        cy.get('.error').should('be.visible')
    })
     
    //exercício extra 5 seção 3
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName') //escreve o nome
            .type('Luciana')
            .should('have.value', 'Luciana')
            .clear()
            .should('have.value', '') 
        cy.get('#lastName') //escreve o sobrenome
            .type('Rodrigues')
            .should('have.value', 'Rodrigues')
            .clear()
            .should('have.value', '') 
        cy.get('#email') //escreve o email
            .type('lucianacornetet@gmail.com')
            .should('have.value', 'lucianacornetet@gmail.com')
            .clear()
            .should('have.value', '') 
        cy.get('#phone') //escreve o telefone
            .type('991445000')
            .should('have.value', '991445000')
            .clear()
            .should('have.value', '')
    })

    //exercício extra 6 seção 3
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click() //aperta no botão enviar

        cy.get('.error').should('be.visible') //exibe mensagem de erro
    })

    //exercício extra 7 seção 3
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible') //verifica se foi validada e se está visivel
    })

    //exercício seção 4
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')//nome
          .should('have.value', 'youtube')
    })

    //exercício 1 seção 4
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select('mentoria')//valor
          .should('have.value', 'mentoria')
    })

    //exercício 2 seção 4
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
          .select(1)//indíce
          .should('have.value', 'blog')
    })

    //exercício seção 5
    it('marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    //exercício extra seção 5
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')//retorna mais de um elemento
          .should('have.length', 3)//verificação intermediária para a quantidade de elementos
          .each(function($radio){ //passa por cada um dos elementos, a função recebe cada um dos elementos
            cy.wrap($radio).check()//empacota os elementos e manda comandos
            cy.wrap($radio).should('be.checked')//verifica se foi marcado
          })
    })

    //exercício seção 6
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
        //cy.get('input[type=checkbox]').last().should('not.be.checked')
    })

    //exercício extra seção 6
    //troca do .click por .check no exercício extra 4 seção 3

    //exercício seção 7
    it('seleciona um arquivo da pasta fixtures', function(){
        //cy.get('input[type="file"]#file-upload') pode usar o id file-upload para ser mais expecifico, ou se tiver mais de uma opção do mesmo tipo
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    //exercício extra 1 seção 7
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //entre {} é a option
          .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    //exercício extra 2 seção 7
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('example')
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('@example') 
          .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    //exercício seção 8
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank') //verifica se tem o atributo target com valor _blank, a maioria dos navegadores usa esse atributo e valor
    })

    //exercício extra 1 seção 8
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    //exercício extra 2 - desafio seção 8
    it('testa a página da política de privacidade de forma independente', function(){
      cy.visit('./src/privacy.html')
        
      cy.contains('Talking About Testing').should('be.visible')
    })
}) 