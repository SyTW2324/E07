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
              <v-select
                id="category"
                v-model="category"
                :items="categories"
                label="Categoría*"
                required
                hide-details

              ></v-select>
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
                v-model="profilePicture"
                label="Foto de perfil"
                accept="image/*"
                placeholder="Seleccione una imagen"
              ></v-file-input>
            </v-col>


            <v-row class="d-flex">
              <!-- Días de la semana -->
              <v-col cols="12">
                <label>Días de la semana:</label>
                <v-row>
                  <v-col v-for="day in daysOfWeek" :key="day" cols="1.5">
                    <v-checkbox v-model="timetable.selectedDays" :label="day" :value="day"></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>


            <!-- Hora de inicio -->
            <v-col cols="4">
              <label>Hora de inicio:</label>
              <v-text-field id="horaInicio" v-model="timetable.startingHour" type="time"></v-text-field>
            </v-col>

            <!-- Hora de finalización -->
            <v-col cols="4">
              <label>Hora de finalización:</label>
              <v-text-field id="horaFin" v-model="timetable.finishingHour" type="time"></v-text-field>
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


            <!-- Número de minutos -->
            <v-col cols="12" md="4">
              <label>Tiempo de franja de reserva (minutos):</label>
              <v-text-field id="franjaTiempo" v-model="available.timePeriod" type="number"></v-text-field>
            </v-col>

            <!-- Número de personas -->
            <v-col cols="12" md="4">
              <label>Número de mesas por franja horaria:</label>
              <v-text-field 
              id="numberOfTables"
              v-model="available.numberOfTables" type="number"></v-text-field>
            </v-col>

            <!-- imágenes del establecimiento -->
            <v-col cols="12" md="4">
              <v-file-input
                v-model="pictures"
                label="Imágenes de portada del establecimiento"
                accept="image/*"
                placeholder="Seleccione una imagen"
                multiple
              ></v-file-input>
            </v-col>

            
  
          </v-row>
  
          <v-btn id="enviarRegistroEstablecimiento" type="submit" color="primary">Enviar</v-btn>
  
          </v-container>
        </v-form>

      </v-container>
      <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
        <div ref="textContainer"></div>
      </v-container>

      <!-- Alertas -->
      <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
      <v-alert v-if="!valid" type="warning" closable class="my-custom-alert">
        Por favor, corrija los errores en el formulario.
        <br>
        - Contraseña: La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
        <br>
        - Correo: El correo debe ser válido.
        <br>
        - Teléfono: El teléfono debe tener 9 dígitos.
      </v-alert>

      <v-alert v-if="!validUserName" type="error" closable class="my-custom-alert">
        El nombre de usuario ya existe elige otro.
      </v-alert>

      <v-alert v-if="!validEmail" type="error" closable class="my-custom-alert">
        El correo ya existe.
      </v-alert>

      <v-alert v-if="!validPhone" type="error" closable class="my-custom-alert">
        El teléfono ya existe.
      </v-alert>

      <v-alert v-if="userRegistered" type="success" closable class="my-custom-alert">
        Usuario registrado correctamente.
      </v-alert>
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
  import { useAuthStore } from '../stores/useAuthStore';
  import Compressor from 'compressorjs';

  
  //CORS
  
    export default {
      data: () => ({
        valid: true,
        validUserName: true,
        validEmail: true,
        validPhone: true,
        userRegistered: false,
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
        categories: ['asador', 'cafeteria', 'chino', 'comida rapida', 'español', 'hindu', 'italiano', 'japones', 'mexicano', 'pizzeria', 'vegetariano'],
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
        profilePicture: [],
        pictures: [],
        menu: [], // es un pdf
        available: {
          timePeriod: null,
          numberOfTables: null,
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

      async compressImages(pictures: File[]) {
        const compressedImages = await Promise.all(
          pictures.map(async (picture) => {
            const compressedImage = await this.compressImage(picture);
            return compressedImage;
          })
        );

        return compressedImages;
      },

      compressImage(file: File) {
        return new Promise((resolve, reject) => {
          new Compressor(file, {
            quality: 0.6,
            success(result) {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(result);
            },
            error(e) {
              console.error('Error al comprimir la imagen:', e);
              reject(e);
            },
          });
        });
      },


      
      async convertFileToDataURL(file: File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(file);
        });
      },
      
      async RegisterRestaurantApi() {
        try {
          this.validUserName = true;
          this.validEmail = true;
          this.validPhone = true;
          console.log('Enviando datos a la API'); 
          // const textContainer = this.$refs.textContainer as HTMLElement;
      
          // Crea un elemento de imagen
          const textElement = document.createElement('h3');
          textElement.innerText = ' ';
          console.log('pre-compresion')
          let compressedPictures: string[] = [];
          try {
            if (this.pictures.length > 0) {
              console.log('pre')
              const compressedImages = await this.compressImages(this.pictures);
              console.log('post')
              // Verificación de tipo para cada elemento del array
              compressedImages.forEach((compressedImage) => {
                if (typeof compressedImage === 'string') {
                  compressedPictures.push(compressedImage);
                } else {
                  console.error('Uno de los elementos no es una cadena.');
                }
              });
            }
          } catch (error) {
            console.error('Error durante la compresión de imágenes:', error);
          }
          console.log('imágenes comprimidas')


          let compressedProfilePicture: string | undefined = '';
          if (this.profilePicture.length === 1) {
            const result = await this.compressImage(this.profilePicture[0]);
            if (typeof result === 'string') {
              compressedProfilePicture = result;
            } else {
              console.error('El resultado de compressImage no es una cadena.');
            }
          }

          // let photoBase64: string = ' ';
          // if (this.pictures.length > 0) {
          //   // procesar todas las imagenes
          //   for (let i = 0; i < this.pictures.length; i++) {
          //     photoBase64 += await this.convertFileToDataURL(this.pictures[i]) as string;
          //   }
          // }
          // if (this.profilePicture.length == 1) {
          //   photoBase64 = await this.convertFileToDataURL(this.profilePicture[0]) as string;
          // }
          let menuData: string = ' ';
          const formData = new FormData();
          if (this.menu.length > 0) {
            formData.append('pdf', this.menu[0]);
          }
          console.log('menuData', menuData);

          // comprimir el pdf

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
            "profilePicture": compressedProfilePicture,
            "pictures": compressedPictures,
            "menu": "",
            "availability": this.available,
          };
          console.log('Datos a enviar', newRestaurantJson);
          const response = await axios.post(`${baseUrl}restaurants/`, newRestaurantJson);
         //const response = await axios.get('http://localhost:3000/users/');
          console.log('Datos obtenidos de la API', response.data);
          //Prueba de que la imagen se ha subido correctamente y luego se puede renderizar
          //const responsePdfUpload = await axios.put(`${baseUrl}restaurants/uploadpdf/?userName=${this.username}`, formData);
          const responsePdfUpload = {status: 201};
          // Añade la imagen al contenedor
          if (response.status === 201 && responsePdfUpload.status === 201) {
            //this.$router.push('/login');
            console.log('Restaurante registrado correctamente');
            this.userRegistered = true;
            const authStore = useAuthStore();
            return authStore.login(this.username, this.password).catch(error => console.log(error));
          
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
            } 
            else if (response.data.code === 2) {
              console.error('El nombre de usuario ya existe');
              this.validUserName = false;
            } 
            else if (response.data.code === 3) {
              console.error('El correo ya existe');
              this.validEmail = false;
            } 
            else if (response.data.code === 4) {
              this.validPhone = false;
            } 
            else {
            console.error('Error desconocido:', response.status);
            textElement.innerText = 'Error desconocido';
            }
          } 
          else {
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