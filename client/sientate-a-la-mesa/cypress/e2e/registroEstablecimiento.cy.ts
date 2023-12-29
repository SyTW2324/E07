// import axios from 'axios';
// import { baseUrl } from '../../src/env/env-variables';

// describe('Registro de establecimiento', () => {
//   beforeEach(async () => {
    
//     const userDelete = {
//       userName: "establecimientoPrueba",
//     }
    
//     const response = await axios.delete(`${baseUrl}restaurants?userName=${userDelete.userName}`);    
    
//   })

    

//   it('Registro de establecimiento', () => {
//     cy.visit('http://localhost:5173')

//     // hace click en boton de login
//     cy.get('#botonRegistro').click()
//     cy.get('#botonRegistroEstablecimiento').click()

//     cy.get('#restaurantname').type('Establecimiento de prueba')
//     cy.get('#address').type('Calle falsa 123')
//     cy.get('#description').type('Establecimiento de prueba, nueva descripcion')
    
//     // ? checklist pendiente
//     // Suponiendo que los días de la semana son: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
//     const selectedDays = ['Lunes', 'Miércoles', 'Viernes'];
//     // Iterar sobre los días de la semana y marcarlos en el formulario
//     selectedDays.forEach(day => {
//     cy.contains(day).click();
//     });

//     // ? hora inicio
//     cy.get('#horaInicio').type('09:00');
//     // ? hora fin
//     cy.get('#horaFin').type('18:00');
    
//     // ? Categoría
//     // cy.get('#category').scrollTo()
//         // Encuentra el v-select y haz clic en él para abrir el menú
//     cy.get('.v-select').click();

//     cy.contains('pizzeria').click()  // Seleccionar la categoría deseada

//     cy.get('#email').type('establecimientoPrueba@gmail.com')
//     cy.get('#phone').type('666666666')
//     cy.get('#username').type('establecimientoPrueba')
//     cy.get('#password').type('establecimientoPrueba1')


//     //  ? franja elegir hora
//     cy.get('#franjaTiempo').type('30');
//     cy.get('#numberOfPeople').type('4')
   
//     cy.get('#enviarRegistroEstablecimiento').click()

//   })
// })