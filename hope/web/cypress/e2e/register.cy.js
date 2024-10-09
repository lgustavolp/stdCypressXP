import createPage from '../support/pages/create/index'
import mapPage from '../support/pages/map'

import data from '../fixtures/orphanages.json'

import { generator } from '../support/factory'

describe('Orphanage registration', () => {

  it('Should register a new orphanage', () => {

    const orphanage = generator()

    //cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

    cy.log(JSON.stringify(orphanage))

    cy.goToCreate(orphanage.position)
    cy.createOrphanage(orphanage)
    cy.popupHaveText('Orfanato cadastrado com sucesso.')

  })

  it('Shouldnt register with duplicated name', () => {

    //Take the info from orphanages.json
    //const orphanage = data.duplicate
    const orphanage = generator()

    cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
    cy.postOrphanage(orphanage)

    cy.goToCreate(orphanage.position)
    cy.createOrphanage(orphanage)
    cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)

  })

  context('Required Fields', () => {
    it('Shouldnt register if the name is not filled in', () => {

      let orphanage = generator()

      delete orphanage.name

      cy.goToCreate(orphanage.position)
      cy.createOrphanage(orphanage)

      cy.alertHaveText('Nome', 'Campo obrigatório')

    })

    it('Shouldnt register if the description is not filled in', () => {

      let orphanage = generator()

      delete orphanage.description

      cy.goToCreate(orphanage.position)
      cy.createOrphanage(orphanage)

      cy.alertHaveText('Sobre', 'Campo obrigatório')
    })

    it('Shouldnt register if the Foto is not loaded in', () => {

      let orphanage = generator()

      delete orphanage.image

      cy.goToCreate(orphanage.position)
      cy.createOrphanage(orphanage)

      cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')

    })

    it('Shouldnt register if the Open Hour is not filled in', () => {

      let orphanage = generator()

      delete orphanage.opening_hours

      cy.goToCreate(orphanage.position)
      cy.createOrphanage(orphanage)

      cy.alertHaveText('Horário', 'Campo obrigatório')

    })

    it('Shouldnt register if All the required fields are not filled in', () => {

      let orphanage = generator()

      delete orphanage.name
      delete orphanage.description
      delete orphanage.opening_hours
      delete orphanage.image

      cy.goToCreate(orphanage.position)
      cy.createOrphanage(orphanage)

      cy.alertHaveText('Nome', 'Campo obrigatório')
      cy.alertHaveText('Sobre', 'Campo obrigatório')
      cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')
      cy.alertHaveText('Horário', 'Campo obrigatório')

    })
  })
})