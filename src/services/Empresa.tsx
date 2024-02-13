import { IEmpresa } from "../interfaces/Empresa";

interface IEmpresaService {
    getEmpresas: () => Promise<IEmpresa[]>;
  }
  
const VITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL


  const EmpresaService: IEmpresaService = {
    getEmpresas: async () => {
      
      try {
        const response = await fetch(`${VITE_REACT_APP_API_URL}/empresas/get_empresas`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erro ao buscar os dados do endpoint:', error);
        throw error;
      }
    },
  };
  
  export default EmpresaService;
  