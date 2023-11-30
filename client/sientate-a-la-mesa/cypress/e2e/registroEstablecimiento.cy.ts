import axios from 'axios';
import { baseUrl } from '../../src/env/env-variables';

describe('Registro de establecimiento', () => {
  beforeEach(() => {
    const user = {
      restaurantName: "Peter's Pizza", // "Ismael's Pizza"
      restaurantAddress: "Calle Falsa 123",
      description: "Pizzeria de Peter",
      category: "pizzeria",
      email: "peter@email.com",
      phone: "666666666",
      timeTable: [],
      menu: [],
      userName: "peter",
      passwd: "peter200A",
      
      
    }
    
    const userDelete = {
      userName: "peter",
      password: "peter200A"
    }
    const reponse = axios.delete(`${baseUrl}/users`);    
  })
//     // header 
    
//   })
  it('Registro de establecimiento', () => {
    cy.visit('http://localhost:5173')

    // hace click en boton de login
    cy.get('#botonRegistro').click()
    cy.get('#botonRegistroEstablecimiento').click()

    cy.get('#restaurantname').type('Establecimiento de prueba')
    cy.get('#address').type('Calle falsa 123')
    cy.get('#description').type('Establecimiento de prueba, nueva descripcion')
    
    // ? checklist pendiente
    // Suponiendo que los días de la semana son: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    const selectedDays = ['Lunes', 'Miércoles', 'Viernes'];
    // Iterar sobre los días de la semana y marcarlos en el formulario
    selectedDays.forEach(day => {
    cy.contains(day).click();
    });

    // ? hora inicio pendiente
    cy.get('label:contains("Hora de inicio") + input[type="time"]').type('09:00');
    
    // ? hora fin pendiente
    cy.get('label:contains("Hora de finalización") + input[type="time"]').type('18:00');
    
    
    cy.get('#category').select('pizzeria')
    cy.get('#email').type('establecimientoPrueba@gmail')
    cy.get('#phone').type('666666666')
    cy.get('#username').type('establecimientoPrueba')
    cy.get('#password').type('establecimientoPrueba')

    // ? fotos pendiente


    // ? pdf menú


    //  ? franja elegir hora pendiente


    
    cy.get('#numberOfPeople').type('4')
   
    cy.get('#enviarRegistroEstablecimiento').click()

  })
})