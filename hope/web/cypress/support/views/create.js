

Cypress.Commands.add('goToCreate', (position) => {
    cy.goto('/orphanages/create', position.latitude, position.longitude)

    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro')
})

Cypress.Commands.add('createOrphanage', (orphanage) => {

    cy.SetMapPosition(orphanage.position)

    cy.get('input[name=name]').as('fieldName')
    cy.get('#description').as('fieldDesc')
    cy.get('input[type=file]').as('fieldImage')
    cy.get('#opening_hours').as('fieldOpenHours')

    //the same code is used below using just 1 line
    // if (orphanage.name) {
    //     cy.get('@fieldName')
    //         .type(orphanage.name)
    // } else{
    //     cy.log('Empty field name')
    // }
    
    // cy.get('#description')
    //     .type(orphanage.description)

    // cy.get('input[type=file]').
    //     selectFile('cypress/fixtures/images/' + orphanage.image, { force: true })

    // cy.get('#opening_hours')
    //     .type(orphanage.opening_hours)

    orphanage.name ? 
        cy.get('@fieldName').type(orphanage.name) : 
        cy.log('Empty field name')
    orphanage.description ? 
        cy.get('@fieldDesc').type(orphanage.description) : 
        cy.log('Empty field description')
    orphanage.image ? 
        cy.get('@fieldImage').selectFile('cypress/fixtures/images/' + orphanage.image, { force: true }) : 
        cy.log('Empty field image')
    orphanage.opening_hours ? 
        cy.get('@fieldOpenHours').type(orphanage.opening_hours) : 
        cy.log('Empty field opening hours')

    cy.contains('button', orphanage.open_on_weekends ? "Sim" : "Não")
        .click()

    cy.get('.save-button').click()

})