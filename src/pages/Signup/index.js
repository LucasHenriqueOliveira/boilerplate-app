import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalData from './PersonalData';
import Address from './Address';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Info from './Info';
import { useSnackbar } from 'notistack';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Auth from '../../shared/auth';
import moment from 'moment';
import { validate } from 'gerador-validador-cpf';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import './Info'

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
			textAlign: 'center'
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	linkLogin: {
		color: '#fff',
		textDecoration: 'none',
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	titleMobile: {
		display: 'none',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
		},
	},
	divLoading: {
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		position: 'fixed',
		display: 'block',
		opacity: '0.7',
		backgroundColor: '#000',
		zIndex: 99,
		textAlign: 'center'
	},
	loading: {
		position: 'absolute',
		top: '40%',
		zIndex: 100
	}
}));

const steps = ['Dados Pessoais', 'Endereço', 'Resumo'];

const defaultData = {
	name: '',
	motherName: '',
	cpf: '',
	procurator: '',
	procuratorCPF: '',
	rg: '',
	passport: '',
	certificateBirthNumber: '',
	birthDate: null,
	phone: '',
	email: '',
	gender: '',
	cep: '',
	street: '',
	addressNumber: '',
	complement: '',
	neighborhood: '',
	cityId: '',
	city: '',
	state: '',
	checkPrivacityPolicy: false,
	checkUserTerms: false,
	checkSMSNotification: false,
	checkEmailNotification: false,
	checkTrueInfo: false,
	checkPrivacityPolicyDoc: 'Politica_de_Privacidade_My_test.pdf',
	checkUserTermsDoc: 'Termo_de_uso_MyTest.pdf',
	checkWithoutCPF: false
}

