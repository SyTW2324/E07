<template>

  <v-app>
    <Barnav></Barnav>
    <v-main>
      <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
        <h1>Editar perfil de mi restaurante</h1>
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
                :rules="addressRules"
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
                hide-details
              ></v-text-field>
            </v-col>


            <v-col cols="12" md="4">
              <v-select
                id="category"
                v-model="category"
                :items="categories"
                label="Categoría*"
                :rules="categoryRules"
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
                :rules="usernameRules"
                hide-details
                required
                @onmouseover="onmouseover('username')"
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4" class="d-flex align-center justify-space-between">
              <v-text-field v-if="showPassword == false"
              id="password"
              v-model="password"
              :rules="passwordRules"
              label="Contraseña*"
              type="password"
              hide-details
              required
              ></v-text-field>
              <v-text-field v-else
              id="password"
              v-model="password"
              :rules="passwordRules"
              label="Contraseña*"
              type="text"
              hide-details
              required
              ></v-text-field>
              <v-btn @click="controlShowPassword" icon>
                <v-icon v-if="showPassword == false">mdi-eye</v-icon>
                <v-icon v-else>mdi-eye-off</v-icon>
              </v-btn>
            </v-col>
  

            <v-col cols="12" md="4">
              <v-file-input
                v-model="profilePicture"
                label="Foto de perfil (límite 2mb)"
                accept="image/*"
                placeholder="Seleccione una imagen"
                :multiple="false"
                :maxSize="1024*1024*2"
              ></v-file-input>
            </v-col>


            <v-row class="d-flex">
              <!-- Días de la semana -->
              <v-col cols="12">
                <label>Días de la semana*:</label>
                <v-row>
                  <v-col v-for="day in daysOfWeek" :key="day" cols="1.5">
                    <v-checkbox 
                    v-model="selectedDays" 
                    :label="day" 
                    :value="day"
                    :rules="timetableRules"
                    >
                  </v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>


            <!-- Hora de inicio -->
            <v-col cols="4">
              <label>Hora de inicio*:</label>
              <v-text-field 
              id="horaInicio" 
              v-model="startingHour" 
              type="time"
              :rules="startHourRules"
              ></v-text-field>
            </v-col>

            <!-- Hora de finalización -->
            <v-col cols="4">
              <label>Hora de finalización*:</label>
              <v-text-field 
              id="horaFin" 
              v-model="finishingHour" 
              type="time"
              :rules="finishHourRules"
              ></v-text-field>
            </v-col>

            <!-- es un pdf, tamaño máximo 4mb -->
            <v-col cols="12" md="4"> 
              <v-file-input
                v-model="menu"
                label="Menú (límite 4mb)"
                accept="application/pdf"
                placeholder="Seleccione un pdf"
                :multiple="false"
                :maxSize="1024*1024*4"
              ></v-file-input>
            </v-col>


            <!-- Número de minutos -->
            <v-col cols="12" md="4">
              <label>Tiempo de franja de reserva (minutos)*:</label>
              <v-text-field 
              id="franjaTiempo" 
              v-model="timePeriod" 
              type="number"
              :rules="timePeriodRules"
              >
            </v-text-field>
            </v-col>

            <!-- Número de personas -->
            <v-col cols="12" md="4">
              <label>Número de mesas por franja horaria*:</label>
              <v-text-field 
              id="numberOfTables"
              v-model="numberOfTables" 
              type="number"
              :rules="numberOfTablesRules"
              >
              </v-text-field>
            </v-col>

            <!-- imágenes del establecimiento, tamaño máximo 2mb -->
            <v-col cols="12" md="4">
              <v-file-input
                v-model="pictures"
                label="Imágenes de portada del establecimiento (limite 2mb)"
                accept="image/*"
                placeholder="Seleccione una imagen"
                multiple
                :maxSize="1024*1024*2"
              ></v-file-input>
            </v-col>
  
          </v-row>
  
          <v-btn id="enviarRegistroEstablecimiento" type="submit" color="primary">Enviar</v-btn>
  
          </v-container>
        </v-form>
        <v-container v-if="processingRegister == true" class="d-flex align-center justify-center" style="padding-top: 1em; padding-bottom: 1em;">
          <v-progress-circular
            indeterminate
            size="50" 
            color="teal"
            >
          </v-progress-circular> 
        </v-container>

      </v-container>
      <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
        <div ref="textContainer"></div>
      </v-container>

      <!-- Alertas -->
      <v-container class="d-flex align-center justify-center" style="min-height: 10px">
        <v-container class="my-custom-container" style="width: 100%; height: 100%">
          
          <v-alert v-if="!validEmail" type="error" closable class="my-custom-alert2">
            El correo ya existe.
          </v-alert>

          <v-alert v-if="!validEmail2" type="error" closable class="my-custom-alert2">
            El correo es obligatorio
            <br>
            El correo deber ser válido
          </v-alert>

          <v-alert v-if="!validPhone" type="error" closable class="my-custom-alert2">
            El teléfono ya existe.
          </v-alert>

          <v-alert v-if="!validPhone2" type="error" closable class="my-custom-alert2">
            El teléfono es obligatorio
            <br>
            El teléfono debe tener 9 dígitos
          </v-alert>

          <v-alert v-if="!validUserName" type="error" closable class="my-custom-alert2">
            El nombre de usuario ya existe.
          </v-alert>
          
          <v-alert v-if="!validUserName2" type="error" closable class="my-custom-alert2">
            El nombre de usuario es obligatorio
          </v-alert>

          <v-alert v-if="!validRestaurantName" type="error" closable class="my-custom-alert2">
            El nombre del establecimiento es obligatorio.
          </v-alert>

          <v-alert v-if="!validAddress" type="error" closable class="my-custom-alert2">
            La dirección del establecimiento es obligatoria.
          </v-alert>

          <v-alert v-if="!validCategory" type="error" closable class="my-custom-alert2">
            La categoría es obligatoria.
          </v-alert>

          <v-alert v-if="!validPassword" type="error" closable class="my-custom-alert2">
            La contraseña es obligatoria.
            <br>
            La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
          </v-alert>

          <v-alert v-if="!validWeekDays" type="error" closable class="my-custom-alert2">
            Debe seleccionar al menos un día de la semana.
          </v-alert>

          <v-alert v-if="!validStartingHour" type="error" closable class="my-custom-alert2">
            La hora de inicio es obligatoria.
          </v-alert>

          <v-alert v-if="!validFinishingHour" type="error" closable class="my-custom-alert2">
            La hora de finalización es obligatoria.
          </v-alert>

          <v-alert v-if="!validTimePeriod" type="error" closable class="my-custom-alert2">
            El tiempo de franja de reserva es obligatorio.
          </v-alert>

          <v-alert v-if="!validNumberOfTables" type="error" closable class="my-custom-alert2">
            El número de mesas por franja horaria es obligatorio.
          </v-alert>

          <v-alert v-if="!validMenu" type="error">
            El tamaño del archivo no debe exceder los 4 MB.
          </v-alert>

          <v-alert v-if="!validProfilePicture" type="error" closable class="my-custom-alert2">
            El tamaño de la foto de perfil no puede exceder los 2 MB.
          </v-alert>

          <v-alert v-if="!validPictures" type="error" closable class="my-custom-alert2">
            El tamaño de las imágenes no puede exceder los 2 MB.
            <br>
            El número de imágenes debe ser de entre 1 y 10.
          </v-alert>
        </v-container>
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
  import { ref } from 'vue';

  let username = ref('');
  let password = ref('');
  let restaurantname = ref('');
  let email = ref('');
  let phone = ref('');
  let description = ref('');
  let address = ref('');
  // let timeTable = ref([]);
  let category = ref('');
  let selectedDays = ref([]);
  let startingHour = ref('');
  let finishingHour = ref('');
  let hours = ref('');
  let menu = ref([]);
  let pictures: File[] = [];
  let timePeriod = ref('');
  let numberOfTables = ref('');

  let profilePicture: File[] = [];
  let pageIsLoaded = ref(false);

  interface timeTable {
    selectedDays: string[];
    startingHour: string;
    finishingHour: string;
  }

  interface available {
    timePeriod: number;
    numberOfTables: number;
  }


  async function getRestaurant() {
    pageIsLoaded.value = false;
    const authStore = useAuthStore();
    if (authStore.user) {
    if (authStore.isExpired() === true) {
        const userToken = authStore.getToken();
        const response = await axios.get(`${baseUrl}restaurants/?token=${userToken}&userName=${authStore.user.username}`)
        if (response.data.code === 0) {
          username.value = response.data.message.userName;
          restaurantname.value = response.data.message.restaurantName;
          email.value = response.data.message.email;
          phone.value = response.data.message.phoneNumber;
          address.value = response.data.message.restaurantAddress;
          // timeTable.value = response.data.message.timeTable;
          selectedDays.value = response.data.message.timeTable[0].selectedDays;
          startingHour.value = response.data.message.timeTable[0].startingHour;
          finishingHour.value = response.data.message.timeTable[0].finishingHour;
          timePeriod.value = response.data.message.availability.timePeriod;
          numberOfTables.value = response.data.message.availability.numberOfTables;
          description.value = response.data.message.description;

          category.value = response.data.message.category;

          selectedDays.value = response.data.message.timeTable[0].selectedDays;
          startingHour.value = response.data.message.timeTable[0].startingHour;
          finishingHour.value = response.data.message.timeTable[0].finishingHour;
          hours.value = startingHour.value + " - " + finishingHour.value;
          menu.value = response.data.message.menu;

          profilePicture.values = response.data.message.profilePicture;
          pictures.values = response.data.message.pictures;

          pageIsLoaded.value = true;
        } 
        else {
          authStore.logout();
        }

    } else {
      authStore.logout();
    }
    } else {
      authStore.logout();
    }

  }

  getRestaurant();





    export default {
      data: () => ({
        processingRegister: false,
        valid: true,
        validUserName: true,
        validUserName2: true,
        validEmail: true,
        validEmail2: true,
        validPhone: true,
        validPhone2: true,
        validRestaurantName: true,
        validAddress: true,
        validCategory: true,
        validPassword: true,  
        validWeekDays: true,
        validStartingHour: true,
        validFinishingHour: true,
        validTimePeriod: true,
        validNumberOfTables: true,
        validMenu: true,
        validProfilePicture: true,
        validPictures: true,
        userRegistered: false,
        // restaurantname: '',
        showPassword: false,
        restaurantnameRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El nombre del establecimiento es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a restaurantnameRules
        // address: '',
        addressRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La dirección del establecimiento es obligatoria.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a addressRules
        // description: '',
        // timetable: {
        //   selectedDays: [],
        //   startingHour: null,
        //   finishingHour: null,
        // },
        daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    
        timetableRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El horario es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a timetableRules
        // category: '',
        categories: ['asador', 'cafeteria', 'chino', 'comida rapida', 'español', 'hindu', 'italiano', 'japones', 'mexicano', 'pizzeria', 'vegetariano'],
        categoryRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La categoría es obligatoria.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a categoryRules
        // email: '',
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
        // phone: '',
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
        // username: '',
        usernameRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El nombre de usuario es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a usernameRules
        // Patrón de la contraseña [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one lowercase letter, one uppercase letter and one number' ],
        // password: '',
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
        // profilePicture: [],
        profilePictureRules: [
          (value: File) => {
            if (!value) return true;

            const fileSize = value.size;
            const maxFileSize = 2 * 1024 * 1024; // 2 MB
            if (fileSize > maxFileSize) {
              return false;
            }
            
            return true;
          },
        ],
        profilePictureError: '',
        // pictures: [],
        picturesError: '',
        // menu: [], // es un pdf
        menuRules: [
          (value: File) => {
            if (!value) return true;

            const fileSize = value.size;
            const maxFileSize = 4 * 1024 * 1024; // 4 MB

            if (fileSize > maxFileSize) {
              return false;
            }
            
            return true;
          },
        ],
        menuError: '',
        timePeriodRules: [
          (value: number) => {
            if (value) {
              if (value > 0) return true;
              else return 'El tiempo de franja de reserva debe ser mayor que 0.';
            }
            return 'El tiempo de franja de reserva es obligatorio.';
          },
        ] as ((value: number) => true | string)[], // Asigna un tipo a timePeriodRules
        numberOfTablesRules: [
          (value: number) => {
            if (value) {
              if (value > 0) return true;
              else return 'El número de mesas por franja horaria debe ser mayor que 0.';
            }
            return 'El número de mesas por franja horaria es obligatorio.';
          },
        ] as ((value: number) => true | string)[], // Asigna un tipo a numberOfTablesRules
        startHourRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La hora de inicio es obligatoria.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a startHourRules
        finishHourRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La hora de finalización es obligatoria.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a finishHourRules
        // available: {
        //   timePeriod: null,
        //   numberOfTables: null,
        // },

      }),
      methods: {
      submitForm() {
        // Validar los campos del formulario
        const isValid = this.validateForm();
  
        if (isValid) {
          // Aquí puedes enviar el formulario, por ejemplo, hacer una llamada a la API
          //console.log('Formulario válido. Enviar datos.');
          this.RegisterRestaurantApi();
        } else {
          // al usuario debe mostrarle en la web el problema 
          // y no enviar el formulario hasta que no lo corrija
          
          //console.log('Formulario inválido. Por favor, corrija los errores.');
        }
      },
      controlShowPassword() {
        this.showPassword = !this.showPassword;
      },
      
      async convertFileToBase64(file: File) {
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
          this.processingRegister = false;

          //console.log('Enviando datos a la API'); 
          // const textContainer = this.$refs.textContainer as HTMLElement;
      
          // Crea un elemento de imagen
          const textElement = document.createElement('h3');
          textElement.innerText = ' ';

          let photoBase64_profile: string = ' ';
          let photoBase64_pictures: string[] = [];
          if (pictures.length > 0) {
            for (let i = 0; i < pictures.length; i++) {
              photoBase64_pictures[i] = await this.convertFileToBase64(pictures[i]) as string;
            }
          }
          if (profilePicture.length == 1) {
            if (profilePicture.length > 0) {
              photoBase64_profile = await this.convertFileToBase64(profilePicture[0]) as string;
            }
          }
          
          let pdfBase64: string = ' ';
            if (menu.value.length == 1) {
            pdfBase64 = await this.convertFileToBase64(menu.value[0] as File) as string;
          }

          // comprimir el pdf
          let timetable1: timeTable = {
            selectedDays: selectedDays.value,
            startingHour: startingHour.value,
            finishingHour: finishingHour.value,
          };

          let available1: available = {
            timePeriod: Number(timePeriod.value),
            numberOfTables: Number(numberOfTables.value),
          };
                    

          const newRestaurantJson = {
            "userName": username,
            "passwd": password,
            "email": email,
            "restaurantName": restaurantname,
            "restaurantAddress": address,
            "description": description,
            "timeTable": timetable1,
            "category": category,
            "phoneNumber": phone,
            "profilePicture": photoBase64_profile,
            "pictures": photoBase64_pictures,
            "menu": pdfBase64,
            "availability": available1,
          };
          this.processingRegister = true;
          const response = await axios.post(`${baseUrl}restaurants/`, newRestaurantJson);
          this.processingRegister = false;
         //const response = await axios.get('http://localhost:3000/users/');
          //console.log('Datos obtenidos de la API', response.data);
          //Prueba de que la imagen se ha subido correctamente y luego se puede renderizar
          //const responsePdfUpload = await axios.put(`${baseUrl}restaurants/uploadpdf/?userName=${this.username}`, formData);
          const responsePdfUpload = {status: 201};
          // Añade la imagen al contenedor
          if (response.status === 201 && responsePdfUpload.status === 201) {
            //this.$router.push('/login');
            //console.log('Restaurante registrado correctamente');
            this.userRegistered = true;
            const authStore = useAuthStore();
            return authStore.login(username.value, password.value).catch(error => console.log(error));
          
          }
        } catch (error) {
          this.processingRegister = false;
          if (axios.isAxiosError(error) && error.response) {
          const response = error.response;
          const textContainer = this.$refs.textContainer as HTMLElement;
          const textElement = document.createElement('h3');
  
          //console.error('Error al realizar la solicitud:', response.status, response.statusText);
          //console.error('Código de error:', response.data.code);
          if (response.status === 400) {
            console.error('Faltan campos obligatorios');
            if (response.data.code === 1) {
              //console.error('Faltan campos obligatorios');
              textElement.innerText = 'Faltan campos obligatorios';
            } 
            else if (response.data.code === 2) {
              //console.error('El nombre de usuario ya existe');
              this.validUserName = false;
            } 
            else if (response.data.code === 3) {
              //console.error('El correo ya existe');
              this.validEmail = false;
            } 
            else if (response.data.code === 4) {
              this.validPhone = false;
            } 
            else {
            //console.error('Error desconocido:', response.status);
            textElement.innerText = 'Error desconocido';
            }
          } 
          else {
            //console.error('Error al realizar la solicitud:', error.message);
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
        this.menuError = '';
        this.validEmail = true;
        this.validPhone = true;

        
        this.validPhone2 = this.phoneRules.every(rule => {
          const isValid = rule(phone.value) === true;
          if (!isValid) this.phoneError = rule(phone.value) as string;
          return isValid;
        });
        console.log('this.validPhone2:', this.validPhone2);

        this.validEmail2 = this.emailRules.every(rule => {
          const isValid = rule(email.value) === true;
          return isValid;
        });
        console.log('this.validEmail2:', this.validEmail2);
  
        this.validPassword = this.passwordRules.every(rule => {
          const isValid = rule(password.value) === true;
          if (!isValid) this.passwordError = rule(password.value) as string;
          return isValid;
        });

        this.validRestaurantName = this.restaurantnameRules.every(rule => {
          const isValid = rule(restaurantname.value) === true;
          return isValid;
        });

        this.validAddress = this.addressRules.every(rule => {
          const isValid = rule(address.value) === true;
          return isValid;
        });

        this.validCategory = this.categoryRules.every(rule => {
          const isValid = rule(category.value) === true;
          return isValid;
        });
        
        this.validUserName2 = this.usernameRules.every(rule => {
          const isValid = rule(username.value) === true;
          return isValid;
        });


        this.validWeekDays = this.timetableRules.every(rule => {
          const isValid = rule(selectedDays.value.join(',')) === true;
          return isValid;
        });

        // hora de inicio, comprobar que no esté vacío
        this.validStartingHour = this.startHourRules.every(rule => {
          const isValid = rule(startingHour.value !== null ? startingHour.value : '') === true;
          return isValid;
        });

        // hora de finalización, comprobar que no esté vacíoue
        this.validFinishingHour = this.finishHourRules.every(rule => {
          const isValid = rule(finishingHour.value !== null ? finishingHour.value : '') === true;
          return isValid;
        });

        // tiempo de franja de reserva, comprobar que no esté vacío y que sea mayor que 0
        this.validTimePeriod = this.timePeriodRules.every(rule => {
          const isValid = rule(timePeriod.value !== null ? Number(timePeriod.value) : 0) === true;
          return isValid;
        });

        // número de mesas por franja horaria, comprobar que no esté vacío y que sea mayor que 0
        this.validNumberOfTables = this.numberOfTablesRules.every(rule => {
          const isValid = rule(Number(numberOfTables.value !== null ? numberOfTables.value : 0)) === true;
          return isValid;
        });


        // menú, tamaño no debe exceder 10mb
        // exceedsSizeLimit.value = true;
        // utilizar menuRules para comprobar si el menu es valido o no
        const rule = this.menuRules[0];
        this.validMenu = true;
        const isValid2 = menu.value.length > 0 && rule(menu.value[0]) === true;
        if (!isValid2) {
          this.menuError = rule(menu.value[0]) as unknown as string;
          this.validMenu = false;
          //console.log('Fallo, el menú supera los 4mb');
        }
        

        // foto de perfil, tamaño no debe exceder 3mb, pero no es obligatoria
        // utilizar profilePictureRules para comprobar si la foto de perfil es valida o no
        const rule2 = this.profilePictureRules[0];
        this.validProfilePicture = true;
        const file = new File([profilePicture[0]], "filename");
        const isValid = rule2(file) === true;
        if (!isValid) {
          const file = new File([profilePicture[0]], "filename");
          this.profilePictureError = rule2(file) as unknown as string;
          this.validProfilePicture = false;
          //console.log('Fallo, la foto de perfil supera los 2mb');
        }

        // imágenes, tamaño no debe exceder 5mb, pero no es obligatoria y no deben de ser más de 5 archivos
        this.validPictures = true;
        if (pictures.length > 4) {
          this.validPictures = false;
          //console.log('Fallo, el número de imágenes está limitado a 4');
        }
        else {
          for (let i = 0; i < pictures.length; i++) {
            const rule3 = this.profilePictureRules[0]; // las reglas son las mismas que para la foto de perfil
            const file = new File([pictures[i]], "filename");
            const isValid3 = rule3(file) === true;
            if (!isValid3) {
              const file = new File([pictures[i]], "filename");
              this.picturesError = rule3(file) as unknown as string;
              this.validPictures = false; // si alguna imagen no es válida, el formulario ya no es válido
              //console.log('Fallo, alguna/s imagen/es superan los 2mb');
            }
          }
        }

        // Actualizar el estado "valid" si es necesario
        this.valid = this.validEmail2 && this.validPhone2 && this.validUserName && this.validUserName2 && this.validEmail && this.validPhone && this.validRestaurantName && this.validAddress && this.validCategory && this.validPassword && this.validWeekDays && this.validStartingHour && this.validFinishingHour && this.validTimePeriod && this.validNumberOfTables && this.validMenu && this.validProfilePicture && this.validPictures;
        return this.valid;
      },
    },
    };

  function onmouseover(elementId: string) {
    const firstnameElement = document.getElementById(elementId);
    if (firstnameElement) {
      firstnameElement.style.cursor = 'not-allowed';
    }
  }
  </script>