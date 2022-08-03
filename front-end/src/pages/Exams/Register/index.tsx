import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { ptBR } from 'date-fns/locale'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Fab, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, initialValues } from './schema';
import { Required } from '../../../components/Required';
import { LoadBackdrop } from '../../../components/Loading';
import { Alerts } from '../../../components/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { Exam } from '../../../data/@types/exams';
import CancelIcon from '@mui/icons-material/Cancel';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getByIdExam, getFileUrl, RegisExams, UpdatedExam } from '../../../store/api/exams';

const theme = createTheme();

export default function ExamsRegister() {
    const { id, details, type, Edit, requestId } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState<boolean>(false)
    const [alertTxt, setAlertTxt] = React.useState('')
    const [alertType, setAlertType] = React.useState('')
    const [fileImport, setFileImport] = React.useState('')
    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors, isSubmitting },
        watch
    } =
        useForm({
            resolver: yupResolver(schema),
            defaultValues: initialValues,
            mode: 'all'
        });

    React.useEffect(() => {
        if (Edit || details) getExam()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Edit, details])

    const getExam = async () => {
        const response = await getByIdExam(id as string)
        if (response) {
            console.log(response)
            reset({
                name: response?.name,
                date: response?.date,
                attachment: response?.attachment,
                report: response?.report,
                status: response?.status
            })
        }
    }


    const Download = async (url: string) => {
        window.open(url, '_blank')
    }

    const uploadFile = async (file: File) => {
        const response = await getFileUrl(file);

        !response && setFileImport('Erro ao adicionar  arquivo')

        setValue('attachment', response)
        setFileImport('Arquivo adicionado com sucesso')
    }


    const onSubmit = async (event: Exam) => {
        const res = Edit ? await UpdatedExam(event, id as string) : await RegisExams(event, id as string)

        switch (res?.statusText) {
            case "Bad Request":
                setOpen(true)
                setAlertTxt(res?.data?.message)
                setAlertType('error')
                break;
            case "Created":
                setOpen(true)
                setAlertTxt("Exame criado com sucesso.")
                setAlertType('success')
                break;
            case "No Content":
                setOpen(true)
                setAlertTxt("Atualizado criado com sucesso.")
                setAlertType('success')
                break;
        }
    }

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
                                    {details ? "Detalhes do" : `${type ? "Cadastrar" : "Editar"} `}Exame
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body1"
                                    align="center"
                                >
                                    Dados do Paciente
                                </Typography>
                            </Box>
                        </Box>

                        <Box component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={9}>
                                    <Controller
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <TextField
                                                onChange={onChange}
                                                value={value}
                                                error={errors.name !== undefined}
                                                helperText={errors.name?.message}
                                                fullWidth
                                                label={<Required text={"Nome"} />}
                                                defaultValue=""
                                                InputProps={{
                                                    readOnly: Boolean(details),
                                                    disableUnderline: Boolean(details),
                                                }}
                                            />
                                        )}
                                        name={"name"}
                                        control={control}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <FormControl error={errors.date !== undefined} >
                                        <Controller
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <DesktopDatePicker
                                                    label={<Required text={"Data"} />}
                                                    inputFormat="dd/MM/yyyy"
                                                    value={value}
                                                    readOnly={Boolean(details)}
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
                                                onChange={onChange}
                                                value={value}
                                                fullWidth
                                                label="Laudo"
                                                error={errors.report !== undefined}
                                                helperText={errors.report?.message}
                                                multiline
                                                rows={10}
                                                InputProps={{
                                                    readOnly: Boolean(details),
                                                    disableUnderline: Boolean(details),
                                                }}
                                            />
                                        )}
                                        name={"report"}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <label htmlFor="upload-photo">
                                        <input
                                            style={{ display: "none" }}
                                            {...register('attachment')}
                                            name="attachment"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    uploadFile(e.target.files[0] as unknown as File)
                                                }
                                            }}
                                            id="upload-photo"
                                            type="file"
                                            disabled={details === 'details' ? true : false}
                                        />
                                        <Box
                                            gap={2}
                                            p={'0.5rem'}
                                            display={'flex'}
                                            borderRadius={4}
                                            bgcolor={'#e9e6e6'}
                                            alignItems={'center'}
                                        >
                                            <Fab
                                                size='medium'
                                                color="secondary"
                                                component="span"
                                                variant="extended"
                                                style={{ gap: 4 }}
                                                onClick={() => {
                                                    details && Download(watch('attachment'))
                                                }}
                                            >
                                                {details ?
                                                    <>
                                                        <FileDownloadIcon /> Baixar Laudo
                                                    </> :
                                                    <>
                                                        <AddCircleOutlineIcon /> Adicionar Laudo
                                                    </>
                                                }

                                            </Fab>
                                            <Typography
                                                fontWeight={'bold'}
                                                color={'#0baf0b'}
                                            >
                                                {fileImport ?? 'Adicione um arquivo para o relatório'}
                                            </Typography>
                                        </Box>

                                    </label>

                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        fullWidth
                                        error={errors.status !== undefined}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            <Required text={"Status"} />
                                        </InputLabel>
                                        <Controller
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <Select
                                                    label={<Required text={"Status"} />}
                                                    onChange={onChange}
                                                    value={value}
                                                    readOnly={Boolean(details)}
                                                >
                                                    <MenuItem value={"definitive"}>
                                                        Definitivo
                                                    </MenuItem>
                                                    <MenuItem value={"provisory"}>
                                                        Provisório
                                                    </MenuItem>

                                                </Select>
                                            )}
                                            name={"status"}
                                            control={control}
                                        />
                                        <FormHelperText>
                                            {errors.status?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={5}>

                                <Grid item xs={12} sm={details ? 12 : 6}>
                                    <Button
                                        fullWidth
                                        variant={details ? 'contained' : "outlined"}
                                        size='large'
                                        sx={{ mt: 3, mb: 5 }}
                                        onClick={() => navigate(`/exam/${details ? requestId : id}`)}
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
                                        sx={{ mt: 3, mb: 5, display: details ? 'none' : 'flex' }}
                                        startIcon={<BeenhereIcon />}
                                    >
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </LocalizationProvider>

    );
}
