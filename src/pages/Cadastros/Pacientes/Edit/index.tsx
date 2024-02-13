import React from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
}

const EditCreatePaciente: React.FC<ModalProps> = ({ open, handleClose }) => {
    const [paciente, setPaciente] = React.useState<IPaciente>({
        nom_paciente: '',
        email: '',
        cpf: '',
        telefone: '',
        data_nasc: undefined,
        nom_profissao: '',
        flg_sexo: '',
        flg_tiposang: '',
        endereco: '',
        flg_est_civil: '',
        obs: '',
        nom_responsavel: '',
        cpf_resp: '',
        id_convenio: undefined,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPaciente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(paciente);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '8px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Novo Paciente
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ ml: 'auto' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="nom_paciente"
                        label="Nome do Paciente"
                        value={paciente.nom_paciente}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={paciente.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="cpf"
                        label="CPF"
                        value={paciente.cpf}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="telefone"
                        label="Telefone"
                        value={paciente.telefone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="data_nasc"
                        label="Data de Nascimento"
                        type="date"
                        value={paciente.data_nasc}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="nom_profissao"
                        label="Profissão"
                        value={paciente.nom_profissao}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="flg_sexo"
                        select
                        label="Sexo"
                        value={paciente.flg_sexo}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value="F">Feminino</MenuItem>
                        <MenuItem value="O">Outro</MenuItem>
                    </TextField>
                    {/* Adicione os outros campos aqui */}
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Salvar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default EditCreatePaciente;
