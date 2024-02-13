
import { StyledCard } from "../../../components/Card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BadgeButton } from "../../../components/BadgeBtn";
import { IUsuario } from "../../../interfaces/Usuario";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import UsuarioService from "../../../services/Usuarios";
import ModalComponent from "./Edit";

function Pacientes() {
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
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
    { field: "id_paciente", headerName: "ID", width: 70 },
    { field: "nom_paciente", headerName: "Nome do Paciente", width: 200 },
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "cpf", headerName: "CPF", width: 150 },
    { field: "telefone", headerName: "Telefone", width: 150 },
    { field: "data_nasc", headerName: "Data de Nascimento", width: 150 },
    
    { field: "nom_profissao", headerName: "Profissão", width: 150 },
    { field: "flg_sexo", headerName: "Sexo", width: 70 },
    { field: "flg_tiposang", headerName: "Tipo Sanguíneo", width: 70 },
    { field: "endereco", headerName: "Endereço", width: 250 },
    { field: "flg_est_civil", headerName: "Estado Civil", width: 70 },
    { field: "obs", headerName: "Observação", width: 200 },
    
    { field: "nom_responsavel", headerName: "Nome do Responsável", width: 200 },

    { field: "cpf_resp", headerName: "CPF do Responsável", width: 150 },
    { field: "id_convenio", headerName: "Convênio", width: 250 },
  ];


  return (
    <StyledCard style={{overflowY: 'scroll'}}>
      <ModalComponent open={open} handleClose={handleClose}/>
      <h1>Cadastro de Pacientes</h1>
      <Button
        className="m-3 btn-success-color"
        startIcon={<AddBoxIcon />}
        variant="contained" color="success"
        onClick={handleOpen}>
        CADASTRAR NOVO PACIENTE
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

export default Pacientes;
