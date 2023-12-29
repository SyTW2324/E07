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

        
                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(result));
                    localStorage.setItem('profilePhoto', result.profilePhoto);
                    // localStorage.setItem('pictures', JSON.stringify(result.pictures));
                    


                    // redirect to previous url or default to home page
                    if (this.user.tipo === 'user') {
                        router.push('/home-base'); // cambio para que lleve a la home-base
                    } else if (this.user.tipo === 'restaurant') {
                        router.push('/home-restaurants');
                    }
                    return {code: 0, message: "Usuario logeado"};
                } else {
                    return result;
                }
            } catch (error) {

                return {code: 5, message: error as string};
            }
        },
        async loginAfterEdit(username: string, passwordInput: string): Promise<{code: number, message: string}> {
            try {

                const result = await fetchWrapper.post(`${baseUrl}login/authenticate`, { userName: username, password: passwordInput });

                // update pinia state
                if (result.username) {
                    this.user = result;

        
                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(result));
                    localStorage.setItem('profilePhoto', result.profilePhoto);
                    localStorage.setItem('pictures', JSON.stringify(result.pictures));
                    


                    // redirect to previous url or default to home page
                    if (this.user.tipo === 'user') {
                        router.push('/my-profile'); // cambio para que lleve a la home-base
                    } else if (this.user.tipo === 'restaurant') {
                        router.push('/my-profile-restaurant');
                    }
                    return {code: 0, message: "Usuario logeado"};
                } else {
                    return result;
                }
            } catch (error) {

                return {code: 5, message: error as string};
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('profilePhoto');
            // localStorage.removeItem('pictures');
            router.push('/login');
        },
        isExpired() {
            const user = JSON.parse(localStorage.getItem('user') ?? 'null');
            let exp = 0;

            if (user) {
                const decoded = jwtDecode(user.token);
                if (decoded) {
                    exp = Number(decoded.exp);
                } 
                const now = Date.now() / 1000;

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
        // getPictures(): string[] | null {
        //     const pictures = localStorage.getItem('pictures');
        //     return pictures ? JSON.parse(pictures) : null;
        // }
          
        
    }
});