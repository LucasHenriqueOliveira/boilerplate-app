import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	formControl: {
		fullWidth: true,
		display: 'flex',
	},
}));

export default function Address(props) {
	const { cep, addressNumber, street, complement, neighborhood, state, city, handleChange, handleAdress } = props;
	const classes = useStyles();

	async function cepRequest() {
		if (cep) {
			await axios.get('https://viacep.com.br/ws/' + cep + '/json')
				.then(response => {

					const addressData = {
						street: response.data.logradouro,
						neighborhood: response.data.bairro,
						city: response.data.localidade,
						cityId: response.data.ibge,
						state: response.data.uf
					}

					handleAdress(addressData);

				})
				.catch(err => {
					console.log('Erro ao retornar as cidades!');
				});
		}
	}

	const states = [
		'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
		'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
	];

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Endereço
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={3}>
					<TextField
						required
						id="cep"
						name="cep"
						label="CEP"
						fullWidth
						value={cep}
						onBlur={cepRequest}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={9}>
					<TextField
						required
						id="street"
						name="street"
						label="Logradouro"
						fullWidth
						value={street}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						required
						id="addressNumber"
						name="addressNumber"
						label="Número"
						fullWidth
						value={addressNumber}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						id="complement"
						name="complement"
						label="Complemento"
						fullWidth
						value={complement}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="neighborhood"
						name="neighborhood"
						label="Bairro"
						fullWidth
						value={neighborhood}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<FormControl required className={classes.formControl}>
						<InputLabel id="stateId">UF</InputLabel>
						<Select
							labelId="stateId"
							id="state"
							name="state"
							fullWidth
							defaultValue=""
							value={state}
							onChange={handleChange}
						>

							{states.map((state) => (
								<MenuItem key={state} value={state}>
									{state}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={8}>
					<TextField
						required
						id="city"
						name="city"
						label="Cidade"
						fullWidth
						value={city}
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
		</React.Fragment >
	);
}
