import React, { useState } from 'react';
import StyledButton from '../components/styled/StyledButton';
import {
	Box,
	Typography,
	Grid,
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	FormControlLabel,
} from '@mui/material';
import StyledTextField from '../components/styled/StyledTextField';
import axios from 'axios';
import '../styles/EditActivePlot.css';

// FIXME: Add form authentication:
// can't submit a form with plot filled status that doesn't have corresponding fields
// example: Interred plot with no 'headstone' field, reserved plot with no 'reserved for' field

export default function EditActivePlot(props) {
	const [plot, setPlot] = useState((props.data && props.data.plot) || '');
	const [headstone, setHeadstone] = useState(
		(props.data && props.data.headstone) || ''
	);
	const [reserved, setReserved] = useState(
		(props.data && props.data.reserved) || ''
	);
	const [comments, setComments] = useState(
		(props.data && props.data.comments) || ''
	);
	const [plotFilledStatus, setPlotFilledStatus] = useState(
		props.data && props.data.plotFilledStatus
	);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	function handleClick() {
		props.toggleEditing();
	}

	function handleChange(e) {
		if (e.target.name === 'plot') {
			setPlot(e.target.value);
		} else if (e.target.name === 'headstone') {
			setHeadstone(e.target.value);
		} else if (e.target.name === 'reserved') {
			setReserved(e.target.value);
		} else if (e.target.name === 'comments') {
			setComments(e.target.value);
		} else if (e.target.name === 'plotFilledStatus') {
			setPlotFilledStatus(e.target.value);
		}
	}

	function sendUpdatedData(updatedFields) {
		axios
			.post(`/plots/edit/${props.data.airtableId}`, updatedFields)
			.then((response) => {
				if (response.data.statusCode > 200) {
					alert(response.data.message);
				} else {
					let updateResults = response.data._rawJson.fields;
					let updatedPlotId = response.data._rawJson.id;
					if (!updateResults.hasOwnProperty('comments'))
						updateResults.comments = '';
					if (!updateResults.hasOwnProperty('reserved'))
						updateResults.reserved = '';
					if (!updateResults.hasOwnProperty('headstone'))
						updateResults.headstone = '';
					if (!updateResults.hasOwnProperty('plot')) updateResults.plot = '';
					props.updatePlot(updatedPlotId, updateResults);
				}
			})
			.catch((err) => console.log(err));
	}

	function handleSubmit(e) {
		e.preventDefault();
		setIsButtonDisabled(true);

		const state = { plot, headstone, reserved, comments, plotFilledStatus };
		// create new object that will eventually be submitted to airtable API
		let updatedFields = {};
		// check to see if state values are different from prop values
		for (let key in state) {
			if (key === 'isButtonDisabled') continue;
			// ***** bug when line 58 is commented *****
			if (props.data[key] === undefined && state[key] === '') continue;
			if (props.data[key] !== state[key]) updatedFields[key] = state[key];
			if (props.data[key] && state[key] === '') {
				updatedFields[key] = null;
			}
		}
		function isEmpty(obj) {
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					// console.log(obj);
					// console.log(`${key} had a value of${[obj[key]]} was in the updatedFields object, therefore we post the call`);
					// console.log('The object isnt empty, so it gets passed onto the post call');
					return false;
				}
			}

			return true;
		}
		if (isEmpty(updatedFields)) {
			alert(`there have been no changes made`);
			props.toggleEditing();
		} else {
			sendUpdatedData(updatedFields);
		}
	}

	return (
		<>
			<Box
				flexGrow={1}
				sx={{
					backgroundColor: 'rgb(19, 33, 69)',
					color: 'white',
					borderRadius: '12px',
					padding: '20px',
					minHeight: '220px',
				}}
			>
				<Typography
					mb={3}
					variant='h5'
					textAlign='center'
					fontWeight={300}
					color='rgb(144, 154, 176)'
				>
					Edit Plot
				</Typography>
				<Grid container spacing={3} mb={3}>
					<Grid item xs={6} sm={6} md={4}>
						<StyledTextField
							variant='outlined'
							sx={{ display: 'inline-block' }}
							onChange={handleChange}
							name='plot'
							id='plot'
							type='text'
							value={plot}
							label='plot'
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={6} sm={6} md={4}>
						<StyledTextField
							variant='outlined'
							sx={{ display: 'inline-block' }}
							onChange={handleChange}
							name='headstone'
							id='headstone'
							type='text'
							value={headstone}
							label='headstone'
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={6} sm={6} md={4}>
						<StyledTextField
							variant='outlined'
							sx={{ display: 'inline-block' }}
							onChange={handleChange}
							name='reserved'
							id='reserved'
							type='text'
							value={reserved}
							label='reserved for'
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={6} sm={6} md={4}>
						<StyledTextField
							aria-label='comments'
							multiline
							minRows={1}
							maxRows={4}
							name='comments'
							id='comments'
							label='comments'
							value={comments}
							onChange={handleChange}
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								display: { xs: 'flex', lg: 'inherit' },
								justifyContent: { xs: 'center' },
							}}
						>
							<FormControl component='fieldset'>
								<FormLabel
									component='legend'
									sx={{
										color: 'rgb(144, 154, 176)',
										textAlign: 'center',
										marginBottom: '10px',
										'&.Mui-focused': {
											color: 'rgb(200, 200, 250)',
										},
									}}
								>
									Plot Status:
								</FormLabel>
								<RadioGroup
									row
									aria-label='plot status'
									name='plotFilledStatus'
									onChange={handleChange}
									value={plotFilledStatus}
									sx={{
										'& .MuiRadio-root': {
											color: 'rgb(144, 154, 176)',
											'&.Mui-checked': { color: 'rgb(150, 200, 230)' },
										},
									}}
								>
									<FormControlLabel
										value='available'
										labelPlacement='top'
										control={<Radio />}
										label='Available'
									/>
									<FormControlLabel
										value='reserved'
										labelPlacement='top'
										control={<Radio />}
										label='Reserved'
									/>
									<FormControlLabel
										value='interred'
										labelPlacement='top'
										control={<Radio />}
										label='Interred'
									/>
								</RadioGroup>
							</FormControl>
						</Box>
					</Grid>
				</Grid>
				<Box
					sx={{
						display: { xs: 'flex', sm: 'inherit' },
						justifyContent: { xs: 'center' },
					}}
				>
					<StyledButton
						variant='contained'
						color='error'
						onClick={handleClick}
						sx={{ marginRight: '15px' }}
					>
						Cancel Edit
					</StyledButton>
					<StyledButton
						variant='contained'
						onClick={handleSubmit}
						disabled={isButtonDisabled}
					>
						Submit
					</StyledButton>
				</Box>
			</Box>
		</>
	);
}
