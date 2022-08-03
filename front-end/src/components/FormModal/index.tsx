import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    bgcolor: 'background.paper',
    border: '1px solid #bfc5cc',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

type Props = {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    onConfirm: () => void;
    type: 'delete' | 'edit';
}

const FormModal: React.FC<Props> = ({ open, onClose, onOpen, onConfirm, type }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Box justifyContent={'center'} display={'flex'}  >
                        <WarningAmberIcon sx={{ fontSize: 100, color: "#bfa605" }} />
                    </Box>
                    <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                        {
                            type === 'delete' ?
                                'Tem certeza que deseja excluir?'
                                :
                                'Tem certeza que deseja editar?'
                        }
                    </Typography>
                    <Box justifyContent={'center'} display={'flex'} gap={4} >
                        <Button variant='outlined' onClick={onClose}>Cancelar</Button>
                        <Button variant='contained' onClick={onConfirm}>Deletar</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}

export default FormModal
