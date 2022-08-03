import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// @ts-ignore: Unreachable code error
import StartLogo from '../../assets/images/StartLogo.svg'
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const pages = [
    {
        label: 'Pacientes',
        path: '/home',
    },
    {
        label: 'Médicos',
        path: '/doctors',
    },
    {
        label: 'Residentes',
        path: '/resident',
    },
    {
        label: 'Docentes',
        path: '/teachers',
    },
];


const ResponsiveAppBar = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [medic] = React.useState(JSON.parse(localStorage.getItem('medic') || '{}'));

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const settings = [
        {
            label: 'Sair',
            action: () => {
                localStorage.removeItem('user_token');
                navigate('/');
            }
        }
    ];

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#E5DBC1',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 3,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={StartLogo} alt="Start Logo" />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none', color: '#000000' },
                            }}
                        >
                            {pages.map((page, key) => (
                                <MenuItem key={key} onClick={handleCloseNavMenu}>
                                    <Typography
                                        textAlign="center"
                                        onClick={() => {
                                            navigate(page.path)
                                        }}
                                    >
                                        {page.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={StartLogo} alt="Start Logo" />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        {pages.map((page, key) => (
                            <Button
                                key={key}
                                onClick={() => {
                                    navigate(page.path)
                                    handleCloseNavMenu()
                                }}
                                sx={{ my: 2, display: 'block', color: '#000000', fontWeight: 600 }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>


                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="p"
                            sx={{
                                mr: 3,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                color: '#000000',
                                fontWeight: 800,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                        >
                            {medic?.name?.split(' ')[0]}
                        </Typography>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={medic?.name} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting?.label} onClick={handleCloseUserMenu}>
                                    <LogoutIcon fontSize="small" />
                                    <Typography
                                        textAlign="center"
                                        onClick={setting.action}
                                        ml={2}
                                    >
                                        {setting?.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default ResponsiveAppBar;





