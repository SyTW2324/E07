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
        returnUrl: null,
    }),
    actions: {
        async login(username: string, passwordInput: string): Promise<{code: number, message: string}> {
            try {

                const result = await fetchWrapper.post(`${baseUrl}login/authenticate`, { userName: username, password: passwordInput });

                // update pinia state
                if (result.username) {
                    this.user = result;
                    // console.log("result", result);

        
                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(result));
                    localStorage.setItem('profilePhoto', result.profilePhoto);
                    localStorage.setItem('profilePicture', result.profilePicture);

                    // redirect to previous url or default to home page
                    
                    router.push('/home-base'); // cambio para que lleve a la home-base
                    return {code: 0, message: "Usuario logeado"};
                } else {
                    return result;
                }
            } catch (error) {
                console.log(error);

                return {code: 5, message: error as string};
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('profilePhoto');
            localStorage.removeItem('profilePicture');
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
                // console.log(now);
                // console.log(exp);
                if (now < exp) {
                    return true;
                }
            }
            return false;
        },
        getToken(){
            const user = JSON.parse(localStorage.getItem('user') ?? 'null');
            return user.token;
        },
        getProfilePhoto(){
            const profilePhoto = localStorage.getItem('profilePhoto');
            return profilePhoto;
        },
        getProfilePhotoRestaurant(){
            const profilePhoto = localStorage.getItem('profilePicture');
            console.log(profilePhoto);
            return profilePhoto;
        }
        
    }
});