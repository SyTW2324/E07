import {defineStore} from 'pinia';
import { th } from 'vuetify/locale';



export const useUserStore = defineStore('User', {
  // other options...
  state: () =>({
    userName: "userName",
    password: "password",
    email: "email",
    profilePicture: ""
  }),
  actions: {
    setUserName(userName: string) {
      this.userName = userName;
    },
    setPassword(password: string) {
      this.password = password;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setProfilePicture(profilePicture: Buffer) {
      const image64: string = profilePicture.toString('base64');
      const dataURL: string = `data:image/png;base64,${image64}`;
      this.profilePicture = dataURL;
    }
  },
  getters: {
    getUserName(): string {
      return this.userName;
    },
    getPassword(): string {
      return this.password;
    },
    getEmail(): string {
      return this.email;
    },
    getProfilePicture(): string {
      const dataURL: string = `data:image/png;base64,${this.profilePicture}`;
      return dataURL;
    }
  }
})