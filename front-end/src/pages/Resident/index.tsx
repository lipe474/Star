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
import { Resident as ResidentType } from "../../data/@types/resident";
import { DeleteResident, listResident } from "../../store/api/resident";
import FormModal from "../../components/FormModal";

const Resident = () => {
    const [data, setData] = React.useState<ResidentType[]>([])
    const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [residentId, setResident] = React.useState('')

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getPatients = async () => {
        const response = await listResident();
        response && setData([...response]);
    }
    const DeleteResidents = async () => {
        const response = await DeleteResident(residentId);
        if (response) {
            setOpenModal(false);
            getPatients();
        }
    }

    React.useEffect(() => {
        getPatients();
    }, []);

    return (
        <Card sx={{ pb: 3, height: '100%' }}>
            <FormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                onConfirm={DeleteResidents}
                type={"delete"}
            />
            <Grid container spacing={1}>
                <Container maxWidth="xl">
                    <Box component="main" flexGrow={1} mt={5}>
                        <Container maxWidth={false}>
                            <Typography variant="h5" component="h1" gutterBottom>
                                RESIDENTES CADASTRADOS
                            </Typography>
                            <Seach
                                btnText={"Adicionar residente"}
                                searchText={"Pesquisar residente"}
                                Search={getPatients}
                                Add={() => navigate("/register/resident")}
                            />
                        </Container>
                        <Box sx={{ mt: 1, pl: '24px', pr: '24px' }}>
                            <Card>
                                <PerfectScrollbar>
                                    <Box sx={{ minWidth: 1050 }}>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: '#E5DBC1' }}>
                                                <TableRow>
                                                    <TableCell>Nome</TableCell>
                                                    <TableCell>CRM</TableCell>
                                                    <TableCell>Especialidade</TableCell>
                                                    <TableCell>Número de Telefone</TableCell>
                                                    <TableCell sx={{ width: '4%', textAlign: 'center' }} >Ações</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: ResidentType, key: number) => (
                                                    <TableRow
                                                        hover
                                                        key={key}
                                                    >

                                                        <TableCell size="small">
                                                            <Box alignItems="center" display="flex">
                                                                <Avatar src={""} sx={{ mr: 2 }}>
                                                                    {getInitials(user?.name)}
                                                                </Avatar>
                                                                <Typography color="textPrimary" variant="body1">
                                                                    {user?.name}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell size="small">{user?.crm}</TableCell>
                                                        <TableCell size="small">{user?.especialization}</TableCell>
                                                        <TableCell size="small">{user?.phone_number}</TableCell>
                                                        <TableCell size="small">

                                                            <Stack direction="row">
                                                                <Tooltip title="Editar residente" placement="top">
                                                                    <IconButton
                                                                        onClick={() => navigate(`/resident/${user?.id}`)}
                                                                    >
                                                                        <ModeEditOutlineIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete residente" placement="top">
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            setOpenModal(true)
                                                                            setResident(user?.id as string)
                                                                        }}
                                                                    >
                                                                        <DeleteIcon />
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
        </Card>
    );
}

export default Resident;




