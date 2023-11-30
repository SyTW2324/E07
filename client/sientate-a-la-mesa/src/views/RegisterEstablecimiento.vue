
<template>

  <v-app>
    <Barnav></Barnav>
    <v-main>
      <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
        <h1>Registro de un establecimiento</h1>
      </v-container>
  
      <v-container>
  
        <v-form @submit.prevent="submitForm">
          <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                id="restaurantname"
                v-model="restaurantname"
                :rules="restaurantnameRules"
                :counter="10"
                label="Nombre del establecimiento*"
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                id="address"
                v-model="address"
                label="Dirección del establecimiento*"
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                id="description"
                v-model="description"
                label="Descripción*"
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-row class="d-flex">
                <!-- Días de la semana -->
                <v-col cols="12">
                  <label>Días de la semana:</label>
                  <v-row>
                    <v-col v-for="day in daysOfWeek" :key="day" cols="6">
                      <v-checkbox v-model="timetable.selectedDays" :label="day" :value="day"></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Hora de inicio -->
                <v-col cols="6">
                  <label>Hora de inicio:</label>
                  <v-text-field v-model="timetable.startingHour" type="time"></v-text-field>
                </v-col>

                <!-- Hora de finalización -->
                <v-col cols="6">
                  <label>Hora de finalización:</label>
                  <v-text-field v-model="timetable.finishingHour" type="time"></v-text-field>
                </v-col>
              </v-row>
            </v-col>


            <v-col cols="12" md="4">
              <v-text-field
                id="category"
                v-model="category"
                :rules="categoryRules"
                label="Categoría*"
                required
                hide-details
              ></v-text-field>
            </v-col>

  
            <v-col cols="12" md="4">
              <v-text-field
                id="email"
                v-model="email"
                :rules="emailRules"
                label="Correo electrónico*"
                hide-details
                required
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="phone"
                v-model="phone"
                :rules="phoneRules"
                label="Teléfono*"
                hide-details
                required
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="username"
                label="Nombre de usuario*"
                v-model="username"
                hide-details
                required
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="password"
                v-model="password"
                :rules="passwordRules"
                label="Contraseña*"
                hide-details
                required
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-file-input
                v-model="pictures"
                label="Fotos del establecimiento"
                accept="image/*"
                placeholder="Seleccione una imagen"
              ></v-file-input>
            </v-col>

            <!-- es un pdf -->
            <v-col cols="12" md="4"> 
              <v-file-input
                v-model="menu"
                label="Menú"
                accept="application/pdf"
                placeholder="Seleccione un pdf"
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="4">
              <v-row>
                <!-- Número de minutos -->
                <v-col cols="12">
                  <label>Tiempo de franja de reserva (minutos):</label>
                  <v-text-field v-model="available.timePeriod" type="number"></v-text-field>
                </v-col>

                <!-- Número de personas -->
                <v-col cols="12">
                  <label>Número de personas por reserva:</label>
                  <v-text-field 
                  id="numberOfPeople"
                  v-model="available.numberOfPeople" type="number"></v-text-field>
                </v-col>
              </v-row>

            </v-col>
            
  
          </v-row>
  
          <v-btn id="enviarRegistroEstablecimiento" idtype="submit" color="primary">Enviar</v-btn>
  
          </v-container>
        </v-form>
  
        <v-alert v-if="!valid" type="error">
          Por favor, corrija los errores en el formulario.
        </v-alert>
  
      </v-container>
      <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
        <div ref="textContainer"></div>
      </v-container>
    </v-main>
  
    <Footer></Footer>
    
  </v-app>
  
  </template>
  
  <script setup lang="ts">
  import Barnav from '../components/Barnav.vue';
  import Footer from '../components/Footer.vue'
  </script>
  
  <!-- Está separado en dos scripts por el export defaults, en Footer ya hay uno y entra en conflicto con el nuevo export default -->
  <script lang="ts">
  
  import axios from 'axios';
  import { baseUrl } from '../env/env-variables';
  
  //CORS
  
    export default {
      data: () => ({
        valid: true,
        restaurantname: '',
        restaurantnameRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El nombre del establecimiento es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a restaurantnameRules
        address: '',
        description: '',
        timetable: {
          selectedDays: [],
          startingHour: null,
          finishingHour: null,
        },
        daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    
        timetableRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El horario es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a timetableRules
        category: '',
        categoryRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La categoría es obligatoria.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a categoryRules


        email: '',
        emailError: '',
        emailRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El correo es obligatorio.';
          },
          (value: string) => {
            if (/.+@.+\..+/.test(value)) return true;
  
            return 'El correo debe ser válido.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a emailRules
        phone: '',
        phoneError: '',
        phoneRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El teléfono es obligatorio.';
          },
          (value: string) => {
            if (/^\d{9}$/.test(value)) return true;
  
            return 'El teléfono debe tener 9 dígitos.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a phoneRules
        username: '',
        // Patrón de la contraseña [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one lowercase letter, one uppercase letter and one number' ],
        password: '',
        passwordError: '',
        passwordRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La contraseña es obligatoria.';
          },
          (value: string) => {
            if (value.length >= 8 && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/).test(value)) return true;
  
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a passwordRules
        pictures: [],
        menu: [], // es un pdf
        available: {
          timePeriod: null,
          numberOfPeople: null,
        },
        
      }),
      methods: {
      submitForm() {
        // Validar los campos del formulario
        const isValid = this.validateForm();
  
        if (isValid) {
          // Aquí puedes enviar el formulario, por ejemplo, hacer una llamada a la API
          console.log('Formulario válido. Enviar datos.');
          this.RegisterRestaurantApi();
        } else {
          // al usuario debe mostrarle en la web el problema 
          // y no enviar el formulario hasta que no lo corrija
          
          console.log('Formulario inválido. Por favor, corrija los errores.');
        }
      },

      
      async RegisterRestaurantApi() {
        try {
          console.log('Enviando datos a la API'); 
          const textContainer = this.$refs.textContainer as HTMLElement;
      
          // Crea un elemento de imagen
          const textElement = document.createElement('h3');
          textElement.innerText = ' ';
          // Realiza la llamada a la API utilizando Axios
          // "userName": "AsadorLaMatanza";
          // "passwd": "Hola1234";
          // "email": "asadormatanza@gmail.com";
          // "restaurantName": "Asador La Matanza";
          // "restaurantAddress": "La Matanza, Tenerife";
          // "description": "Asador de pollos en la Matanza, carne de primera calidad";
          // "timeTable": "";
          // "category": "asador";
          // "phoneNumber": "666666666";
          // "pictures": "null";
          // "menu": "null";
          // "availability": Available[];

          let profilePhotoBase64 = null;
          // ! Habría que hacer un bucle para subir todas las imágenes
          if (this.pictures.length > 0) {
            const file = this.pictures[0]; 
            const reader = new FileReader();
            reader.readAsDataURL(file);
            profilePhotoBase64 = await new Promise((resolve, reject) => {
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
            });
          }
          const newRestaurantJson = {
            "userName": this.username,
            "passwd": this.password,
            "email": this.email,
            "restaurantName": this.restaurantname,
            "restaurantAddress": this.address,
            "description": this.description,
            "timeTable": this.timetable,
            "category": this.category,
            "phoneNumber": this.phone,
            "pictures": profilePhotoBase64,
            "menu": this.menu,
            "availability": this.available,
          };
          console.log('Datos a enviar', newRestaurantJson);
          const response = await axios.post(`${baseUrl}restaurants/`, newRestaurantJson);
         //const response = await axios.get('http://localhost:3000/users/');
          console.log('Datos obtenidos de la API', response.data);
          //Prueba de que la imagen se ha subido correctamente y luego se puede renderizar
  
          // Añade la imagen al contenedor
          if (response.status === 201) {
            //this.$router.push('/login');
            console.log('Restaurante registrado correctamente');
  
            textElement.innerText = 'Restaurante registrado correctamente';
            textContainer.innerHTML = '';
            textContainer.appendChild(textElement);
            
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
          const response = error.response;
          const textContainer = this.$refs.textContainer as HTMLElement;
          const textElement = document.createElement('h3');
  
          if (response.status === 400) {
            console.error('Faltan campos obligatorios');
            if (response.data.code === 1) {
            console.error('Faltan campos obligatorios');
            textElement.innerText = 'Faltan campos obligatorios';
            } else if (response.data.code === 2) {
            console.error('El nombre de usuario ya existe');
            textElement.innerText = 'El nombre de usuario ya existe elige otro';
            } else if (response.data.code === 3) {
            console.error('El correo ya existe');
            textElement.innerText = 'El correo ya existe';
            } else if (response.data.code === 4) {
            console.error('El teléfono ya existe');
            textElement.innerText = 'El teléfono ya existe';
            } else {
            console.error('Error desconocido:', response.status);
            textElement.innerText = 'Error desconocido';
            }
          } else {
            console.error('Error al realizar la solicitud:', error.message);
          }
  
          // Añade el elemento de texto al contenedor
          textContainer.innerHTML = '';
          textContainer.appendChild(textElement);
          }
  
        }
      },
  
      validateForm() {
        // Lógica para validar cada campo según las reglas definidas
        // Devuelve true si el formulario es válido, false de lo contrario
        // También puedes actualizar el estado "valid" si es necesario
        
        this.emailError = '';
        this.phoneError = '';
        this.passwordError = '';
  
        const isEmailValid = this.emailRules.every(rule => {
          const isValid = rule(this.email) === true;
          if (!isValid) this.emailError = rule(this.email) as string;
          return isValid;
        });
  
        const isPhoneValid = this.phoneRules.every(rule => {
          const isValid = rule(this.phone) === true;
          if (!isValid) this.phoneError = rule(this.phone) as string;
          return isValid;
        });
  
        const isPasswordValid = this.passwordRules.every(rule => {
          const isValid = rule(this.password) === true;
          if (!isValid) this.passwordError = rule(this.password) as string;
          return isValid;
        });
  
        // Actualizar el estado "valid" si es necesario
        this.valid = isEmailValid && isPhoneValid && isPasswordValid;
  
        return this.valid;
      },
    },
    };
  </script>