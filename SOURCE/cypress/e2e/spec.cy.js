/* I this simple setup I will test the following:
1. that the page can be opened
2. Register a new user
3. Login with the new user
4. Logout
5. Unsuccessful login
6. Filter the category
7. Add item to cart
8. Check the cart values
9. Check the URLs
10. Check the error messages

*/
import selectors from '../pages/homePage';
describe('Open Page', () => {
  it('passes', () => {
    cy.visit(selectors.homePage);
    
  })
})

describe('register', () => {
  it('passes', () => {
    cy.visit(selectors.homePage);
    cy.get ('.panel > .header > :nth-child(3) > a').contains('Create an Account').click();
    cy.get(selectors.firstName).type('Koko');
    cy.get(selectors.lastName).type('Moko');
    cy.get(selectors.emailAddress).type('koko@moko.com');
    cy.get(selectors.passwordCreate).type('Ka33Pow!ssdfa');
    cy.get(selectors.passwordConfirmation).type('Ka33Pow!ssdfa');
    cy.get(selectors.createAccountButton).click();
  })
})

describe('succesiful login', () => {
  it('passes', () => {
    cy.visit(selectors.homePage);
    cy.get('.panel > .header > .authorization-link > a').click();
    cy.get(selectors.email).type('koko@moko.com');
    cy.get(selectors.password).type('Ka33Pow!ssdfa');
    cy.get (selectors.loginButton).click();
    cy.wait(100);
    cy.get(selectors.loggedIn).should('contain', 'Welcome, Koko Moko!');
    cy.get(selectors.accountDropdown).click();
    cy.get(selectors.logOut).click();
    cy.get(selectors.loggedIn).should('not.exist');    
  })})

  describe('unsuccesiful login', () => {
    it('passes', () => {
      cy.visit(selectors.homePage);
      cy.get('.panel > .header > .authorization-link > a').click();
      cy.get(selectors.email).type('koko@moko.com');
      cy.get(selectors.password).type('Ka33Pow!ss2345dfa');
      cy.get (selectors.loginButton).click();
      cy.wait(100);
      cy.get(selectors.errorMessage).should('contain', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
      
    })})


describe('filter category', () => {
  it('passes', () => {
    cy.visit('https://magento.softwaretestingboard.com');
    cy.get(selectors.categoryMan).click();
    cy.url().should('eq', 'https://magento.softwaretestingboard.com/men.html');
    cy.get(selectors.tops).click();
    cy.url().should('eq', 'https://magento.softwaretestingboard.com/men/tops-men.html');
  })
})

describe('add to cart', () => {
  it('passes', () => {
    cy.visit('https://magento.softwaretestingboard.com');
    cy.get(selectors.categoryMan).click();
    cy.url().should('eq', 'https://magento.softwaretestingboard.com/men.html');
   cy.get(selectors.tops).click();
   cy.url().should('eq', 'https://magento.softwaretestingboard.com/men/tops-men.html');
   cy.get (selectors.size).first().click();
   cy.get(selectors.addToCartButton).first().click({force: true});
   cy.url().should('eq', 'https://magento.softwaretestingboard.com/cassius-sparring-tank.html');
   cy.get(selectors.sizeProduct).click();
   cy.get(selectors.color).click();
   cy.get(selectors.addToCartButtonProduct).click({force: true});
   cy.get(selectors.cartItems).should('contain', '1');
  })})




