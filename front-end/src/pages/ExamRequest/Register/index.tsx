import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { ptBR } from 'date-fns/locale'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { FormControl, FormHelperText } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, initialValues } from './schema';
import { Required } from '../../../components/Required';
import { LoadBackdrop } from '../../../components/Loading';
import { Alerts } from '../../../components/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { ExamRequest } from '../../../data/@types/examsRequest';
import { getByIdExamRequests, RegisExamRequests, UpdatedExamRequests } from '../../../store/api/examRequests';

const theme = createTheme();

export default function RegisterExamRequests() {
    const { id, name, type } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState<boolean>(false)
    //const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [alertTxt, setAlertTxt] = React.useState('')
    const [alertType, setAlertType] = React.useState('')
    const { reset, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
        mode: 'all'
    });

    const onSubmit = async (event: ExamRequest) => {

        const res = type ? await UpdatedExamRequests(event, id as string) : await RegisExamRequests(event, id as string)
        switch (res?.statusText) {
            case "Bad Request":
                setOpen(true)
                setAlertTxt(res?.data?.message)
                setAlertType('error')
                break;
            case "Created":
                reset()
                setOpen(true)
                setAlertTxt("Pedido de exame criado com sucesso.")
                setAlertType('success')
                break;
            case "No Content":
                setOpen(true)
                setAlertTxt("Pedido de exame atualizado com sucesso.")
                setAlertType('success')
                break;
        }
    }

    const getExamRequests = async () => {
        const res = await getByIdExamRequests(id as string)
        res && reset({
            exams: res?.exams,
            diagnostic_hypothesis: res?.diagnostic_hypothesis,
            date: res?.date,
            patient_id: res?.patient_id,
            id: res?.id,
        })
    }

    React.useEffect(() => {
        type && getExamRequests()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR} >
            <LoadBackdrop open={isSubmitting} />
            <Alerts
                open={open}
                text={alertTxt}
                vertical='top'
                horizontal='right'
                type={alertType}
                close={setOpen}
            />
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box display={'flex'} alignItems={'center'} gap={2}>
                            <Avatar sx={{
                                m: 1,
                                bgcolor: 'secondary.main',
                                width: 56,
                                height: 56,
                                transform: 'translateY(-13px)'
                            }}>
                                <NoteAddIcon />
                            </Avatar>
                            <Box>
                                <Typography component="h1" variant="h4">
                                    Pedido de Exame
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body1"
                                    align="center"
                                >
                                    Paciente: {name}
                                </Typography>
                            </Box>
                        </Box>

                        <Box component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 3, gap: 10 }}
                            width={'100%'}

                        >
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={9}>
                                    <Controller
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <TextField
                                                onChange={onChange}
                                                value={value}
                                                error={errors.exams !== undefined}
                                                helperText={errors.exams?.message}
                                                fullWidth
                                                label={<Required text={"Exames"} />}
                                                defaultValue=""
                                            />
                                        )}
                                        control={control}
                                        name="exams"
                                        defaultValue=""
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <FormControl error={errors.date !== undefined} fullWidth >
                                        <Controller
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <DesktopDatePicker
                                                    label={<Required text={"Data"} />}
                                                    inputFormat="dd/MM/yyyy"
                                                    value={value}
                                                    onChange={onChange}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                        />
                                                    }
                                                />
                                            )}
                                            name={"date"}
                                            control={control}
                                        />

                                        {errors.date &&
                                            <FormHelperText error>
                                                {errors.date?.message}
                                            </FormHelperText>
                                        }


                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Controller
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                label={<Required text={"Hipótese diagnóstica"} />}
                                                error={errors.diagnostic_hypothesis !== undefined}
                                                helperText={errors.diagnostic_hypothesis?.message}
                                                multiline
                                                rows={10}
                                            />
                                        )}
                                        name={"diagnostic_hypothesis"}
                                        control={control}
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size='large'
                                        sx={{ mt: 3, mb: 5 }}
                                        onClick={() => navigate(`/examRequests/${id}/${name}`)}
                                        startIcon={<CancelIcon />}
                                    >

                                        Cancelar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size='large'
                                        sx={{ mt: 3, mb: 5 }}
                                        startIcon={<BeenhereIcon />}
                                    >
                                        {id ? "Salvar" : "Cadastro"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </LocalizationProvider >

    );
}
