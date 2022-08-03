

import { Backdrop, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { initialValues, Schema } from './schema';
import { yupResolver } from "@hookform/resolvers/yup";
import Password from '../../components/Password';
import { Required } from '../../components/Required';
// @ts-ignore: Unreachable code error
import Star from '../../assets/images/Star.png';
import { LoginSubmit } from '../../data/@types/login';
import { MaskCpf } from '../../data/utils/masks';

const Login = () => {
    const { SignIn } = useAuth();
    const [error, setError] = useState("");

    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: initialValues,
    });

    const onSubmit = async (value: LoginSubmit) => {
        const { response } = await SignIn({
            cpf: `${value?.cpf?.replace(/[^a-z0-9]/gi, '')}`,
            password: value?.password,
            id: value?.id
        })
        if (response?.data) {
            setError(response?.data?.msg);
        }
    };


    return (
        <>
            <Backdrop
                sx={{ color: '#1100ff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                open={isSubmitting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100vh',
                }}
            >
                <Container maxWidth="sm">
                    <Box
                        component="form"
                        p={3}
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: "flex",
                            flexDirection: 'column',
                            gap: '20px',
                            backgroundColor: '#fafafa',
                            borderRadius: '20px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Box sx={{ my: 3 }}>
                            <img src={Star} alt="Star" width={'90%'} />

                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body1"
                                align="center"
                            >
                                Faça login na plataforma interna
                            </Typography>
                        </Box>
                        <Controller
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                            }) => (
                                <TextField
                                    value={MaskCpf(value)}
                                    onChange={onChange} // send value to hook form
                                    onBlur={onBlur} // notify when input is touched
                                    inputRef={ref} // wire up the input ref
                                    error={errors.cpf !== undefined}
                                    helperText={errors.cpf?.message}
                                    fullWidth
                                    label={<Required text={'CPF'} />}
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{
                                        maxLength: 14,
                                    }}
                                />
                            )}
                            name="cpf"
                            control={control}
                        />
                        {Boolean(error) && (
                            <FormHelperText error>{error}</FormHelperText>
                        )}
                        <Password
                            fullWidth
                            label={<Required text={'Senha'} />}
                            margin="normal"
                            register={register('password')}
                            error={errors.password}
                            helperText={errors.password?.message}
                            type="password"
                            variant="outlined"
                        />
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Titulação</FormLabel>
                                <Controller
                                    render={({
                                        field: { onChange, onBlur, value, name, ref },
                                    }) => (
                                        <RadioGroup
                                            row
                                            value={value}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched
                                            //ref={ref} // wire up the input
                                            defaultValue={3}  >
                                            <FormControlLabel value={1} control={<Radio />} label="Médico" />
                                            <FormControlLabel value={2} control={<Radio />} label="Residente" />
                                            <FormControlLabel value={3} control={<Radio />} label=" Docente" />
                                        </RadioGroup>
                                    )}
                                    name="id"
                                    control={control}
                                />
                            </FormControl>
                        </Grid>
                        <Box sx={{ py: 2 }}>
                            <Button
                                sx={{
                                    backgroundColor: '#D1B059',
                                    fontWeight: 'bold',
                                    color: '#010101',
                                    '&:hover': {
                                        backgroundColor: '#b48b22',
                                    }
                                }}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                Entrar
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            Não tem uma conta? {' '}
                            <Link to="/signup">
                                Inscrever-se
                            </Link>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Login;
