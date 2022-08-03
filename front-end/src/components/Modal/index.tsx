import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface ModalProps {
    open: boolean;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
    text: string
}

const CustomizedModal: React.FC<ModalProps> = ({
    open,
    onClose,
    onCancel,
    onConfirm,
    text
}) => {
    return (
        <div>

            <Modal
                open={open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{
                    ...style,
                    width: 500,
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <Typography variant="h4">
                            Delete
                        </Typography>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            color="primary">
                            Close
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant="h4">
                            {text}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 5,
                        }}
                    >
                        <Button
                            onClick={onCancel}
                            variant="contained"
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            variant="contained"
                            color="primary"
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
export default CustomizedModal;
