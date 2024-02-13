import { IAuthData } from "../interfaces/AuthData";
import { IUsuario } from "../interfaces/Usuario";
import StorageAuthService from "./storage/Auth";


interface IUsuarioService {
  getUsuarios: () => Promise<IUsuario[]>;
}
const VITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL

const dadosAuth: IAuthData | null = StorageAuthService.getUsuarioLoggedData();

console.log(dadosAuth);

const id_empresa = dadosAuth?.empresa.dadosEmpresa.id_empresa;

console.log("EMPRESA: ",id_empresa)

const UsuarioService: IUsuarioService = {
  getUsuarios: async () => {
    
    console.log("LINK DO REACT APP URL",VITE_REACT_APP_API_URL)
    if (!id_empresa) {
      console.error('ID da empresa não está definido.');
      return []; 
    }

    console.log(id_empresa);
    try {
      const response = await fetch(`${VITE_REACT_APP_API_URL}/usuarios/get_usuarios_by_empresa/${id_empresa}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados do endpoint:', error);
      throw error;
    }
  },
};

export default UsuarioService;
