import {
    Card, Grid, IconButton, Stack, Table, TableBody, TableCell,
    TableHead, TablePagination, TableRow, Tooltip, Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import * as React from 'react';
import { Seach } from "../../components/Seach";
import PerfectScrollbar from "react-perfect-scrollbar";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate, useParams } from "react-router-dom";
import { DeleteExamRequests, listExamRequests } from "../../store/api/examRequests";
import { ExamRequest } from "../../data/@types/examsRequest";
import moment from "moment";
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormModal from "../../components/FormModal";
const ExamRequestPage = () => {
    const { id, name } = useParams()
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [examRequestsId, setExamRequests] = React.useState('')
    const [data, setData] = React.useState<ExamRequest[]>([])
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

    const Delete = async () => {
        const response = await DeleteExamRequests(examRequestsId);
        if (response) {
            setOpenModal(false);
            getExamRequests();
        }
    }

    const getExamRequests = async () => {
        const response = await listExamRequests(id as string);
        response && setData([...response]);
    }

    React.useEffect(() => {
        getExamRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem("user_token")]);

    return (
        <Card sx={{ pb: 3, height: '100%' }}>
            <FormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                onConfirm={Delete}
                type={"delete"}
            />
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
                                Lista de pedidos de exames
                            </Typography>
                            <Seach
                                btnText={"Criar pedido de exame"}
                                searchText={"Pesquisar paciente"}
                                Search={getExamRequests}
                                Add={() => navigate(`/examRequests/Register/${id}/${name}`)}
                            />
                        </Container>
                        <Box sx={{ mt: 1, pl: '24px', pr: '24px' }}>
                            <Card >
                                <PerfectScrollbar>
                                    <Box sx={{ minWidth: 1050 }}>
                                        <Table>
                                            <TableHead
                                                sx={{ backgroundColor: '#E5DBC1' }}
                                            >
                                                <TableRow>
                                                    <TableCell>Exame</TableCell>
                                                    <TableCell>Data</TableCell>
                                                    <TableCell>Hipótese diagnóstica</TableCell>
                                                    <TableCell sx={{ width: '4%', pl: '27px' }}>
                                                        Ações
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: ExamRequest, key: number) => (
                                                    <TableRow
                                                        hover
                                                        key={key}
                                                    >

                                                        <TableCell size="small">
                                                            <Typography color="textPrimary" variant="body1">
                                                                {user?.exams}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell size="small">{moment(user?.date).format("DD/MM/YYYY - HH:mm")}</TableCell>
                                                        <TableCell size="small">
                                                            {user?.diagnostic_hypothesis?.slice(0, 90)}
                                                            {user?.diagnostic_hypothesis?.length > 90 && '...'}
                                                        </TableCell>
                                                        <TableCell size="small" sx={{ pr: '0px' }}>
                                                            <Stack direction="row" justifyContent={'center'}>
                                                                <Tooltip title="Editar pedido" placement="top">
                                                                    <IconButton

                                                                        onClick={() => navigate(`/examRequests/Edit/${user?.id}/${1}`)}
                                                                    >
                                                                        <ModeEditOutlineIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Deletar pedido" placement="top">
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            setOpenModal(true)
                                                                            setExamRequests(user?.id as string)
                                                                        }
                                                                        }
                                                                    >
                                                                        <DeleteForeverIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Adicionar exame" placement="top">
                                                                    <IconButton
                                                                        onClick={() => navigate(`/exam/${user?.id}`)}
                                                                    >
                                                                        <AddTaskIcon />
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

export default ExamRequestPage;




