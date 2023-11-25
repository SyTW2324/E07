
import { useAuthStore } from '../stores/useAuthStore';

interface RequestOptions {
    method: string;
    headers: Record<string, string>;
    body?: string;
}

interface User {
    token: string;
    // Add other user properties if needed
}

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string) {
    return (url: string, body?: any) => {
        const requestOptions: RequestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url: string): Record<string, string> {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response: Response): Promise<any> {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(response);
        console.log(data);
        if (!response.ok) {
            const { user, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && user) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        const user = {username: data.message.username, token: data.message.accessToken, tipo: data.message.tipo};
        // aquí se guarda el token en el store
        return user;
    });
}
