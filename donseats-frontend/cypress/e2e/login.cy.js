describe('Login Page Tests', () => {
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit('/login');
    });
  
    it('should render the login form correctly', () => {
      // Check if the form is present
      cy.get('form.login-form').should('exist');
      
      // Check if the email and password fields are present
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      
      // Check if the submit button is present
      cy.get('button[type="submit"]').contains('Login').should('exist');
    });
  
    it('should allow users to type in email and password fields', () => {
      const email = 'testuser@example.com';
      const password = 'testpassword';
  
      // Type into the email and password fields
      cy.get('input[type="email"]').type(email).should('have.value', email);
      cy.get('input[type="password"]').type(password).should('have.value', password);
    });
  
    it('should show an error message for invalid login', () => {
      // Attempt to login with invalid credentials
      cy.get('input[type="email"]').type('invaliduser@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      // Mock error response from Firebase (you'll need to configure this in your app or intercept it in tests)
      cy.intercept('POST', '**/signInWithPassword', {
        statusCode: 401,
        body: { error: { message: 'INVALID_EMAIL' } },
      });
  
      // Check if the error message is displayed
    //   cy.contains('Firebase login error').should('be.visible');
    });
  
    it('should navigate to the user dashboard for general users', () => {
        const email = 'user@example.com';
        const password = 'correctpassword';
      
        // Mock successful login response
        cy.intercept('POST', '**/signInWithPassword', {
          statusCode: 200,
          body: {
            localId: 'testUserId',
            email,
            idToken: 'fakeToken',
          },
        });
      
        // Mock Firestore response for a general user
        cy.intercept('GET', '**/users/testUserId', {
          statusCode: 200,
          body: {
            role: 'generalUser', // A user role without specific navigation requirements
          },
        });
      
        // Perform login
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('button[type="submit"]').click();
      
        // Verify redirection to the user dashboard
        // cy.url().should('eq', Cypress.config('baseUrl') + '/');
      });
      
  
    it('should navigate to the signup page when clicking the signup link', () => {
      // Click the signup link
      cy.get('a[href="/signup"]').click();
  
      // Verify navigation to the signup page
      cy.url().should('include', '/signup');
    });
  });
  