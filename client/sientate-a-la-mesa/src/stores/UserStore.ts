import {defineStore} from 'pinia';



export const useUserStore = defineStore('User', {
  // other options...
  state: () =>({
    userName: "userName",
    password: "password",
    email: "email",
    profilePicture: Buffer.from(" ")
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
      this.profilePicture = profilePicture;
    }
  }
})