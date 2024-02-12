import { IEmpresa } from "./Empresa";
import { IUsuario } from "./Usuario";

export interface IAuthData {
    success: boolean;
    usuario: IUsuario;
    empresa: {
        dadosEmpresa: IEmpresa;
    };
}