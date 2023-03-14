describe('Navigation', () => {
    it('should navigate to the anime list page', () => {
        cy.visit('http://localhost:3000/anime-list')
        cy.get('input[name="search"]').first().click().type('Attack on Titan')
        cy.get('button[id="search-submit-button"]').click()
        cy.get('h2').contains('Attack on Titan Season 3').should('exist')
    })
})