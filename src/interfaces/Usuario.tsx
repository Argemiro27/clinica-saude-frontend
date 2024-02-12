export interface IUsuario {
    id_usuario: number;
    nome: string;
    email: string;
    senha: string;
    telefone?: string | null;
    endereco?: string | null;
    per_comissao?: string | null;
    num_pix?: string | null;
    url_foto?: string | null;
    id_empresa?: number | null;
    id_cargo?: number | null;
  }
  