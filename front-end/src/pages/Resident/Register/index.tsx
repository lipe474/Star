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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { States } from '../../../data/utils/States';
import { CityType } from '../../../data/@types/city';
import { GetCities } from '../../../data/utils/GetCities';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, initialValues } from './schema';
import { Required } from '../../../components/Required';
import { MaskCpf } from '../../../data/utils/masks';
import { LoadBackdrop } from '../../../components/Loading';
import { Alerts } from '../../../components/Alert';
import Password from '../../../components/Password';
import { Specialty } from '../../../data/utils/specialty';
import { formatCellAndTell } from '../../../data/utils/formatCellAndTell';
import { Ethnicity } from '../../../data/utils/ethnicity';
import { Gender } from '../../../data/utils/gender';
import { maritalStatus } from '../../../data/utils/maritalStatus';
import { Resident } from '../../../data/@types/resident';
import { getByIdResident, RegisResident, UpdatedResident } from '../../../store/api/resident';
import { useNavigate, useParams } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import BeenhereIcon from '@mui/icons-material/Beenhere';


const theme = createTheme();

export default function Register() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [cities, setCities] = React.useState<CityType[] | null>()
    const [open, setOpen] = React.useState<boolean>(false)
    const [alertTxt, setAlertTxt] = React.useState('')
    const [alertType, setAlertType] = React.useState('')
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
        mode: 'all'
    })

    const getDoctors = async () => {
        const response = await getByIdResident(id as string);
        if (response) {
            reset({
                name: response?.name,
                ethnicity: response?.ethnicity,
                nationality: response?.nationality,
                crm: response?.crm,
                cpf: response?.cpf,
                //password: response?.password,
                birth_date: response?.birth_date,
                marital_status: response?.marital_status,
                address: response?.address,
                state: response?.state,
                gender: response?.gender,
                especialization: response?.especialization,
                residence_date: new Date(response?.residence_date).toISOString() as string,
                phone_number: response?.phone_number
            })
        }

        if (response?.city) {
            try {
                const res = await GetCities(`${response?.state}`)
                res && setCities(res)
            } catch (error) {
                console.log(error)
            } finally {
                setValue('city', response?.city)
            }
        }
    }
    React.useEffect(() => {
        id && getDoctors()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSubmit = async (event: Resident) => {
        const res = id ? await UpdatedResident(event, id as string) : await RegisResident(event)

        switch (res?.statusText) {
            case "Bad Request":
                setOpen(true)
                setAlertTxt(res?.data?.message)
                setAlertType('error')
                break;
            case "Created":
                setOpen(true)
                setAlertTxt("Residente criado com sucesso.")
                setAlertType('success')
                break;
            case "No Content":
                setOpen(true)
                setAlertTxt("Residente atualizado com sucesso.")
                setAlertType('success')
                break;
        }
    }

    const onError = (error: any) => {
        console.log("Error:::::::", error);
    };

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
                                <HowToRegIcon />
                            </Avatar>
                            <Box>
                                <Typography component="h1" variant="h4">
                                    {id ? "Editar" : "Cadastro"} de Residente
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body1"
                                    align="center"
                                >
                                    Dados do residente
                                </Typography>
                            </Box>
                        </Box>

                        <Box component="form"
                            onSubmit={handleSubmit(onSubmit, onError)}
                            sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        render={({
                                            field: { onChange, value, ref },
                                        }) => (
                                            <TextField
                                                value={value}
                                                onChange={onChange}
                                                error={errors.name !== undefined}
                                                helperText={errors.name?.message}
                                                fullWidth
                                                label={<Required text={"Nome completo"} />}
                                            />

                                        )}
                                        name="name"
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={errors.especialization !== undefined}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            <Required text={"Especialização"} />
                                        </InputLabel>

                                        <Controller
                                            render={({
                                                field: { onChange, value, ref },
                                            }) => (
                                                <Select
                                                    value={value}
                                                    onChange={onChange}
                                                    label={<Required text={"Especialização"} />}
                                                >
                                                    {Specialty.map((item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item?.label}
                                                                value={item?.label}>
                                                                {item?.label}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                            name="especialization"
                                            control={control}
                                        />

                                        <FormHelperText>
                                            {errors.especialization?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        render={({
                                            field: { onChange, value, ref },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                value={MaskCpf(value)}
                                                onChange={onChange}
                                                error={errors.cpf !== undefined}
                                                helperText={errors.cpf?.message}
                                                label={<Required text={'CPF'} />}

                                            />
                                        )}
                                        name={"cpf"}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Controller
                                        render={({
                                            field: { onChange, value, ref },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                error={errors.crm !== undefined}
                                                helperText={errors.crm?.message}
                                                label={<Required text={'CRM'} />}

                                            />
                                        )}
                                        name={"crm"}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <Controller
                                            render={({
                                                field: { onChange, value, ref },
                                            }) => (
                                                <DesktopDatePicker
                                                    label={<Required text={"Data de residência"} />}
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
                                            name={"residence_date"}
                                            control={control}
                                        />

                                        {errors.birth_date &&
                                            <FormHelperText error>
                                                {errors.birth_date?.message}
                                            </FormHelperText>
                                        }


                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <Controller
                                            render={({
                                                field: { onChange, value, ref },
                                            }) => (
                                                <DesktopDatePicker
                                                    label={<Required text={"Data de nascimento"} />}
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
                                            name={"birth_date"}
                                            control={control}
                                        />

                                        {errors.birth_date &&
                                            <FormHelperText error>
                                                {errors.birth_date?.message}
                                            </FormHelperText>
                                        }


                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Controller
                                        render={({
                                            field: { onChange, value, ref },
                                        }) => (
                                            <TextField
                                                value={value}
                                                onChange={onChange}
                                                fullWidth
                                                label="Nacionalidade"
                                                error={errors.nationality !== undefined}
                                                helperText={errors.nationality?.message}

                                            />
                                        )}
                                        name="nationality"
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl
                                        fullWidth
                                        error={errors.ethnicity !== undefined}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            <Required text={"Etnia"} />
                                        </InputLabel>

                                        <Controller
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <Select
                                                    value={value}
                                                    onChange={onChange}
                                                    label={<Required text={"Etnia"} />}

                                                >
                                                    {Ethnicity.map((item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item?.label}
                                                                value={item?.label}>
                                                                {item?.label}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                            name={`ethnicity`}
                                            control={control}
                                        />

                                        <FormHelperText>
                                            {errors.ethnicity?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl
                                        fullWidth
                                        error={errors.ethnicity !== undefined}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            <Required text={"Gênero"} />
                                        </InputLabel>

                                        <Controller
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <Select
                                                    value={value}
                                                    onChange={onChange}
                                                    label={<Required text={"Gênero"} />}

                                                >
                                                    {Gender.map((item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item?.label}
                                                                value={item?.label}>
                                                                {item?.label}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                            name={`gender`}
                                            control={control}
                                        />

                                        <FormHelperText>
                                            {errors.ethnicity?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Controller
                                        render={({
                                            field: { onChange, value, ref },
                                        }) => (
                                            <TextField
                                                value={value}
                                                onChange={onChange}
                                                fullWidth
                                                label={<Required text={"Endereço"} />}
                                                error={errors.address !== undefined}
                                                helperText={errors.address?.message}
                                            />
                                        )}
                                        name="address"
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl
                                        fullWidth
                                        error={errors.state !== undefined}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            <Required text={"Estado"} />
                                        </InputLabel>
                                        <Controller
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <Select
                                                    label={<Required text={"Estado"} />}
                                                    onChange={async (e) => {
                                                        onChange(e)
                                                        const res = await GetCities(`${e.target.value}`)
                                                        res && setCities(res)
                                                        return e
                                                    }}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    inputRef={ref}
                                                >
                                                    {States.map((item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item?.label}
                                                                value={item?.label}>
                                                                {item?.value}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                            name={"state"}
                                            control={control}
                                        />
                                        <FormHelperText>
                                            {errors.state?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl
                                        fullWidth
                                        error={errors.city !== undefined}
                                    >
                                        <InputLabel>{<Required text={"Cidade"} />}</InputLabel>
                                        <Controller
                                            render={({
                                                field: { onChange, value, ref },
                                            }) => (
                                                <Select
                                                    value={value}
                                                    onChange={onChange}
                                                    disabled={cities?.length === 0}
                                                    label={<Required text={"Cidade"} />}
                                                >
                                                    <MenuItem>
                                                        Selecionar
                                                    </MenuItem>
                                                    {cities?.map((item: any) => {
                                                        return (
                                                            <MenuItem
                                                                key={item?.nome ?? ''}
                                                                value={item?.nome ?? ''}>
                                                                {item?.nome}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                            name={"city"}
                                            control={control}
                                        />
                                        {errors?.city &&
                                            <FormHelperText>
                                                {errors.city?.message}
                                            </FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl
                                        fullWidth
                                        error={errors.marital_status !== undefined}
                                    >
                                        <InputLabel>{<Required text={"Estado civil"} />}</InputLabel>
                                        <Controller
                                            render={({
                                                field: { onChange, value, ref },
                                            }) => (
                                                <Select
                                                    value={value}
                                                    onChange={onChange}
                                                    disabled={cities?.length === 0}
                                                    label={<Required text={"Estado civil"} />}
                                                >
                                                    {maritalStatus?.map((item: any) => {
                                                        return (
                                                            <MenuItem
                                                                key={item?.label ?? ''}
                                                                value={item?.label ?? ''}>
                                                                {item?.label}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                            name={"marital_status"}
                                            control={control}
                                        />
                                        {errors?.marital_status &&
                                            <FormHelperText>
                                                {errors.marital_status?.message}
                                            </FormHelperText>}
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Controller
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                        }) => (
                                            <TextField
                                                onChange={onChange}
                                                value={formatCellAndTell(value)}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                fullWidth
                                                label={<Required text={"Telefone"} />}
                                                error={errors.phone_number !== undefined}
                                                helperText={errors.phone_number?.message}

                                            />
                                        )}
                                        name={"phone_number"}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Password
                                        fullWidth={true}
                                        type="text"
                                        label={<Required text={'Senha'} />}
                                        error={errors.password}
                                        helperText={errors.password && errors.password.message}
                                        register={register('password')}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Password
                                        fullWidth={true}
                                        type="password"
                                        label={<Required text={'Confirmar senha'} />}
                                        error={errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        register={register('confirmPassword')}
                                    /></Grid>
                            </Grid>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size='large'
                                        sx={{ mt: 3, mb: 5 }}
                                        onClick={() => navigate(`/resident`)}
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
        </LocalizationProvider>

    );
}
