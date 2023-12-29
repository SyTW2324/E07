// import axios from 'axios';
// import { baseUrl } from '../../src/env/env-variables';

// describe('Registro de usuario', () => {
//   beforeEach(async () => {
    
//     const userDelete = {
//       userName: "peter",
//     }
    
//     const response = await axios.delete(`${baseUrl}users?userName=${userDelete.userName}`);    
    

//   })

//   it('Registro de usuario', () => {
    
//     cy.visit('http://localhost:5173')
//     cy.get('#botonRegistro').click()
//     cy.get('#botonRegistroUsuario').click()
//     cy.get('#firstname').type('Peter')
//     cy.get('#lastname').type('parker')
//     cy.get('#email').type('alu@gmail.com')
//     cy.get('#phone').type('999887766')
//     cy.get('#username').type('peter')
//     cy.get('#password').type('peter200A')
//     cy.get('#address').type('Calle falsa 123')
//     cy.get('#enviarRegistroUsuario').click()

//   })
// })