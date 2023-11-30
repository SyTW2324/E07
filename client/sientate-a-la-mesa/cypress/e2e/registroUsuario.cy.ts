import axios from 'axios';
import { baseUrl } from '../../src/env/env-variables';

describe('Registro de usuario', () => {
  beforeEach(() => {
    const user = {
      name: "Peter", // "Ismael"
      surname: "parker", // "Hernández"
      userName: "peter", // "imh22"
      password: "peter200A", // "isma200A"
      email: "alu@gmail.com",
      phoneNumber: "666666666",
      address: "Calle falsa 123",
      profilePhoto: null
    }
    
    const userDelete = {
      userName: "peter",
      password: "peter200A"
    }
    
    const response = axios.delete(`${baseUrl}/users`, {data: userDelete})    
    

  })

  it('Registro de usuario', () => {
    
      cy.visit('http://localhost:5173')
      cy.get('#botonRegistro').click()
      cy.get('#botonRegistroUsuario').click()
      cy.get('#firstName').type('Peter')
      cy.get('#lastName').type('parker')
      cy.get('#userName').type('peter')
      cy.get('#password').type('peter200A')
      cy.get('#email').type('alu@gmail')
      cy.get('#phoneNumber').type('666666666')
      cy.get('#address').type('Calle falsa 123')
      cy.get('#enviarRegistroUsuario').click()

  })
})