export default function SignUp(props) {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [formData, setForm] = useState(defaultData);
	const [activeStep, setActiveStep] = useState(0);
	const [password, setPassword] = useState('');
	const [open, setOpen] = useState(false);
	const [openAlert, setOpenAlert] = useState(true);
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const date = new Date();

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return <PersonalData {...formData} handleChange={handleChange} handleCheckWithoutCPF={handleCheckWithoutCPF} />;
			case 1:
				return <Address {...formData} handleChange={handleChange} handleAdress={handleAdress} />;
			case 2:
				return <Info
					{...formData}
					handleCheckPrivacityPolicyChange={handleCheckPrivacityPolicyChange}
					handleCheckUserTermsChange={handleCheckUserTermsChange}
					handleCheckSMSNotificationChange={handleCheckSMSNotificationChange}
					handleCheckEmailNotificationChange={handleCheckEmailNotificationChange}
					handleCheckTrueInfoChange={handleCheckTrueInfoChange}
					handleCheckWithoutCPF={handleCheckWithoutCPF}
				/>;
			default:
				throw new Error('Unknown step');
		}
	}

	const handleChange = e => {
		const { name, value } = e.target
		setForm({ ...formData, [name]: value })
	}

	const handleCheckPrivacityPolicyChange = e => {
		setForm({ ...formData, ['checkPrivacityPolicy']: !formData['checkPrivacityPolicy'] })
	}

	const handleCheckUserTermsChange = e => {
		setForm({ ...formData, ['checkUserTerms']: !formData['checkUserTerms'] })
	}

	const handleCheckSMSNotificationChange = e => {
		setForm({ ...formData, ['checkSMSNotification']: !formData['checkSMSNotification'] })
	}

	const handleCheckEmailNotificationChange = e => {
		setForm({ ...formData, ['checkEmailNotification']: !formData['checkEmailNotification'] })
	}

	const handleCheckTrueInfoChange = e => {
		setForm({ ...formData, ['checkTrueInfo']: !formData['checkTrueInfo'] })
	}

	const handleCheckWithoutCPF = e => {
		setForm({ ...formData, ['checkWithoutCPF']: !formData['checkWithoutCPF'], ['cpf']: '' })
	}

	const handleAdress = data => {
		setForm({
			...formData,
			['street']: data.street,
			['neighborhood']: data.neighborhood,
			['city']: data.city,
			['state']: data.state,
			['cityId']: data.cityId
		})
	}

	function isEmailInvalid() {
		var re = /\S+@\S+\.\S+/;
		return re.test(formData.email) === true ? false : true
	}

	function isCPfInvalid() {
		return validate(formData.cpf) === true ? false : true
	}

	async function submit() {
		try {
			setLoading(true);
			formData['birthDate'] = moment(formData['birthDate']).startOf('day').toDate()
			formData['stateShortName'] = formData['state'];
			formData['cityName'] = formData['city'];

			formData['name'] = formData['name'].replace(/[']/gi, '');
			formData['motherName'] = formData['motherName'].replace(/[']/gi, '');
			formData['procurator'] = formData['procurator'].replace(/[']/gi, '');
			formData['cpf'] = formData['cpf'].replace(/[\().,:-]+/g, "");
			formData['passport'] = formData['passport'].replace(/[\().,:-]+/g, "");
			formData['procuratorCPF'] = formData['procuratorCPF'].replace(/[\().,:-]+/g, "");
			formData['rg'] = formData['rg'].replace(/[\().,:-]+/g, "");
			formData['certificateBirthNumber'] = formData['certificateBirthNumber'].replace(/[\().,:-]+/g, "");
			formData['phone'] = formData['phone'].replace(/[\().,:-]+/g, "");
			formData['cep'] = formData['cep'].replace(/[\().,:-]+/g, "");

			await api.post('users', formData).then(response => {
				Auth.setToken(response.data.data.authToken);
				Auth.setRole(response.data.data.role);
				Auth.setEmail(response.data.data.email);
				Auth.setId(response.data.data._id);
				showMessage('Cadastro realizado com sucesso', 'success');
				setPassword(moment(formData['birthDate']).format('DDMMYYYY'));
				setOpen(true);
				setLoading(false);
			});
		} catch (err) {
			const message = (err.response && err.response.data.hasOwnProperty("data")) ? err.response.data.data[0].msg : 'Erro ao salvar os dados do usuário! ' + err.message;
			showMessage(message, 'error');
			setLoading(false);
		}
	}

	const showMessage = (text, type) => {
		enqueueSnackbar(text, {
			variant: type,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
		});
	}

	const handleNext = () => {
		if (activeStep + 1 === steps.length) {
			submit();
		}
		else {

			if (activeStep === 0) {
				if (formData.name === '') {
					showMessage('Você deve informar um nome', 'error')
				}
				else if (formData.email === '' || isEmailInvalid(formData.email)) {
					showMessage('Informe um endereço de email válido', 'error')
				}
				else if (formData.phone === '') {
					showMessage('Informe um número de telefone válido', 'error')
				}
				else if (!formData.birthDate) {
					showMessage('Informe sua data de nascimento', 'error')
				}
				else if (formData.gender === '') {
					showMessage('Informe um gênero', 'error')
				}
				else if (formData.motherName === '') {
					showMessage('Informe o nome da mãe', 'error')
				}
				else if (formData.cpf === '' && formData.passport === '' && date.getFullYear() - formData.birthDate.getFullYear() >= 18 || isCPfInvalid(formData.cpf) &&
				date.getFullYear() - formData.birthDate.getFullYear() >= 18 && formData.passport === '') {
					showMessage('Para maiores de 18 anos é necessário informar o CPF ou Passaporte', 'error')
				}
				else if (formData.checkWithoutCPF && !formData.certificateBirthNumber && !formData.rg && !formData.passport) {
					showMessage('Informe o número do RG ou certidão de nascimento', 'error')
				}
				else if (formData.checkWithoutCPF && !formData.procurator && !formData.passport) {
					showMessage('Informe o nome do Representante Legal', 'error')
				}
				else if (formData.checkWithoutCPF && !formData.procuratorCPF && !formData.passport) {
					showMessage('Informe o CPF do Representante Legal', 'error')
				}
				else {
					setActiveStep(activeStep + 1);
				}
			}
			else if (activeStep === 1) {
				if (formData.cep === '') {
					showMessage('Informe seu CEP', 'error')
				}
				else if (formData.city === '') {
					showMessage('Informe sua cidade')
				}
				else if (formData.neighborhood === '') {
					showMessage('Informe seu bairro', 'error')
				}
				else if (formData.addressNumber === '') {
					showMessage('Informe o número da sua residência', 'error')
				}
				else if (formData.state === '') {
					showMessage('Informe seu Estado')
				}
				else {
					setActiveStep(activeStep + 1);
				}
			}
			else {
				setActiveStep(activeStep + 1);
			}
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleOpen = (event) => {
		event.preventDefault();
		history.push('/home');
	};

	const handleCloseAlert = (event) => {
		event.preventDefault();
		setOpenAlert(false);
	}

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5" align="center">
					Cadastro de Usuário
				</Typography>
				<Stepper activeStep={activeStep} className={classes.stepper}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<React.Fragment>
					{getStepContent(activeStep)}

					<div className={classes.buttons}>
						{activeStep !== 0 && (
							<Button onClick={handleBack} className={classes.button}>
								Voltar
							</Button>
						)}
						{activeStep === steps.length - 1 && (
							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
								className={classes.button}
								disabled={!formData.checkPrivacityPolicy
									|| !formData.checkUserTerms
									|| !formData.checkSMSNotification
									|| !formData.checkEmailNotification
									|| !formData.checkTrueInfo
								}
							>
								Salvar
							</Button>
						)}

						{activeStep !== steps.length - 1 && (
							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
								className={classes.button}
							>
								Próximo
							</Button>
						)}
					</div>

					<Grid container>
						<Grid item xs>
							Já possui cadastro? &nbsp;
						<Link to="/login" className={classes.link} variant="body2">
								Entrar
						</Link>
						</Grid>
					</Grid>
				</React.Fragment>

				<Dialog
					open={open}
					onClose={handleOpen}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Dados de Acesso"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Usuário: <b>{user}</b> <br />
							Senha: <b>{password}</b>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleOpen} color="primary" autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={openAlert}
					onClose={handleCloseAlert}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							O cadastro deve ser realizado com os dados da pessoa que irá fornecer a amostra. <br />
							Obs.: Menores de idade podem se cadastrar, desde que haja consentimento expresso dos pais ou responsáveis.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseAlert} color="primary" autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>
			</Paper>

			{ loading && (
				<div className={classes.divLoading}>
					<CircularProgress size={80} style={{ 'color': 'white' }} className={classes.loading} />
				</div>
			)}
		</main>
	);
}
