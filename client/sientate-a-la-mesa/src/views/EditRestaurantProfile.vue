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
                v-model="restaurantnameModified"
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
                v-model="addressModified"
                :rules="addressRules"
                label="Dirección del establecimiento*"
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                id="description"
                v-model="descriptionModified"
                label="Descripción"
                hide-details
              ></v-text-field>
            </v-col>


            <v-col cols="12" md="4">
              <v-select
                id="category"
                v-model="categoryModified"
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
                v-model="emailModified"
                :rules="emailRules"
                label="Correo electrónico*"
                hide-details
                required
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="phone"
                v-model="phoneModified"
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
                readonly
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4" class="d-flex align-center justify-space-between">
              <v-text-field v-if="showPassword == false"
              id="password"
              v-model="passwordModified"
              :rules="passwordRules"
              label="Contraseña*"
              type="password"
              hide-details
              required
              ></v-text-field>
              <v-text-field v-else
              id="password"
              v-model="passwordModified"
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
                v-model="profilePictureModified"
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
                    v-model="selectedDaysModified" 
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
              v-model="startingHourModified" 
              type="time"
              :rules="startHourRules"
              ></v-text-field>
            </v-col>

            <!-- Hora de finalización -->
            <v-col cols="4">
              <label>Hora de finalización*:</label>
              <v-text-field 
              id="horaFin" 
              v-model="finishingHourModified" 
              type="time"
              :rules="finishHourRules"
              ></v-text-field>
            </v-col>

            <!-- es un pdf, tamaño máximo 4mb -->
            <v-col cols="12" md="4"> 
              <v-file-input
                v-model="menuModified"
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
              v-model="timePeriodModified" 
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
              v-model="numberOfTablesModified" 
              type="number"
              :rules="numberOfTablesRules"
              >
              </v-text-field>
            </v-col>

            <!-- imágenes del establecimiento, tamaño máximo 2mb -->
            <v-col cols="12" md="4">
              <v-file-input
                v-model="picturesModified"
                label="Imágenes de portada del establecimiento (limite 2mb)"
                accept="image/*"
                placeholder="Seleccione una imagen"
                multiple
                :maxSize="1024*1024*2"
              ></v-file-input>
            </v-col>
  
          </v-row>
  
          <v-btn id="enviarRegistroEstablecimiento" type="submit" color="primary">Guardar</v-btn>
  
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
  let password = ref(useAuthStore().user.password);
  let restaurantname = ref('');
  let email = ref('');
  let phone = ref('');
  let description = ref('');
  let address = ref('');
  let category = ref('');
  let selectedDays = ref([]);
  let startingHour = ref('');
  let finishingHour = ref('');
  let menu = ref([]);
  let pictures: File[] = [];
  let timePeriod = ref('');
  let numberOfTables = ref('');
  let profilePicture: File[] = [];
  let pageIsLoaded = ref(false);

  // Atributos modificables
  let passwordModified = ref(password.value);
  let restaurantnameModified = ref('');
  let emailModified = ref('');
  let phoneModified = ref('');
  let descriptionModified = ref('');
  let addressModified = ref('');
  let categoryModified = ref('');
  let selectedDaysModified = ref([]);
  let startingHourModified = ref('');
  let finishingHourModified = ref('');
  let menuModified = ref([]);
  let picturesModified: File[] = [];
  let timePeriodModified = ref('');
  let numberOfTablesModified = ref('');
  let profilePictureModified: File[] = [];





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
    console.log('dentro getrestaurant()')
    if (authStore.user) {
      if (authStore.isExpired() === true) {
          const userToken = authStore.getToken();
          const response = await axios.get(`${baseUrl}restaurants/?token=${userToken}&userName=${authStore.user.username}`)
          console.log('Datos obtenidos de la API', response.data);
          if (response.data.code === 0) {
            username.value = response.data.message.userName;
            restaurantname.value = response.data.message.restaurantName;
            email.value = response.data.message.email;
            phone.value = response.data.message.phoneNumber;
            address.value = response.data.message.restaurantAddress;
            selectedDays.value = response.data.message.timeTable[0].selectedDays;
            startingHour.value = response.data.message.timeTable[0].startingHour;
            finishingHour.value = response.data.message.timeTable[0].finishingHour;
            timePeriod.value = response.data.message.timePeriod;
            numberOfTables.value = response.data.message.numberOfTables;
            description.value = response.data.message.description;
            category.value = response.data.message.category;
            selectedDays.value = response.data.message.timeTable[0].selectedDays;
            startingHour.value = response.data.message.timeTable[0].startingHour;
            finishingHour.value = response.data.message.timeTable[0].finishingHour;
            menu.value = response.data.message.menu;
            profilePicture.values = response.data.message.profilePicture;
            pictures.values = response.data.message.pictures;

            // Atributos modificables
            passwordModified.value = password.value;
            restaurantnameModified.value = restaurantname.value;
            emailModified.value = email.value;
            phoneModified.value = phone.value;
            addressModified.value = address.value;
            categoryModified.value = category.value;
            selectedDaysModified.value = selectedDays.value;
            startingHourModified.value = startingHour.value;
            finishingHourModified.value = finishingHour.value;
            timePeriodModified.value = timePeriod.value;
            numberOfTablesModified.value = numberOfTables.value;
            descriptionModified.value = description.value;
            menuModified.value = menu.value;
            profilePictureModified.values = profilePicture.values;
            picturesModified.values = pictures.values;



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
        showPassword: false,
        restaurantnameRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El nombre del establecimiento es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a restaurantnameRules
        addressRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La dirección del establecimiento es obligatoria.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a addressRules
        daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    
        timetableRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El horario es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a timetableRules
        categories: ['asador', 'cafeteria', 'chino', 'comida rapida', 'español', 'hindu', 'italiano', 'japones', 'mexicano', 'pizzeria', 'vegetariano'],
        categoryRules: [
          (value: string) => {
            if (value) return true;
  
            return 'La categoría es obligatoria.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a categoryRules
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
        usernameRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El nombre de usuario es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a usernameRules
        // Patrón de la contraseña [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one lowercase letter, one uppercase letter and one number' ],
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
        picturesError: '',
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
      }),
      methods: {
      submitForm() {
        // Validar los campos del formulario
        const isValid = this.validateForm();
  
        if (isValid) {
          
          this.RegisterRestaurantApi();
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

          let modifiedRestaurant = {}

          if (passwordModified.value !== password.value) {
            modifiedRestaurant = {
              ...modifiedRestaurant,
              passwd: passwordModified.value
            }
          }

          if (restaurantnameModified.value !== restaurantname.value) {
            modifiedRestaurant = {
              ...modifiedRestaurant,
              restaurantName: restaurantnameModified.value
            }
          }

          if (emailModified.value !== email.value) {
            modifiedRestaurant = {
              ...modifiedRestaurant,
              email: emailModified.value
            }
          }

          if (phoneModified.value !== phone.value) {
            modifiedRestaurant = {
              ...modifiedRestaurant,
              phoneNumber: phoneModified.value
            }
          }

          if (addressModified.value !== address.value) {
            modifiedRestaurant = {
              ...modifiedRestaurant,
              restaurantAddress: addressModified.value
            }
          }

          if (categoryModified.value !== category.value) {
            modifiedRestaurant = {
              ...modifiedRestaurant,
              category: categoryModified.value
            }
          }

          if (descriptionModified.value !== description.value) {
            modifiedRestaurant = {
              ...modifiedRestaurant,
              description: descriptionModified.value
            }
          }

          if ((selectedDaysModified.value !== selectedDays.value) || (startingHourModified.value !== startingHour.value) || (finishingHourModified.value !== finishingHour.value)) {
            // necesito construir time table comprobando si los valores se han modificado o no
            const timeTableModified: timeTable = {
              selectedDays: selectedDays.value,
              startingHour: startingHour.value,
              finishingHour: finishingHour.value
            }
            if (selectedDaysModified.value !== selectedDays.value) {
              timeTableModified.selectedDays = selectedDaysModified.value;
            }
            if (startingHourModified.value !== startingHour.value) {
              timeTableModified.startingHour = startingHourModified.value;
            }
            if (finishingHourModified.value !== finishingHour.value) {
              timeTableModified.finishingHour = finishingHourModified.value;
            }
            modifiedRestaurant = {
              ...modifiedRestaurant,
              timeTable: [timeTableModified]
            }
          }

          if (timePeriodModified.value !== timePeriod.value || numberOfTablesModified.value !== numberOfTables.value) {
            const availableModified: available = {
              timePeriod: timePeriod.value,
              numberOfTables: numberOfTables.value
            }
            if (timePeriodModified.value !== timePeriod.value) {
              if (typeof timePeriodModified.value === 'number') {
                availableModified.timePeriod = timePeriodModified.value.toString();
              }
            }
            if (numberOfTablesModified.value !== numberOfTables.value) {
              availableModified.numberOfTables = numberOfTablesModified.value;
            }
            modifiedRestaurant = {
              ...modifiedRestaurant,
              available: [availableModified]
            }
          }

          if (menuModified.value.length > 0) {
            const menuBase64 = await this.convertFileToBase64(menuModified.value[0]);
            modifiedRestaurant = {
              ...modifiedRestaurant,
              menu: menuBase64
            }
          }

          if (profilePictureModified.length > 0) {
            const profilePictureBase64 = await this.convertFileToBase64(profilePictureModified[0]);
            modifiedRestaurant = {
              ...modifiedRestaurant,
              profilePicture: profilePictureBase64
            }
          }

          if (picturesModified.length > 0) {
            const picturesBase64 = [];
            for (let i = 0; i < picturesModified.length; i++) {
              const pictureBase64 = await this.convertFileToBase64(picturesModified[i]);
              picturesBase64.push(pictureBase64);
            }
            modifiedRestaurant = {
              ...modifiedRestaurant,
              pictures: picturesBase64
            }
          }





          // CONTINUAR POR AQUÍ




      

          
          this.processingRegister = true;
          // const response = await axios.put(`${baseUrl}users/?token=${useAuthStore().getToken()}&userName=${useAuthStore().user.username}`, modifiedUser);
          
          //! ****** SÓLO PASAR LOS ATRIBUTOS MODIFICADOS, NO TODOS
          const response = await axios.put(`${baseUrl}restaurants/?token=${useAuthStore().getToken()}&userName=${useAuthStore().user.username}`, modifiedRestaurant);
          this.processingRegister = false;
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
  
          console.error('Error al realizar la solicitud:', response.status, response.statusText);
          console.error('Código de error:', response.data.code);
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

  
  </script>