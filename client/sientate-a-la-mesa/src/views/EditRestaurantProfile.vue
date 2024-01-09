<template>

  <v-app>
    <Barnav></Barnav>
    <v-main v-if="pageIsLoaded == false">
      <v-container class="d-flex align-center justify-center" style="padding-top: 15em; padding-bottom: 5em;">
            <v-progress-circular
            indeterminate
            size="150" 
            color="teal"></v-progress-circular> 
      </v-container>
    </v-main>
    <v-main v-if="pageIsLoaded == true">
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
                required
                hide-details

              ></v-select>
            </v-col>

  
            <v-col cols="12" md="4">
              <v-text-field
                id="email"
                v-model="emailModified"
                label="Correo electrónico*"
                hide-details
                required
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="phone"
                v-model="phoneModified"
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
                readonly
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4" class="d-flex align-center justify-space-between">
              <v-text-field v-if="showPassword == false"
              id="password"
              v-model="passwordModified"
              label="Contraseña*"
              type="password"
              hide-details
              required
              ></v-text-field>
              <v-text-field v-else
              id="password"
              v-model="passwordModified"
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
              ></v-text-field>
            </v-col>

            <!-- Hora de finalización -->
            <v-col cols="4">
              <label>Hora de finalización*:</label>
              <v-text-field 
              id="horaFin" 
              v-model="finishingHourModified" 
              type="time"
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
              >
            </v-text-field>
            </v-col>

            <!-- Número de mesas -->
            <v-col cols="12" md="4">
              <label>Número de mesas por franja horaria*:</label>
              <v-text-field 
              id="numberOfTables"
              v-model="numberOfTablesModified" 
              type="number"
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

      <!-- Alertas -->
      <v-container class="d-flex align-center justify-center" style="min-height: 10px">
        <v-container class="my-custom-container" style="width: 100%; height: 100%">

          <v-alert v-if="!validRequest" type="error" closable class="my-custom-alert2">
            Error al realizar la solicitud
          </v-alert>
          
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
            El número de imágenes máximo es 4.
          </v-alert>
          <v-alert v-if="userRegistered == true" type="success" closable class="my-custom-alert">
            Perfil modificado correctamente.
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
  
  import axios from 'axios';
  import { baseUrl } from '../env/env-variables';
  import { useAuthStore } from '../stores/useAuthStore';
  import { ref } from 'vue';
  import router from '../router';


  let username = ref('');

  let password = ref(useAuthStore().getPassWord());
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
  let passwordModified = ref(useAuthStore().getPassWord());
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
  let timePeriodModified = ref(0);
  let numberOfTablesModified = ref(0);
  let profilePictureModified: File[] = [];



  let processingRegister = ref(false);
  // let valid = ref(true);
  let validRequest = ref(true);
  let validUserName = ref(true);
  let validUserName2 = ref(true);
  let validEmail = ref(true);
  let validEmail2 = ref(true);
  let validPhone = ref(true);
  let validPhone2 = ref(true);
  let validRestaurantName = ref(true);
  let validAddress = ref(true);
  let validCategory = ref(true);
  let validPassword = ref(true);
  let validWeekDays = ref(true);
  let validStartingHour = ref(true);
  let validFinishingHour = ref(true);
  let validTimePeriod = ref(true);
  let validNumberOfTables = ref(true);
  let validMenu = ref(true);
  let validProfilePicture = ref(true);
  let validPictures = ref(true);
  let userRegistered = ref(false);
  let showPassword = ref(true);

  let daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  let categories: string[] = ['asador', 'cafeteria', 'chino', 'comida rapida', 'español', 'hindu', 'italiano', 'japones', 'mexicano', 'pizzeria', 'vegetariano'];


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

            // password.value = useAuthStore().user.username
            // passwordModified.value = password.value;

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
            timePeriodModified.value = timePeriod.value as unknown as number;
            numberOfTablesModified.value = numberOfTables.value as unknown as number;
            descriptionModified.value = description.value;



          } 
          else {
            authStore.logout();
          }
          pageIsLoaded.value = true;
      } else {
        authStore.logout();
      }
    } else {
      authStore.logout();
    }

  }

  getRestaurant();

  function checkPassword(): boolean {
    if (passwordModified.value.length >= 8 && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/).test(passwordModified.value)) {
      return true;
    } else {
      return false;
    }
  }

  function checkEmail(): boolean {
    if ((/.+@.+\..+/).test(emailModified.value)) {
      return true;
    } else {
      return false;
    }
  }

  async function submitForm() {
    try {
      processingRegister.value = true;
      validUserName.value = true;
      validEmail.value = true;
      validPhone.value = true;

      validRequest.value = true;
      validUserName.value = true;
      validUserName2.value = true;
      validEmail.value = true;
      validEmail2.value = true;
      validPhone.value = true;
      validPhone2.value = true;
      validRestaurantName.value = true;
      validAddress.value = true;
      validCategory.value = true;
      validPassword.value = true;
      validWeekDays.value = true;
      validStartingHour.value = true;
      validFinishingHour.value = true;
      validTimePeriod.value = true;
      validNumberOfTables.value = true;
      validMenu.value = true;
      validProfilePicture.value = true;
      validPictures.value = true;


      
      let modifiedRestaurant = {}

      if (passwordModified.value !== password.value) {
        if (checkPassword()) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            passwd: passwordModified.value
          }
          validPassword.value = true;
        } else {
          validPassword.value = false;
          return
        }
      }


      if (restaurantnameModified.value !== restaurantname.value) {
        // comprobamos que no esté vacío
        if (restaurantnameModified.value.length > 0) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            restaurantName: restaurantnameModified.value
          }
          validRestaurantName.value = true;
        } else {
          validRestaurantName.value = false;
          return
        }
      }

      if (emailModified.value !== email.value) {
        if (checkEmail()) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            email: emailModified.value
          }
          validEmail.value = true;
        } else {
          validEmail.value = false;
          return
        }
      }

      if (phoneModified.value !== phone.value) {
        if ((/^\d{9}$/).test(phoneModified.value)) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            phoneNumber: phoneModified.value
          }
          validPhone.value = true;
        } else {
          validPhone.value = false;
          return
        }
      }

      if (addressModified.value !== address.value) {
        if (addressModified.value.length > 0) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            restaurantAddress: addressModified.value
          }
          validAddress.value = true;
        } else {
          validAddress.value = false;
          return
        }
      }

      if (categoryModified.value !== category.value) {
        if (categoryModified.value.length > 0) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            category: categoryModified.value
          }
          validCategory.value = true;
        } else {
          validCategory.value = false;
          return
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
          selectedDays: selectedDaysModified.value,
          startingHour: startingHourModified.value,
          finishingHour: finishingHour.value
        }

        if (selectedDaysModified.value.length === 0) {
          validWeekDays.value = false;
        }
        
        if (startingHourModified.value.length === 0) {
          validStartingHour.value = false;
        }

        if (finishingHourModified.value.length === 0) {
          validFinishingHour.value = false;
        }
        
        if (validWeekDays.value === true || validStartingHour.value === true || validFinishingHour.value === true) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            timeTable: [timeTableModified]
          }
        } else {
          return
        }
      }

      

      if (timePeriodModified.value !== Number(timePeriod.value) || numberOfTablesModified.value !== Number(numberOfTables.value)) {
        console.log('parte 1')
        const availableModified: available = {
          timePeriod: Number(timePeriodModified.value),
          numberOfTables: Number(numberOfTablesModified.value)
        }
        
        if (availableModified.timePeriod <= 0 ) {
          validTimePeriod.value = false;
        }

        if (availableModified.numberOfTables <= 0 ) {
          validNumberOfTables.value = false;
        }

        if (validTimePeriod.value === true || validNumberOfTables.value === true) {
          modifiedRestaurant = {
            ...modifiedRestaurant,
            availability: [availableModified]
          }
        } else {
          return
        }
      }

      if (menuModified.value.length > 0) {
        // tamaño máximo = 4mb
        if ((menuModified.value[0] as File).size > 1024*1024*4) {
          validMenu.value = false;
          return
        } else {
          const menuBase64 = await convertFileToBase64(menuModified.value[0]);
          modifiedRestaurant = {
            ...modifiedRestaurant,
            menu: menuBase64
          }
        }
      }

      if (profilePictureModified.length > 0) {
        // tamaño máximo = 2mb
        if ((profilePictureModified[0] as File).size > 1024*1024*2) {
          validProfilePicture.value = false;
          return
        } else {
          const profilePictureBase64 = await convertFileToBase64(profilePictureModified[0]);
          modifiedRestaurant = {
            ...modifiedRestaurant,
            profilePicture: profilePictureBase64
          }
        }
      }

      if (picturesModified.length > 0) {
        // tamaño máximo = 2mb
        // máximo 4 fotos
        const picturesBase64 = [];
        if (picturesModified.length > 4) {
          validPictures.value = false;
          return
        } 
        else {
          for (let i = 0; i < picturesModified.length; i++) {
            if ((picturesModified[i] as File).size > 1024*1024*2) {
              validPictures.value = false;
              return
            } 
            else {
              const pictureBase64 = await convertFileToBase64(picturesModified[i]);
              picturesBase64.push(pictureBase64);
    
            }
          }
          modifiedRestaurant = {
            ...modifiedRestaurant,
            pictures: picturesBase64
          }
        }
      }
      
      if (!validUserName.value ||
        !validUserName2.value ||
        !validEmail.value ||
        !validEmail2.value ||
        !validPhone.value ||
        !validPhone2.value ||
        !validRestaurantName.value ||
        !validAddress.value ||
        !validCategory.value ||
        !validPassword.value ||
        !validWeekDays.value ||
        !validStartingHour.value ||
        !validFinishingHour.value ||
        !validTimePeriod.value ||
        !validNumberOfTables.value ||
        !validMenu.value ||
        !validProfilePicture.value ||
        !validPictures.value) {
          console.log('validaciones incorrectas')
          return
      }
      else {
        console.log('validaciones correctas')
        const response = await axios.put(`${baseUrl}restaurants/?token=${useAuthStore().getToken()}&userName=${useAuthStore().user.username}`, modifiedRestaurant);
        processingRegister.value = false;
  
        // Añade la imagen al contenedor
        if (response.data.code === 0) {
          userRegistered.value = true;
          const authStore = useAuthStore();
          await authStore.reLogin(username.value, passwordModified.value);
          router.push('/my-profile-restaurants');
        }
      }
      
    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const response = error.response;
        if (response.status === 400) {
          if (response.data.code === 3) {
            validEmail.value = false;
          } else if (response.data.code === 4) {
            validPhone.value = false;
          } else if (response.data.code === 1) {
            console.log('Error al realizar la solicitud:', error.message);
            validRequest.value = false;
          } 
          else {
            console.error('Error al realizar la solicitud:', error.message);
            validRequest.value = false;
  
          }
        } else {
          console.error('Error al realizar la solicitud:', error.message);
          validRequest.value = false;
        } 
      } else {
        console.error('Error al realizar la solicitud');
        validRequest.value = false;
      }
    }  
  }

  
  

  async function convertFileToBase64(file: File){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload =  () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  function controlShowPassword() {
    showPassword.value = !showPassword.value;
  }
  </script>