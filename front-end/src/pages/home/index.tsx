import {
    Avatar, Card, Grid, IconButton, Stack, Table, TableBody, TableCell,
    TableHead, TablePagination, TableRow, Tooltip, Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import * as React from 'react';
import { Seach } from "../../components/Seach";
import { getInitials } from "../../components/Table/utils";
import DeleteIcon from '@mui/icons-material/Delete';
import PerfectScrollbar from "react-perfect-scrollbar";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from "react-router-dom";
import { DeletePatient, listPatient } from "../../store/api/patient";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Patients } from "../../data/@types/patients";
import FormModal from "../../components/FormModal";

const Home = () => {
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [patientId, setPatientId] = React.useState('')
    const [data, setData] = React.useState<Patients[]>([])
    const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getPatients = async () => {
        const response = await listPatient();
        response && setData([...response]);
    }
    const getDelete = async () => {
        const response = await DeletePatient(patientId);
        if (response) {
            setOpenModal(false);
            getPatients();
        }
    }

    React.useEffect(() => {
        getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem("user_token")]);


    return (
        <Card sx={{ pb: 3, height: '100%' }}>
            <Grid container spacing={1}>
                <Container maxWidth="xl">
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            //py: 8
                            mt: 5
                        }}
                    >
                        <Container maxWidth={false}>
                            <Typography variant="h5" component="h1" gutterBottom>
                                PACIENTES CADASTRADOS
                            </Typography>
                            <Seach
                                btnText={"Adicionar Paciente"}
                                searchText={"Pesquisar paciente"}
                                Search={getPatients}
                                Add={() => navigate("/patient")}
                            />
                        </Container>
                        <Box sx={{ mt: 1, pl: '24px', pr: '24px' }}>
                            <Card >
                                <FormModal
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    onOpen={() => setOpenModal(true)}
                                    onConfirm={getDelete}
                                    type={"delete"}
                                />
                                <PerfectScrollbar>
                                    <Box sx={{ minWidth: 1050 }}>
                                        <Table>
                                            <TableHead
                                                sx={{ backgroundColor: '#E5DBC1' }}
                                            >
                                                <TableRow>
                                                    <TableCell>Nome</TableCell>
                                                    <TableCell>Cpf</TableCell>
                                                    <TableCell>Gênero</TableCell>
                                                    <TableCell>Número de Telefone</TableCell>
                                                    <TableCell sx={{ width: '4%', pr: '0px', pl: '27px' }}>
                                                        Ações
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: Patients, key: number) => (
                                                    <TableRow
                                                        hover
                                                        key={key}
                                                    >

                                                        <TableCell size="small">
                                                            <Box
                                                                sx={{
                                                                    alignItems: "center",
                                                                    display: "flex",
                                                                }}
                                                            >
                                                                <Avatar src={""} sx={{ mr: 2 }}>
                                                                    {getInitials(user?.name)}
                                                                </Avatar>
                                                                <Typography color="textPrimary" variant="body1">
                                                                    {user?.name}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell size="small">{user?.cpf}</TableCell>
                                                        <TableCell size="small">{`${user?.gender}`}</TableCell>
                                                        <TableCell size="small">{user?.phone_number}</TableCell>
                                                        <TableCell size="small" sx={{ pr: '0px' }}>
                                                            <Stack direction="row">
                                                                <Tooltip title="Editar paciente" placement="top">
                                                                    <IconButton
                                                                        onClick={() => navigate(`/patient/${user?.id}`)}
                                                                    >
                                                                        <ModeEditOutlineIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete paciente" placement="top">
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            setOpenModal(true)
                                                                            setPatientId(user?.id as string)
                                                                        }}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Pedidos de exame" placement="top">
                                                                    <IconButton
                                                                        onClick={() => navigate(`/examRequests/${user?.id}/${user?.name}`)}
                                                                    >
                                                                        <AssignmentIndIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </PerfectScrollbar>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={data?.length || 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Card>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Card >
    );
}

export default Home;




