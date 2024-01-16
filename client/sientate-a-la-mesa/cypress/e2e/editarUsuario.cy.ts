describe('Editar el perfil de un usuario', () => {

  it ('editar perfil de un restaurante', () => {
    cy.visit('http://localhost:5173')
    // hace click en boton de login
    cy.wait(5000)

    cy.get('#botonIniciarSesion').click()
    cy.get('#username').type('peter')
    cy.get('#password').type('peter200A')
    cy.get('#loginButton').click()


    cy.get('#AbrirNavegacionPerfil').click()
    cy.get('#MiPerfilUsuario').click()

    cy.get('#editarPerfilUsuario').click()
    cy.get('#address').clear()
    cy.get('#address').type('Calle falsa 123 modificada')
    cy.get('#phone').clear()
    cy.get('#phone').type('822123456')
    cy.get('#enviarRegistroUsuario').click()

    cy.wait(3000)
    cy.get('#InicioBoton2').click()
    cy.get('#AbrirNavegacionPerfil').click()
    cy.get('#CerrarSesionBoton').click()


  });

})