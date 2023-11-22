import { defineStore } from 'pinia';

import  {fetchWrapper}  from '../_helpers/fetch-wrapper.ts'; 
  
  import router from "../router/index.ts";

  const baseUrl = `http://localhost:3000/login`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user') ?? 'null'),
        returnUrl: null
    }),
    actions: {
        async login(username: string, passwordInput: string) {
            const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { userName: username, password: passwordInput });

            // update pinia state
            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});