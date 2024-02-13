import { IAuthData } from "../../interfaces/AuthData";

class StorageAuthService {
    static async deslogaUsuario() {

        setTimeout(() => {
            localStorage.clear();
            
            window.location.href = '/login';
        }, 20000);
    };

    static getUsuarioLoggedData = (): IAuthData | null => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData: IAuthData = JSON.parse(userDataString);
            // this.deslogaUsuario();
            return userData;
        }
        return null;
    };
}

export default StorageAuthService;
