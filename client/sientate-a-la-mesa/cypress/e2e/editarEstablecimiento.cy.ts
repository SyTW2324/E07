describe('Registro de establecimiento', () => {

  it ('editar perfil de un restaurante', () => {
    cy.visit('http://localhost:5173')
    // hace click en boton de login
    cy.wait(5000)
    cy.get('#botonIniciarSesion').click()
    cy.get('#username').type('establecimientoPrueba')
    cy.get('#password').type('establecimientoPrueba1')
    cy.get('#loginButton').click()
    cy.get('#AbrirNavegacionPerfil').click()
    cy.get('#MiPerfilEstablecimiento').click()

    cy.get('#editarPerfilRestaurante').click()
    cy.get('.v-select').click();
    cy.contains('asador').click()  // Seleccionar la categoría deseada
    cy.get('#address').clear()
    cy.get('#address').type('Calle falsa 123 modificada')
    cy.get('#enviarRegistroEstablecimiento').click()

    cy.get('#InicioBoton').click()
    cy.get('#AbrirNavegacionPerfil').click()
    cy.get('#CerrarSesionBoton').click()


  });

})