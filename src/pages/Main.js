import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import Auth from '../shared/auth';
import DescriptionIcon from '@material-ui/icons/Description';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CropFreeIcon from '@material-ui/icons/CropFree';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import { ReactComponent as Logo } from '../assets/logo.png';
import history from "../history";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex'
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        marginLeft: 10
    },
    identification: {
        fontSize: '10px'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        textAlign: 'right'
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        textAlign: 'right'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 10,
        marginRight: 10,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px 0 0',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }
});

class Main extends React.Component {

    constructor() {
        super();

        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            isDrawerOpen: false,
            role: Auth.getRole()
        };
    }

    logout = () => {
        this.handleMenuClose();
        Auth.logout();
    }

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMenuPerfil = () => {
        this.setState({ anchorEl: null });
        this.setState({ mobileMoreAnchorEl: null });
        history.push("/profile")
    }

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleDrawerOpen = () => {
        this.setState({ isDrawerOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ isDrawerOpen: false });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl, isDrawerOpen, role } = this.state;
        const { classes, theme } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuPerfil}>Meu Perfil</MenuItem>
                <MenuItem onClick={this.logout}>Sair</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: isDrawerOpen,
                    })}
                >
                    <Toolbar disableGutters={true}>

                        <IconButton
                            color="inherit"
                            aria-label="Abrir Menu"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, isDrawerOpen && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography className={classes.title} color="inherit" noWrap>
                            <Link to="/home" className={classes.link}>
                                <Logo style={{paddingTop: 10 }} />
                            </Link>
                        </Typography>

                        <div className={classes.grow} />
                        <IconButton
                            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={isDrawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>

                        <Link
                            to="/"
                            onClick={this.handleDrawerClose}
                            style={{ textDecoration: 'none', width: '100%' }}>
                            <ListItem button key="Home">
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>

                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>

                    </div>
                    <Divider />

                    <List>

                        {/* {role === 0 && (
                            <Link
                                to="/collection"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="collection">
                                    <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
                                    <ListItemText primary="Coletas" />
                                </ListItem>
                            </Link>
                        )} */}

                        {/* {role === 0 && (
                            <Link
                                to="/results-admin"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="results-admin">
                                    <ListItemIcon><AssessmentIcon /></ListItemIcon>
                                    <ListItemText primary="Resultados" />
                                </ListItem>
                            </Link>
                        )} */}

                        {role !== 1 && (
                            <Link
                                to="/find"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="find">
                                    <ListItemIcon><SearchIcon /></ListItemIcon>
                                    <ListItemText primary="Pesquisar Kit" />
                                </ListItem>
                            </Link>
                        )}
                        {role === 1 && (
                            <Link
                                to="/kit"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="kit">
                                    <ListItemIcon><CropFreeIcon /></ListItemIcon>
                                    <ListItemText primary="Ativar Kit" />
                                </ListItem>
                            </Link>
                        )}

                        {role === 1 && (
                            <Link
                                to="/instrucoes-teste"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="schedule">
                                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                                    <ListItemText primary="Tutorial de coleta" />
                                </ListItem>
                            </Link>
                        )}

                        {role === 1 && (
                            <Link
                                to="/schedule"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="schedule">
                                    <ListItemIcon><DirectionsWalkIcon /></ListItemIcon>
                                    <ListItemText primary="Entregar coleta" />
                                </ListItem>
                            </Link>
                        )}

                        {role === 1 && (
                            <Link
                                to="/results"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="results">
                                    <ListItemIcon><DescriptionIcon /></ListItemIcon>
                                    <ListItemText primary="Resultados" />
                                </ListItem>
                            </Link>
                        )}

                        {role === 3 && (
                            <Link
                                to="/reports"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="reports">
                                    <ListItemIcon><EqualizerIcon /></ListItemIcon>
                                    <ListItemText primary="Relatórios" />
                                </ListItem>
                            </Link>
                        )}

                        {role === 3 && (
                            <Link
                                to="/reports-general"
                                onClick={this.handleDrawerClose}
                                style={{ textDecoration: 'none' }}>
                                <ListItem button key="reports-general">
                                    <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                                    <ListItemText primary="Relatório Geral" />
                                </ListItem>
                            </Link>
                        )}

                        <Link
                            to="/login"
                            onClick={this.logout}
                            style={{ textDecoration: 'none' }}>
                            <ListItem button key="logout">
                                <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: isDrawerOpen,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <MainRoutes />
                </main>
            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
