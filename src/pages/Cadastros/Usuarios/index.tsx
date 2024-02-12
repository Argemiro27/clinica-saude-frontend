
import { StyledCard } from "../../../components/Card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BadgeButton } from "../../../components/BadgeBtn";
import { IUsuario } from "../../../interfaces/Usuario";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import UsuarioService from "../../../services/Usuarios";


function Usuarios() {
  const obterUsuarios = async (): Promise<IUsuario[]> => {
    try {
      const usuarios = await UsuarioService.getUsuarios();

      const usuarios_orderbyid = usuarios.map((usuario, index) => ({ ...usuario, id: index + 1 }));
      return usuarios_orderbyid ;
    } catch (erro) {
      console.error("Erro ao obter usuários:", erro);
      throw erro;
    }
  };

  const [usuarios, setUsuarios] = React.useState<IUsuario[]>([]);

  
  const handleEditarUsuario = (id: number) => {
    // Implemente a lógica de edição 
    console.log(`Editar usuário com ID ${id}`);
  };

  const handleRemoverUsuario = (id: number) => {
    // Implemente a lógica de remoção
    console.log(`Remover usuário com ID ${id}`);
  };
  const handleImprimirUsuario = (id: number) => {
    // Implemente a lógica de impressão 
    console.log(`Remover usuário com ID ${id}`);
  };
  React.useEffect(() => {
    obterUsuarios().then((dados) => setUsuarios(dados));
  }, []);


  const colunas: GridColDef[] = [
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <div>
          <BadgeButton
             variant="contained" color="success"
            onClick={() => handleEditarUsuario(params.row.id)}
          >
            <EditIcon />
          </BadgeButton>
          <BadgeButton
            variant="contained" color="error"
            onClick={() => handleRemoverUsuario(params.row.id)}
          >
            <DeleteIcon />
          </BadgeButton>
          <BadgeButton
            variant="contained" color="info"
            onClick={() => handleImprimirUsuario(params.row.id)}
          >
            <TextSnippetIcon />
          </BadgeButton>
        </div>
      ),
    },
    { field: "id_usuario", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Nome do Usuário", width: 200 },
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "nom_cargo", headerName: "Cargo", width: 150 },
    { field: "telefone", headerName: "Telefone", width: 150 },
    { field: "endereco", headerName: "Endereço", width: 250 },
    { field: "per_comissao", headerName: "Percentual de Comissão", width: 200 },
    { field: "num_pix", headerName: "Número PIX", width: 200 },
    { field: "url_foto", headerName: "URL da Foto", width: 250 },
  ];


  return (
    <StyledCard style={{overflowY: 'scroll'}}>
      <h1>Cadastro de Usuários</h1>
      <Button
        className="m-3 btn-success-color"
        startIcon={<AddBoxIcon />}
        variant="contained" color="success">
        CADASTRAR NOVO USUÁRIO
      </Button>

      <DataGrid
        rows={usuarios}
        columns={colunas}
        checkboxSelection
        autoHeight
        getRowId={(row) => row.id}
      />
    </StyledCard>
  );
}

export default Usuarios;
