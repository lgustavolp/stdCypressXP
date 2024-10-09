describe('Setup', () => {
    
    before(() => {
        //from mongoDb
        cy.dropCollection('orphanages')
      })

      it('drop succesfully', () => {
        cy.log('Drop Succesfully!')
      })

})