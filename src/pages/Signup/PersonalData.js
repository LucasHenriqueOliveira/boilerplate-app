import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import InputMask from 'react-input-mask';
import { validate } from 'gerador-validador-cpf';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
	formControl: {
		fullWidth: true,
		display: 'flex',
	},
	checkWithoutCPF: {
		paddingBottom: 0,
		paddingleft: 0,
		top: 15,
		textAlign: 'left'
	}
}));

export default function PersonalData(props) {
	const { name, motherName, cpf, procurator, procuratorCPF, rg, passport,  certificateBirthNumber, phone, gender, email, birthDate, checkWithoutCPF, handleChange, handleCheckWithoutCPF } = props;
	const classes = useStyles();
	const [checkEmail, setCheckEmail] = useState('')
	const [errorCpf, setErrorCpf] = useState('')
	const [errorCpfProcurator, setErrorCpfProcurator] = useState('')
	const [errorPhone, setErrorPhone] = useState('')

	useEffect(() => {
		isEmail(email)
		isCPF(cpf)
		if (checkWithoutCPF) {
			isCPF(procuratorCPF, checkWithoutCPF)
		}
	}, [email, cpf, procuratorCPF, checkWithoutCPF])

	const handleDateChange = (date) => {
		handleChange({ "target": { "name": "birthDate", "value": date } });
	};

	function isEmail(email) {
		var re = /\S+@\S+\.\S+/;
		if (re.test(email) === true || email === '') {
			setCheckEmail('')
		}
		else {
			setCheckEmail('Endereço inválido')
		}
	}
	function validatePhone() {
		if (phone.charAt(4) !== '9' && phone !== '(__)_____-____' )
			setErrorPhone('Insira um número válido')
		else setErrorPhone('')
	}

	function isCPF(cpf, hasCPF) {
		const message = 'Insira um CPF válido'
		validate(cpf) === true || cpf === '___.___.___-__' || cpf === '' ? 
		hasCPF ? setErrorCpfProcurator('') : setErrorCpf('')
		: hasCPF ? setErrorCpfProcurator(message) : setErrorCpf(message)	
		
	}

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Dados Pessoais
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						required
						id="name"
						name="name"
						label="Nome completo"
						fullWidth
						autoComplete="name"
						value={name}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="email"
						name="email"
						label="Email"
						fullWidth
						autoComplete="email"
						value={email}
						onChange={handleChange}
						error={checkEmail !== ''}
						helperText={checkEmail === '' ? '' : checkEmail}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							required
							id="birth-date-dialog"
							name="birthDate"
							label="Data de Nascimento"
							format="dd/MM/yyyy"
							value={birthDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12} sm={6}>
					<InputMask mask="(99)99999-9999" value={phone} 
					onBlur={validatePhone} 
					onChange={handleChange}>
						{() =>
							<TextField
								type=''
								required
								id="phone"
								name="phone"
								label="Celular"
								fullWidth
								error={errorPhone !== ''}
								value={phone}
								onChange={handleChange}
								
							/>}
					</InputMask>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl required className={classes.formControl}>
						<InputLabel id="gender">Sexo</InputLabel>
						<Select
							labelId="gender"
							id="gender"
							name="gender"
							fullWidth
							value={gender}
							defaultValue=""
							onChange={handleChange}
						>
							<MenuItem value="" disabled={true}></MenuItem>
							<MenuItem value="Masculino">Masculino</MenuItem>
							<MenuItem value="Feminino">Feminino</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={9}>
					<TextField
						required
						id="motherName"
						name="motherName"
						label="Nome da mãe"
						fullWidth
						autoComplete="motherName"
						value={motherName}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={6} sm={6}>
					<InputMask mask='999.999.999-99' value={cpf} onChange={handleChange} disabled={checkWithoutCPF ? true : false}>
						{() => <TextField
							id="cpf"
							name="cpf"
							label="CPF"
							fullWidth
							value={cpf}
							onChange={handleChange}
							error={errorCpf !== ''}
							helperText={errorCpf === '' ? '' : errorCpf}
							disabled={checkWithoutCPF ? true : false}
						/>}
					</InputMask>
				</Grid>
				<Grid item xs={6} sm={6} className={classes.checkWithoutCPF}>
					<FormControlLabel
							control={
								<Checkbox color="secondary"
									name="checkTrueInfo"
									id="checkTrueInfo"
									value="true"
									onChange={handleCheckWithoutCPF}
									checked={checkWithoutCPF} />
							}
							label={
								<span style={{fontSize: '14px'}}>
									Não possui CPF
								</span>
							}
							className={classes.checkbox}
						/>
				</Grid>
				{ checkWithoutCPF && (
				<>
					<Grid item xs={12} sm={4}>
						<TextField
							id="rg"
							name="rg"
							label="RG"
							fullWidth
							autoComplete="rg"
							value={rg}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="certificateBirthNumber"
							name="certificateBirthNumber"
							label="Cert. de nascimento"
							fullWidth
							autoComplete="certificateBirthNumber"
							value={certificateBirthNumber}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="passport"
							name="passport"
							label="Número do Passaporte"
							fullWidth
							autoComplete="passport"
							value={passport}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="procurator"
							name="procurator"
							label="Representante Legal"
							fullWidth
							value={procurator}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InputMask mask='999.999.999-99' value={procuratorCPF} onChange={handleChange}>
							{() => <TextField
								id="procuratorCPF"
								name="procuratorCPF"
								label="CPF do representante legal"
								fullWidth
								value={procuratorCPF}
								onChange={handleChange}
								error={errorCpfProcurator !== ''}
								helperText={errorCpfProcurator === '' ? '' : errorCpfProcurator}
							/>}
						</InputMask>
					</Grid>
				</>
				)}
			</Grid>
		</React.Fragment>
	);
}
