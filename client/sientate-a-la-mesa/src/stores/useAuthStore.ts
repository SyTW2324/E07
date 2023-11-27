import { defineStore } from 'pinia';

import  {fetchWrapper}  from '../_helpers/fetch-wrapper.ts';

import { jwtDecode } from 'jwt-decode';

import { baseUrl } from '../env/env-variables.ts';
  
import router from "../router/index.ts";

//const baseUrl = `http://10.6.128.143:8081/login`;






export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user') ?? 'null'),
        returnUrl: null
    }),
    actions: {
        async login(username: string, passwordInput: string) {
            const user = await fetchWrapper.post(`${baseUrl}login/authenticate`, { userName: username, password: passwordInput });

            // update pinia state
            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            
            router.push(this.returnUrl || '/home-base'); // cambio para que lleve a la home-base
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        },
        isExpired() {
            const user = JSON.parse(localStorage.getItem('user') ?? 'null');
            let exp = 0;

            console.log(user);
            if (user) {
                console.log(user.token);
                const decoded = jwtDecode(user.token);
                console.log(decoded);
                if (decoded) {
                    exp = Number(decoded.exp);
                } 
                const now = Date.now() / 1000;
                console.log(now);
                console.log(exp);
                if (now < exp) {
                    return true;
                }
            }
            return false;
        }
        
    }
});