import Home from '../Home.vue'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Home)
  })
  // cypress/integration/homepage.spec.js

  it('Verifica el botón de Iniciar sesión', () => {
    cy.mount(Home);

    cy.get('.my-custom-card-home').should('be.visible');
    
  });

  it('Renderizado mensaje de bienvenida', () => {
    cy.mount(Home);
    cy.contains('Bienvenido a sientate a la mesa').should('exist');
  });

  it('Se verifica botón de iniciar sesión "Iniciar sesión"', () => {
    cy.mount(Home);
    cy.contains('Iniciar sesión').should('exist');
    cy.contains('Iniciar sesión').click();

  });

  it('Verificar botón de "Registrate"', () => {
    cy.mount(Home);
    cy.contains('Registrate').should('exist');
    cy.contains('Registrate').click();
  });

})