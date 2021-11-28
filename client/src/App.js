/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Container, Typography, Toolbar, Avatar, Button, Badge, IconButton, CssBaseline, Grid, Box, List, Divider } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Dashboard from './components/Profile/Dashboard';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Chats from './components/Chat/Chats';
import { AuthProvider } from './contexts/AuthContext';
import PostDetails from './components/PostDetails/PostDetails';
import useStyles from './styles';
import * as actionType from './constants/actionTypes';
import memoriesText from './images/memoriesText.png';
import memoriesLogo from './images/memoriesLogo.png';
import { mainListItems, secondaryListItems } from './components/Profile/ListItems';
import { auth } from './components/Chat/firebase';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    marginBottom: '1000px',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const App = () => {
  const users = JSON.parse(localStorage.getItem('profile'));

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');

    setUser(null);
  };

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} color="inherit" gutterBottom>
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Link to="/" className={classes.brandContainer}>
                  <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                  <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
                </Link>
                <Toolbar className={classes.toolbar} spacing={2}>
                  <CssBaseline />
                  <Grid container spacing={1} justify="center">
                    <Grid item>
                      {user?.result ? (
                        <div className={classes.profile}>
                          <Grid container spacing={1} justify="center">
                            <Grid item>
                              <Typography className={classes.userName} variant="subtitle1" align="center">{user?.result.name}</Typography>
                            </Grid>
                            <Grid item>
                              <Button variant="outlined" className={classes.logout} sx={{ pr: 2 }} color="success" onClick={logout}>Logout</Button>
                            </Grid>
                          </Grid>
                        </div>
                      ) : (
                        <Button component={Link} to="/auth" variant="outlined" color="success" sx={{ pr: 2 }}>Sign In</Button>
                      )}
                    </Grid>
                    <Grid item>
                      <Button component={Link} to="/" variant="outlined" color="success" sx={{ pr: 2 }}>Profile</Button>
                    </Grid>
                    <Grid item>
                      <Button component={Link} to="/" variant="outlined" color="success" sx={{ pr: 2 }}>Plaza</Button>
                    </Grid>
                  </Grid>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="Green">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Toolbar>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
            <Box
              marginTop="20px"
              component="main"
              sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900]),
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container>
                <AuthProvider>
                  <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/auth" exact component={() => (!users ? <Auth /> : <Redirect to="/posts" />)} />
                    <Route path="/chats" exact component={Chats} />
                  </Switch>
                </AuthProvider>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
    </BrowserRouter>
  );
};

export default App;
