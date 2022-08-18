import React from 'react';
import StyledTableList from './styled/StyledTableList';
import { Typography, Chip, Box } from '@mui/material';

export const TableList = React.forwardRef((props, ref) => {
	const chipColor = {
		available: 'info',
		reserved: 'secondary',
		interred: 'success',
	};

	function handleClick() {
		props.setActive(this);
	}

	const plots = props.plotData.map((p) => (
		<StyledTableList
			active={p === props.activePlot}
			key={p.location}
			onClick={handleClick.bind(p)}
		>
			<Typography
				variant='body1'
				sx={{
					color: 'rgb(189, 200, 240)',
					fontSize: { xs: '.75rem', lg: '1rem' },
					padding: '6px 0',
					width: '15%',
					'@media print': { color: 'black' },
				}}
			>
				{p.location}
			</Typography>
			<Typography
				variant='body1'
				sx={{
					color: 'rgb(189, 200, 240)',
					fontSize: { xs: '.75rem', lg: '1rem' },
					padding: '6px 0',
					width: '15%',
					'@media print': { color: 'black' },
				}}
			>
				{p.headstone ? p.headstone : 'N/A'}
			</Typography>
			<Typography
				variant='body1'
				sx={{
					color: 'rgb(189, 200, 240)',
					fontSize: { xs: '.75rem', lg: '1rem' },
					padding: '6px 0',
					width: '15%',
					'@media print': { color: 'black' },
				}}
			>
				{p.reserved ? p.reserved : 'N/A'}
			</Typography>
			<Box
				sx={{
					width: { sm: '15%' },
					'@media print': {
						display: 'none',
					},
				}}
			>
				<Chip
					label={p.plotFilledStatus}
					variant='filled'
					color={chipColor[p.plotFilledStatus]}
				/>
			</Box>

			<Typography
				variant='body1'
				sx={{
					color: 'rgb(189, 200, 240)',
					fontSize: { xs: '.75rem', lg: '1rem' },
					padding: '6px 0',
					width: '15%',
					display: 'none',
					'@media print': {
						display: 'block',
						color: 'black',
					},
				}}
			>
				{p.plotFilledStatus}
			</Typography>
		</StyledTableList>
	));
	return (
		<div ref={ref}>
			<Box
				sx={{
					position: 'sticky',
					width: '100%',
					top: 0,
					backgroundColor: 'grey',
					display: 'none',
					justifyContent: 'space-between',
					padding: '10px',
					marginBottom: '10px',
					'@media print': { display: 'flex', borderBottom: '1px solid black' },
				}}
			>
				<Typography variant='body1' sx={{ width: '15%' }}>
					Location
				</Typography>
				<Typography variant='body1' sx={{ width: '15%' }}>
					Headstone
				</Typography>
				<Typography variant='body1' sx={{ width: '15%' }}>
					Reserved For
				</Typography>
				<Typography variant='body1' sx={{ width: '15%' }}>
					Plot Status
				</Typography>
			</Box>
			{plots}
		</div>
	);
});

export default TableList;
