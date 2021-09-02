import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import Auth from '../../shared/auth';
import { ReactComponent as Logo } from '../../assets/logo.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { validate } from 'gerador-validador-cpf'
import InputMask from 'react-input-mask';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    marginBottom: '30px',
    marginTop: '20px'
  },
  link: {
    color: '#032662',
    marginTop: '100px'
  },
  button: {
    marginBottom: '10px'
  }
}));

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [errorCpf, setErrorCpf] = useState('');
  const [checkEmail, setCheckEmail] = useState('');


  const showMessage = (text, type) => {
    enqueueSnackbar(text, {
      variant: type,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  }

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setCpf('');
  }
  const handleConfirm = (event) => {
    handleRecovery(event);
    setOpen(false);
  }

  async function handleRecovery(event) {
    event.preventDefault();
    if (!cpf || !email) {
      showMessage('Favor informar seu cpf e seu email! ', 'error')
      return;
    }

    await api.post('recovery', { cpf, email }).then(response => {
      if (response.data.status === 1) {
        showMessage(response.data.message, 'success');
      }
      else {
        showMessage(response.data.message, 'warning');
        setCpf('');
        setEmail('');
      }
    }).catch(error => {
      showMessage(error.response.data.message, 'error');
      setCpf('');
      setEmail('');
    })
  }

  function validateCpf() {
    validate(cpf) === true || cpf === '___.___.___-__' || cpf === '' ? setErrorCpf('') : setErrorCpf('Insira um CPF válido')
  }
  function isEmail(value) {
    setEmail(value)
    var re = /\S+@\S+\.\S+/;
    if (re.test(email) === true || email === '') {
      setCheckEmail('')
    }
    else {
      setCheckEmail('Endereço inválido')
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    try {

      if (!user || !password) {
        enqueueSnackbar('Favor informar o usuário e a senha!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
        return;
      }

      const response = await api.post('login', { user, password });

      if (response) {
        Auth.setToken(response.data.data.authToken);
        Auth.setRole(response.data.data.role);
        Auth.setEmail(response.data.data.email);
        Auth.setId(response.data.data._id);
        history.push('/home');
      }
    } catch (err) {
      const message = (err.response.data.hasOwnProperty("data")) ? err.response.data.data[0].msg : 'Usuário ou senha incorretos!';
      enqueueSnackbar(message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo className={classes.logo} />

        <form onSubmit={handleLogin} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="user"
            label="Usuário"
            value={user}
            onChange={e => setUser(e.target.value)}
            type="text"
            id="user"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>

          <Grid container>
            <Grid item xs>
              <Button
                className={classes.button}
                type='button'
                fullWidth
                variant='contained'
                color='default'
                component={Link} to={'/signup'}
              >
                Não possui cadastro?
            </Button>
            </Grid>
          </Grid>
          <Link className={classes.link} onClick={handleOpen}>Esqueci minha senha</Link>
        </form>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Recuperar senha</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para recuperar sua senha digite seu CPF e seu email. Um SMS será enviado contendo sua senha e usuário. <br />
              Somente solicite este serviço se tiver perdido acesso a mensagem contendo sua senha e nome de usuário enviados no momento do cadastro.
            </DialogContentText>

            <InputMask mask='999.999.999-99' value={cpf} onBlur={validateCpf} onChange={e => setCpf(e.target.value)}>
              {() => <TextField
                autoFocus
                margin="dense"
                id="cpf"
                label="CPF"
                fullWidth
                value={cpf}
                error={errorCpf !== ''}
                helperText={errorCpf === '' ? '' : errorCpf}
              />}
            </InputMask>

            <TextField
              name='email'
              margin="dense"
              id="email"
              label="Email"
              onChange={e => isEmail(e.target.value)}
              fullWidth
              value={email}
              error={checkEmail !== ''}
              helperText={checkEmail === '' ? '' : checkEmail}
            />

          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
          </Button>
            <Button onClick={handleConfirm} color="primary">
              Confirmar
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}
