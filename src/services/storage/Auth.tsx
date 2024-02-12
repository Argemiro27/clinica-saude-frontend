import { IAuthData } from "../../interfaces/AuthData";

class StorageAuthService {
    static getUsuarioLoggedData = (): IAuthData | null => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData: IAuthData = JSON.parse(userDataString);
            return userData;
        }
        return null;
    };
}

export default StorageAuthService;
