/// <reference types = "cypress"/>
import '@4tw/cypress-drag-drop'

describe('Criando suite de teste para o site computer-database', () => {

    function criarPC() {
        let nome = Math.floor(Math.random() * 10000) + 1000
        let data1 = (Math.floor(Math.random() * 16)) + 2000 + '-0' + (Math.floor(Math.random() * 9) + 1) + '-' + (Math.floor(Math.random()*20) + 10)
        let data2 = (Math.floor(Math.random() * 3)) + 2016 + '-0' + (Math.floor(Math.random() * 9) + 1) + '-' + (Math.floor(Math.random()*20) + 10)

        cy.visit('https://computer-database.gatling.io/computers')
        cy.get('#add').click()
        cy.get('#name').type(nome)
        cy.get('#introduced').type(data1)
        cy.get('#discontinued').type(data2)
        cy.get('#company').select(1)
    }

    it('clicando no botão Add a new computer', () => {
        cy.visit('https://computer-database.gatling.io/computers')
        cy.get('#add').click()
        cy.get('#main > h1').should('exist')
        cy.get('#main > h1').should('contain.text', 'Add a computer')
    })

    it('Criando um computador com sucesso', () => {
        
        criarPC()

        cy.get('.primary').click()
        cy.get('.alert-message').should('exist')
    })

    it('Criando um computador sem nome', () => {
        cy.visit('https://computer-database.gatling.io/computers')
        cy.get('#add').click()
        cy.get('#introduced').type('2006-04-19')
        cy.get('#discontinued').type('2007-04-29')
        cy.get('#company').select(1)
        cy.get('.primary').click()
        cy.get('.error > .input > .help-inline').should('contain.text', 'Failed to refine type : Predicate isEmpty() did not fail')
    })

    it('Deletando um computador', () => {
        cy.visit('https://computer-database.gatling.io/computers')
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
        cy.get('.topRight > .btn').click({force: true})
        cy.get('.alert-message').should('contain.text', 'Computer ACE has been deleted')
    })
})