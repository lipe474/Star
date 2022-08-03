import { Typography } from "@mui/material";


interface Props {
    text: string;
    children?: React.ReactNode;
}




export const Required = ({ text, children }: Props) => {
    return (
        <Typography>
            {text} {' '}
            <Typography variant="caption" component="span" sx={{ color: 'error.main', fontSize: '15px' }}>
                *
            </Typography>
        </Typography>
    );
}




