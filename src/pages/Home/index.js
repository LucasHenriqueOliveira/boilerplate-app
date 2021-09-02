import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import Find from '../Find';
import Auth from '../../shared/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  depositContext: {
    flex: 1,
  },
  balance: {
    position: 'absolute',
    right: 30
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  card: {
    marginBottom: 5,
    marginTop: 5,
    height: 250,
    alignItems: 'center',
    textAlign: 'center'
  },
  disabledCard: {
    marginBottom: 5,
    marginTop: 5,
    height: 250,
    alignItems: 'center',
    textAlign: 'center',

    backgroundColor: "lightGray"
  },
  disabledCardArea: {
    cursor: "default",
    hover: "default"
  },
  icon: {
    marginTop: '30px',
    width: '100px',
    height: '128px'
  },
  footerIcon: {
    marginRight: theme.spacing(1)
  },
  typo: {
    display: 'flex'
  },
  lastTypo: {
    display: 'flex',
    marginBottom: theme.spacing(4)
  },
  info: {
    marginTop: '75px'
  },
  welcome: {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#032662'
  },
  subtittle: {
    marginBottom: 20
  },
}));

export default function Home() {

  const classes = useStyles();
  const history = useHistory();
  const role = Auth.getRole();
  const token = Auth.getToken();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} style={{ width: "100%" }}>
        {role === 0 && (
          <Grid item xs={12}>
            <Find />
          </Grid>
        )}
        {role === 1 && (
          <Grid item xs={12}>
          <Find />
        </Grid>
        )}

        {(role === 2 || role === 3) && (
          <Grid item xs={12}>
            <Find />
          </Grid>
        )}
      </Grid>
    </div >
  );
}