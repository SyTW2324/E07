import { defineStore } from 'pinia';

import { jwtDecode } from 'jwt-decode';

import { baseUrl } from '../env/env-variables.ts';
  
import router from "../router/index.ts";

import axios from 'axios';

//const baseUrl = `http://10.6.128.143:8081/login`;





export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user') ?? 'null'),
        password: "",
        returnUrl: null,
    }),
    actions: {
        async login(username: string, passwordInput: string): Promise<{code: number, message: string}> {
            try {

                const result = await axios.post(`${baseUrl}login/authenticate`, { userName: username, password: passwordInput });
                if (result.data.code == 0) {
                    // {username: data.message.username, token: data.message.accessToken, tipo: data.message.tipo, profilePhoto: data.message.profilePhoto, pictures: data.message.pictures}
                    const resultUser = {
                        username: result.data.message.username,
                        token: result.data.message.accessToken,
                        tipo: result.data.message.tipo,
                        profilePhoto: result.data.message.profilePhoto,
                        pictures: result.data.message.pictures
                    }
                    this.user = resultUser;
                    this.password = result.data.message.password;
                    localStorage.setItem('user', JSON.stringify(resultUser));
                    localStorage.setItem('profilePhoto', resultUser.profilePhoto);

                    if (this.user.tipo === 'user') {
                        router.push('/home-base'); // cambio para que lleve a la home-base
                    }
                    else if (this.user.tipo === 'restaurant') {
                        router.push('/home-restaurants');
                    }
                    return {code: 0, message: "Usuario logeado"};
                }
                else {
                    return {code: result.data.code, message: result.data.message};
                }
            } catch (error) {

                if (axios.isAxiosError(error) && error.response) {
                    const response = error.response;
                    if (response.status === 400 ) {
                      if (response.data.code === 4) {
                        return {code: 4, message: response.data.message};
                      } else if (response.data.code === 1) {
                        return {code: 1, message: response.data.message};
                      } else {
                        return {code: 5, message: response.data.message};
                      }
                    } else {
                      return {code: 5, message: error.message};
                      // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario.
                    } 
                } else {
                    return {code: 5, message: error as string};
                    // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario.
                }
            }
        },
        async reLogin(username: string, passwordInput: string): Promise<{code: number, message: string}> {
            try {
                this.user = null;
                localStorage.removeItem('user');
                localStorage.removeItem('profilePhoto');
                const result = await axios.post(`${baseUrl}login/authenticate`, { userName: username, password: passwordInput });
                if (result.data.code == 0) {
                    // {username: data.message.username, token: data.message.accessToken, tipo: data.message.tipo, profilePhoto: data.message.profilePhoto, pictures: data.message.pictures}
                    const resultUser = {
                        username: result.data.message.username,
                        token: result.data.message.accessToken,
                        tipo: result.data.message.tipo,
                        profilePhoto: result.data.message.profilePhoto,
                        pictures: result.data.message.pictures
                    }
                    this.user = resultUser;
                    this.password = result.data.message.password;
                    localStorage.setItem('user', JSON.stringify(resultUser));
                    localStorage.setItem('profilePhoto', resultUser.profilePhoto);

                    if (this.user.tipo === 'user') {
                        router.push('/home-base'); // cambio para que lleve a la home-base
                    }
                    else if (this.user.tipo === 'restaurant') {
                        router.push('/home-restaurants');
                    }
                    return {code: 0, message: "Usuario logeado"};
                }
                else {
                    return {code: result.data.code, message: result.data.message};
                }
            } catch (error) {

                if (axios.isAxiosError(error) && error.response) {
                    const response = error.response;
                    if (response.status === 400) {
                      if (response.data.code === 4) {
                        return {code: 4, message: response.data.message};
                      } else if (response.data.code === 1) {
                        return {code: 1, message: response.data.message};
                      } else {
                        return {code: 5, message: response.data.message};
                      }
                    } else {
                      return {code: 5, message: error.message};
                      // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario.
                    } 
                } else {
                    return {code: 5, message: error as string};
                    // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario.
                }
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
        getPassWord(): string{
            return this.password;
        }
        
    }
});