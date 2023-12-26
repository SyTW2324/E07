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
                :multiple="false"
                :maxSize="1024*1024*2"
              ></v-file-input>
            </v-col>


            <v-row class="d-flex">
              <!-- Días de la semana -->
              <v-col cols="12">
                <label>Días de la semana:</label>
                <v-row>
                  <v-col v-for="day in daysOfWeek" :key="day" cols="1.5">
                    <v-checkbox 
                    v-model="timetable.selectedDays" 
                    :label="day" 
                    :value="day"
                    required>
                  </v-checkbox>
                  </v-col>
                </v-row>
                <v-col cols="12" v-if="timetable.selectedDays.length < 1">
                  <v-alert
                    v-model="timetabledaysError"
                    type="warning"
                    class="my-custom-alert"
                  >
                    Debe seleccionar al menos un día de la semana.
                  </v-alert>
                </v-col>
              </v-col>
            </v-row>


            <!-- Hora de inicio -->
            <v-col cols="4">
              <label>Hora de inicio:</label>
              <v-text-field
              id="horaInicio" 
              v-model="timetable.startingHour" 
              type="time"
              required
              ></v-text-field>
              <v-col cols="12" v-if="timetable.startingHour === null || timetable.startingHour === undefined || timetable.startingHour ===''">
                <v-alert
                  v-model="timetablestartError"
                  type="warning"
                  class="my-custom-alert"
                >
                  Este campo es obligatorio.
                </v-alert>
              </v-col>
            </v-col>

            <!-- Hora de finalización -->
            <v-col cols="4">
              <label>Hora de finalización:</label>
              <v-text-field
              id="horaFin" 
              v-model="timetable.finishingHour" 
              type="time"
              required
              ></v-text-field>
              <v-col cols="12" v-if="timetable.finishingHour === null || timetable.finishingHour === undefined || timetable.finishingHour === ''">
                <v-alert
                  v-model="timetableendError"
                  type="warning"
                  class="my-custom-alert"
                >
                  Este campo es obligatorio.
                </v-alert>
              </v-col>
            </v-col>

            <!-- es un pdf, tamaño máximo 10mb -->
            <v-col cols="12" md="4"> 
              <v-file-input
                v-model="menu"
                label="Menú"
                accept="application/pdf"
                placeholder="Seleccione un pdf"
                :multiple="false"
                :maxSize="1024*1024*10" 
                @change="onFileChange"
              ></v-file-input>
              <!-- warning -->
              <v-alert v-if="exceedsSizeLimit" type="warning" class="my-custom-alert">
                El tamaño del archivo no debe exceder los 10 MB.
              </v-alert>
            </v-col>


            <!-- franja de tiempo por reserva -->
            <v-col cols="12" md="4">
              <label>Tiempo de franja de reserva (minutos)*:</label>
              <v-text-field 
              id="franjaTiempo" 
              v-model="available.timePeriod" 
              type="number"
              required
              ></v-text-field>
              <v-col cols="12" v-if="available.timePeriod < 1 || available.timePeriod === null">
                <v-alert
                  v-model="timePeriodError"
                  type="warning"
                  class="my-custom-alert"
                >
                  El tiempo de franja de reserva debe ser mayor que 0.
                </v-alert>
              </v-col>
            </v-col>


            <!-- Número de mesas -->
            <v-col cols="12" md="4">
              <label>Número de mesas por franja horaria*:</label>
              <v-text-field 
              id="numberOfTables"
              v-model="available.numberOfTables" 
              type="number"
              required
              ></v-text-field>
              <v-col cols="12" v-if="available.numberOfTables < 1">
                <v-alert
                  v-model="numberOfTablesError"
                  type="warning"
                  class="my-custom-alert"
                >
                  El número de mesas por franja horaria debe ser mayor que 0.
                </v-alert>
              </v-col>
            </v-col>

            <!-- imágenes del establecimiento, tamaño máximo 4mb cada una-->
            <v-col cols="12" md="4">
              <v-file-input
                v-model="pictures"
                label="Imágenes de portada del establecimiento"
                accept="image/*"
                placeholder="Seleccione una imagen"
                multiple
                :maxSize="1024*1024*4"
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
        <br>
        - Número de mesas por franja horaria: El número de mesas por franja horaria debe ser mayor que 0.
        <br>
        - Tiempo de franja de reserva: El tiempo de franja de reserva debe ser mayor que 0.
        <br>
        - Días de la semana: Debe seleccionar al menos un día de la semana.
        <br>
        - Hora de inicio: Este campo es obligatorio.
        <br>
        - Hora de finalización: Este campo es obligatorio.

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
  import { ref } from 'vue';

  const exceedsSizeLimit = ref(false);
  let numberOfTablesError = true;
  let timePeriodError = true;
  let timetabledaysError = true;
  let timetablestartError = true;
  let timetableendError = true;


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
          selectedDays: ['Viernes', 'Sábado', 'Domingo'], //por defecto para que no se quede vacío y salte el warning
          startingHour: '12:00',
          finishingHour: '16:00',
        },
        daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    
        timetableRules: [
          (value: string) => {
            if (value) return true;
  
            return 'El horario es obligatorio.';
          },
        ] as ((value: string) => true | string)[], // Asigna un tipo a timetableRules
        category: 'asador',
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
          timePeriod: 30,
          numberOfTables: 10,
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
      checkFileSize(file: File) {
        console.log('tamaño del fichero: ', file.size);
        if (file.size > 1024*1024*6) {
          exceedsSizeLimit.value = true;
        } else {
          exceedsSizeLimit.value = false;
        }
      },
      onFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target && target.files && target.files[0]) {
          const file = target.files[0];
          if (file.size > 1024 * 1024 * 6) {
            exceedsSizeLimit.value = true;
          } else {
            exceedsSizeLimit.value = false;
          }
        }
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



          // const textContainer = this.$refs.textContainer as HTMLElement;
      
          // Crea un elemento de imagen
          const textElement = document.createElement('h3');
          textElement.innerText = ' ';

          let photoBase64_profile: string = ' ';
          let photoBase64_pictures: string[] = [];
          if (this.pictures.length > 0) {
            for (let i = 0; i < this.pictures.length; i++) {
              photoBase64_pictures[i] = await this.convertFileToBase64(this.pictures[i]) as string;
            }
          }
          if (this.profilePicture.length == 1) {
            photoBase64_profile = await this.convertFileToBase64(this.profilePicture[0]) as string;
          }
          
          let pdfBase64: string = ' ';
          if (this.menu.length == 1) {
            pdfBase64 = await this.convertFileToBase64(this.menu[0]) as string;
          }

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
            "profilePicture": photoBase64_profile,
            "pictures": photoBase64_pictures,
            "menu": pdfBase64,
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

        if (exceedsSizeLimit.value === true) {
          console.log('El tamaño del archivo excede los 6 MB, no se puede enviar');
          return false;
        }
  
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

        // comprobar dias de la semana
        if (this.timetable.selectedDays.length < 1) {
          // console.log('Debe seleccionar al menos un día de la semana');
          timetabledaysError = false;
        } else {
          // console.log('Días de la semana seleccionados correctamente');
          timetabledaysError = true;
        }

        // comprobar franja horaria
        if (this.timetable.startingHour === null || this.timetable.startingHour === undefined || this.timetable.startingHour === '') {
          console.log('Debe seleccionar una hora de inicio');
          timetablestartError = false;
        } else {
          console.log('Hora de inicio seleccionada correctamente');
          timetablestartError = true;
        }

        if (this.timetable.finishingHour === null || this.timetable.finishingHour === undefined || this.timetable.finishingHour === '') {
          console.log('Debe seleccionar una hora de finalización');
          timetableendError = false;
        } else {
          console.log('Hora de finalización seleccionada correctamente');
          timetableendError = true;
        }


        // comprobar tiempo de franja de reserva
        if (this.available.timePeriod < 1) {
          // console.log('El tiempo de franja de reserva debe ser mayor que 0');
          timePeriodError = false;
        } else {
          // console.log('El tiempo de franja de reserva es correcto');
          timePeriodError = true;
        }

        // comprobar número de mesas
        if (this.available.numberOfTables < 1) {
          numberOfTablesError = false;
        } else {
          numberOfTablesError = true;
        }

        //! FALTA COMPROBAR OTROS PARÁMETROS COMO EL NOMBRE DE USUARIO
  
        // Actualizar el estado "valid" si es necesario
        this.valid = isEmailValid && isPhoneValid && isPasswordValid && numberOfTablesError && timetabledaysError && timetablestartError && timetableendError && timePeriodError;
        return this.valid;
      },
    },
    };
  </script>