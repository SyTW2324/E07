<!-- <template>
  <div>
    <label for="restaurant">Establecimiento:</label>
    <input type="text" v-model="reservation.restaurant" id="restaurant" />

    <label for="client">Cliente:</label>
    <input type="text" v-model="reservation.clientUserName" id="client" />

    <label for="numberOfPeople">Número de personas:</label>
    <input type="number" v-model="reservation.numberOfPeople" id="numberOfPeople" />

    <label for="date">Fecha:</label>
    <input type="date" v-model="reservation.date" id="date" /> -->

    <!-- Otros campos del formulario -->
<!-- 
    <button @click="submitReservation">Enviar reserva</button>
  </div>
</template>

<script>
import { Reservation } from "./reservation";

export default {
  data() {
    return {
      reservation: {
        restaurant: "",
        clientUserName: "",
        numberOfPeople: 0,
        date: new Date(),
        availability: {
          start: new Date(),
          finish: new Date(),
          startingHour: "",
          finishingHour: "",
          numberOfPeople: 0,
        },
        // Otros campos relacionados con la reserva según tus necesidades
      },
    };
  },
  methods: {
    submitReservation() {
      // Puedes realizar validaciones adicionales antes de enviar la reserva al backend
      console.log("Reserva enviada", this.reservation);
    },
  },
};
</script> -->
