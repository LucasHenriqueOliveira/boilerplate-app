import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import moment from 'moment'


const useStyles = makeStyles((theme) => ({
	link: {
		position: 'absolute',
		right: 10,
		top: 30
	},
	listItem: {
		padding: theme.spacing(1, 0),
	},
	left: {
		textAlign: 'left'
	},
	bold: {
		fontWeight: 700
	},
	checkbox: {
		marginRight: 0,
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	grid: {
		display: 'flex'
	},
	links: {
		marginTop: 20,
		marginBottom: 20
	}
}));

export default function Info(props) {
	const { name, motherName, procurator, procuratorCPF ,passport ,cpf, certificateBirthNumber, rg, phone, gender, email, birthDate,
		cep, addressNumber, street, complement, neighborhood, state,
		city,
		checkPrivacityPolicy,
		checkUserTerms,
		checkSMSNotification,
		checkEmailNotification,
		checkTrueInfo,
		checkPrivacityPolicyDoc,
		checkUserTermsDoc,
		handleCheckPrivacityPolicyChange,
		handleCheckUserTermsChange,
		handleCheckSMSNotificationChange,
		handleCheckEmailNotificationChange,
		handleCheckTrueInfoChange,
		handleCheckWithoutCPF
	} = props;
	const classes = useStyles();
	const [openPrivacityPolicy, setOpenPrivacityPolicy] = useState(false);
	const [openUserTerms, setOpenUserTerms] = useState(false);

	const handleOpenPrivacityPolicy = () => {
		setOpenPrivacityPolicy(true);
	};

	const handleClosePrivacityPolicy = () => {
		setOpenPrivacityPolicy(false);
	};

	const handleOpenUserTerms = () => {
		setOpenUserTerms(true);
	};

	const handleCloseUserTerms = () => {
		setOpenUserTerms(false);
	};

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Resumo
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} className={classes.left}>
					<Typography variant="body2" className={classes.bold}>Nome Completo</Typography>
					<Typography variant="body2">{name}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Data de Nascimento</Typography>
					<Typography variant="body2">{moment(birthDate).format('DD/MM/YYYY')}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left}>
					<Typography variant="body2" className={classes.bold}>Sexo</Typography>
					<Typography variant="body2">{gender}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>CPF</Typography>
					<Typography variant="body2">{cpf}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Email</Typography>
					<Typography variant="body2">{email}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Telefone</Typography>
					<Typography variant="body2">{phone}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left}>
					<Typography variant="body2" className={classes.bold}>Nome da Mãe Completo</Typography>
					<Typography variant="body2">{motherName}</Typography>
				</Grid>
				{ handleCheckWithoutCPF && (
					<>
						<Grid item xs={12} sm={6} className={classes.left} >
							<Typography variant="body2" className={classes.bold}>Número da certidão de Nascimento</Typography>
							<Typography variant="body2">{certificateBirthNumber}</Typography>
						</Grid>
						
						<Grid item xs={12} sm={6} className={classes.left} >
							<Typography variant="body2" className={classes.bold}>Número do RG</Typography>
							<Typography variant="body2">{rg}</Typography>
						</Grid>

						<Grid item xs={12} sm={6} className={classes.left} >
							<Typography variant="body2" className={classes.bold}>Número do Passaporte</Typography>
							<Typography variant="body2">{passport}</Typography>
						</Grid>

						<Grid item xs={12} sm={6} className={classes.left} >
							<Typography variant="body2" className={classes.bold}>Representante Legal</Typography>
							<Typography variant="body2">{procurator}</Typography>
						</Grid>
						
						<Grid item xs={12} sm={6} className={classes.left} >
							<Typography variant="body2" className={classes.bold}>CPF do Representante Legal</Typography>
							<Typography variant="body2">{procuratorCPF}</Typography>
						</Grid>
					</>
				)}
				<Grid item xs={12} sm={12} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>CEP</Typography>
					<Typography variant="body2">{cep}</Typography>
				</Grid>
				<Grid item xs={12} sm={12} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Logradouro</Typography>
					<Typography variant="body2">{street}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Número</Typography>
					<Typography variant="body2">{addressNumber}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Complemento</Typography>
					<Typography variant="body2">{complement}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Bairro</Typography>
					<Typography variant="body2">{neighborhood}</Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.left} >
					<Typography variant="body2" className={classes.bold}>Cidade</Typography>
					<Typography variant="body2">{city}/{state}</Typography>
				</Grid>
				<Grid item xs={12} className={classes.grid}>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox color="secondary"
									name="checkPrivacityPolicy"
									id="checkPrivacityPolicy"
									value="true"
									onChange={handleCheckPrivacityPolicyChange}
									checked={checkPrivacityPolicy} />
							}
							label={<a href={"http://www.visuri.com.br/"+ checkPrivacityPolicyDoc} target="_blank" variant="body2" className={classes.links} style={{fontSize: 14 + 'px'}}>
								Li e aceito a política de privacidade
									</a>}
							className={classes.checkbox}
						/>
						<FormControlLabel
							control={
								<Checkbox color="secondary"
									name="checkUserTerms"
									id="checkUserTerms"
									value="true"
									onChange={handleCheckUserTermsChange}
									checked={checkUserTerms} />
							}
							label={<a href={"http://www.visuri.com.br/"+ checkUserTermsDoc} target="_blank" variant="body2" className={classes.links}  style={{fontSize: 14 + 'px'}}>
								Li e aceito os termos de uso
										</a>}
							className={classes.checkbox}
						/>
						<FormControlLabel
							control={
								<Checkbox color="secondary"
									name="checkSMSNotification"
									id="checkSMSNotification"
									value="true"
									onChange={handleCheckSMSNotificationChange}
									checked={checkSMSNotification} />
							}
							label={<span style={{fontSize: 14 + 'px'}}>
								Aceito receber notificações por SMS relacionadas aos serviços do MyTest
								</span>}
							className={classes.checkbox}
						/>
						<FormControlLabel
							control={
								<Checkbox color="secondary"
									name="checkEmailNotification"
									id="checkEmailNotification"
									value="true"
									onChange={handleCheckEmailNotificationChange}
									checked={checkEmailNotification} />
							}
							label={<span style={{fontSize: 14 + 'px'}}>
								Aceito receber notificações por e-mail relacionadas aos serviços do MyTest
										</span>}
							className={classes.checkbox}
						/>
						<FormControlLabel
							control={
								<Checkbox color="secondary"
									name="checkTrueInfo"
									id="checkTrueInfo"
									value="true"
									onChange={handleCheckTrueInfoChange}
									checked={checkTrueInfo} />
							}
							label={
								<span style={{fontSize: 14 + 'px'}}>
									Atesto que todas as informações fornecidas são verdadeiras e atualizadas
								</span>
							}
							className={classes.checkbox}
						/>
					</FormGroup>
					<Dialog onClose={handleClosePrivacityPolicy} aria-labelledby="customized-dialog-title" open={openPrivacityPolicy}>
						<DialogTitle id="customized-dialog-title" onClose={handleClosePrivacityPolicy}>
							Política de Privacidade
							<IconButton aria-label="close" className={classes.closeButton} onClick={handleClosePrivacityPolicy}>
								<CloseIcon />
							</IconButton>
						</DialogTitle>
						<DialogContent dividers>


						</DialogContent>
						<DialogActions>
							<Button autoFocus onClick={handleClosePrivacityPolicy} color="primary">
								Fechar
							</Button>
						</DialogActions>
					</Dialog>
					<Dialog onClose={handleCloseUserTerms} aria-labelledby="customized-dialog-title" open={openUserTerms}>
						<DialogTitle id="customized-dialog-title" onClose={handleCloseUserTerms}>
							Termos de Uso
							<IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseUserTerms}>
								<CloseIcon />
							</IconButton>
						</DialogTitle>
						<DialogContent dividers>
							<Typography gutterBottom>
								O Sistema ofertado está de acordo com a PORTARIA Nº 467, DE 20 DE MARÇO DE 2020 do Ministério da Saúde para uso durante a pandemia da COVID-19. Por favor, leia atentamente o texto abaixo e, se concordar com as condições do serviço oferecido, clique em aceite.
							</Typography>
							<ul>
								<li>No caso de situações de urgência ou emergência procure o Serviço de Saúde mais próximo.</li>
								<li>Este serviço deve ser acessado apenas por adultos acima de 18 anos. </li>
								<li>Estamos oferecendo um meio de comunicação entre profissionais voluntários e pacientes que precisam de orientação. É um serviço de orientação à distância. </li>
								<li>Não emitiremos atestados, relatórios profissionais, receituários e nem declaração de necessidade de isolamento. </li>
								<li>O usuário paciente se declara totalmente responsável pelas informações fornecidas no cadastro, a partir das quais os profissionais irão se fundamentar para prestar as orientações de assistência em saúde.</li>
								<li>Este serviço encontra-se em fase experimental de funcionamento, motivo pelo qual poderão ocorrer falhas, indisponibilizando-o  temporariamente. </li>
								<li>O tempo de espera, apesar de monitorado, pode ser maior do que o desejado pelo usuário paciente.  </li>
								<li>Por se tratar de um serviço oferecido por profissionais voluntários, eventualmente, o profissional que o paciente procura não estará disponível. Nesse caso o usuário paciente será encaminhado para o próximo horário disponibilizado pelo profissional. </li>
								<li>Este serviço é totalmente gratuito, razão pela qual ninguém, em nome do Centro de Telessaúde, solicitará pagamentos por qualquer serviço aqui prestado. </li>
							</ul>
						</DialogContent>
						<DialogActions>
							<Button autoFocus onClick={handleCloseUserTerms} color="primary">
								Fechar
							</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
