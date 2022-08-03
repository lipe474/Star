import {
    Avatar, Card, Grid, IconButton, Stack, Table, TableBody, TableCell,
    TableHead, TablePagination, TableRow, Tooltip, Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import * as React from 'react';
import { Seach } from "../../components/Seach";
import { getInitials } from "../../components/Table/utils";
import PerfectScrollbar from "react-perfect-scrollbar";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate, useParams } from "react-router-dom";
import { DeleteExam, listExams } from "../../store/api/exams";
import { Exam } from "../../data/@types/exams";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FormModal from "../../components/FormModal";
const ExamPage = () => {
    const { id } = useParams()
    const [idExam, setIdExam] = React.useState('')
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [data, setData] = React.useState<Exam[]>([])
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

    const getExam = async () => {
        const response = await listExams(id as string);
        response && setData([...response]);
    }

    React.useEffect(() => {
        getExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const Delete = async () => {
        const response = await DeleteExam(idExam);
        if (response) {
            setOpenModal(false);
            getExam();
        }
    }

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
                            mt: 5
                        }}
                    >
                        <Container maxWidth={false}>
                            <Typography variant="h5" component="h1" gutterBottom>
                                Lista de exames
                            </Typography>
                            <Seach
                                btnText={"Adicionar exame"}
                                searchText={"Pesquisar paciente"}
                                Search={() => console.log("Pesquisar")}
                                Add={() => {
                                    navigate(`/exam/Register/${id}/register`)
                                }}
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
                                                    <TableCell>Nome</TableCell>
                                                    <TableCell>Data</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell sx={{ width: '4%', pl: '27px' }}>
                                                        Ações
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: Exam, key: number) => (
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
                                                        <TableCell size="small">{user?.date}</TableCell>
                                                        <TableCell size="small">{user?.status}</TableCell>
                                                        <TableCell size="small" sx={{ pr: '0px' }}>
                                                            <Stack direction="row" justifyContent={'center'}>

                                                                <Tooltip title="Editar" placement="top">
                                                                    <IconButton
                                                                        onClick={() => navigate(`/exam/Edit/${user?.id}/Edit`)}
                                                                    >
                                                                        <ModeEditOutlineIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Deletar" placement="top">
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            setIdExam(user?.id as string)
                                                                            setOpenModal(true)
                                                                        }}
                                                                    >
                                                                        <DeleteForeverIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Datalhes" placement="top">
                                                                    <IconButton
                                                                        onClick={() => navigate(`/exam/details/${user?.id}/${id}/details`)}
                                                                    >
                                                                        <AnalyticsIcon />
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

export default ExamPage;




