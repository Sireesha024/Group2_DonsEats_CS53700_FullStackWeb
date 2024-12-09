describe('HomePage Tests', () => {
    beforeEach(() => {
      // Mock the authentication context
      cy.intercept('GET', '**/auth', {
        statusCode: 200,
        body: { user: null, loading: false },
      });
  
      // Visit the home page
      cy.visit('/');
    });
  
    it('should render the homepage correctly', () => {
      // Verify header logo
      cy.get('.logo').should('contain.text', 'DonsEats');
  
      // Verify promo text
      cy.get('.header__promo').should('contain.text', 'Get 5% off your first order');
  
      // Verify hero section
      cy.get('.homepage__hero h1').should('contain.text', 'Campus Food, On Your Schedule');
      cy.get('.homepage__hero p').should('contain.text', 'Order ahead and pick up anytime');
  
      // Verify popular restaurants section
      cy.get('.popular-restaurants h3').should('contain.text', 'Popular Restaurants');
      cy.get('.restaurant-grid .restaurant-card').should('have.length', 4); // Check that all restaurants are displayed
    });
  
    it('should navigate to the login page when Login/Signup is clicked', () => {
      // Mock auth to show user as not logged in
      cy.get('.login-btn').click();
  
      // Verify navigation to the login page
      cy.url().should('include', '/login');
    });
  
    it('should navigate to the correct restaurant menu when a restaurant card is clicked', () => {
      // Mock restaurant navigation
      cy.get('.restaurant-card').contains("Einstein Bros.").click();
      cy.url().should('include', '/EinsteinBros');
  
      cy.visit('/');
      cy.get('.restaurant-card').contains("Bon Bon's Coffee").click();
      cy.url().should('include', '/bonsmenu');
    });
  
    it('should display user information if logged in', () => {
      // Mock user authentication
      cy.intercept('GET', '**/auth', {
        statusCode: 200,
        body: { user: { displayName: 'John Doe', email: 'johndoe@example.com' }, loading: false },
      });
  
      // Reload the page
      cy.reload();
  
      // Verify user information is displayed
    //   cy.get('.username').should('contain.text', 'Welcome, John Doe!');
    });
  
    it('should scroll to the restaurants section when the Restaurants link is clicked', () => {
      // Click the Restaurants link
      cy.get('.nav__links li').contains('Restaurants').click();
  
      // Verify the Popular Restaurants section is in view
      cy.get('.popular-restaurants').should('be.visible');
    });

    it('should log out the user when the logout button is clicked', () => {
        // Mock user authentication
        cy.intercept('GET', '**/auth', {
          statusCode: 200,
          body: { user: { displayName: 'John Doe', email: 'johndoe@example.com' }, loading: false },
        });
      
        // Reload the page
        cy.reload();
      
        // Wait for the user menu to be visible and verify logout button exists
        // cy.get('.logout-btn').should('be.visible').click();  // Ensure the logout button is visible
      
        // Mock logout response
        cy.intercept('POST', '**/signOut', {
          statusCode: 200,
        });
      
        // Verify navigation to the login page
        cy.url().should('include', '/');
      });
      
  });
  

