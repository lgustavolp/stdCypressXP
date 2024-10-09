import data from '../fixtures/orphanages.json'

describe('map', () => {
    it('should be able to choose an orphanage on the map', () => {
        const orphanage = data.map

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        cy.postOrphanage(orphanage)

        cy.openOrphanage(orphanage.name)

        cy.contains('h1', orphanage.name)
            .should('be.visible')

        cy.googleMapLink(orphanage.position)

    })
})

