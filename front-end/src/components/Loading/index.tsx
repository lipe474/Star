import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    open: boolean;
}

export const LoadBackdrop: React.FC<Props> = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#ffe102', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}



