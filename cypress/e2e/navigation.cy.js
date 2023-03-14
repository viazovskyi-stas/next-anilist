describe('Search', () => {
    it('should navigate to the anime list page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('a[href*="/anime-list"]').first().click()
        cy.url().should('include', '/anime-list')
        cy.get('h2').contains('🚀 Anime list app')
    })
})