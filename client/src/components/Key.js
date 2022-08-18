import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Key(props) {
	return (
		<div>
			<Box
				sx={{
					backgroundColor: 'rgba(255,255,255,.05)',
					padding: '10px',
					borderRadius: '10px',
					position: 'absolute',
					right: '7%',
					top: '2%',
				}}
			>
				<Box
					sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}
				>
					<Box
						sx={{
							display: 'inline-block',
							backgroundColor: 'rgb(228, 44, 90)',
							width: { xs: '14px', lg: '18px' },
							height: { xs: '14px', lg: '18px' },
							borderRadius: { xs: '3px', lg: '5px' },
						}}
					></Box>
					<Typography
						component='span'
						display='inline-block'
						variant='body'
						sx={{ fontSize: { xs: '12px', lg: '14px' }, paddingLeft: '10px' }}
					>
						Selected
					</Typography>
				</Box>
				<Box
					sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}
				>
					<Box
						sx={{
							display: 'inline-block',
							backgroundColor: '#78d0cb',
							width: { xs: '14px', lg: '18px' },
							height: { xs: '14px', lg: '18px' },
							borderRadius: { xs: '3px', lg: '5px' },
						}}
					></Box>
					<Typography
						component='span'
						display='inline-block'
						variant='body'
						sx={{ fontSize: { xs: '12px', lg: '14px' }, paddingLeft: '10px' }}
					>
						Available
					</Typography>
					<Typography
						component='span'
						sx={{ paddingLeft: '5px', color: 'rgba(255,255,255, .5)' }}
					>
						{props.plotStatistics.available
							? `(${props.plotStatistics.available} / ${props.plotStatistics.total})`
							: `(XX/XX)`}
					</Typography>
				</Box>
				<Box
					sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}
				>
					<Box
						sx={{
							display: 'inline-block',
							backgroundColor: 'slateblue',
							width: { xs: '14px', lg: '18px' },
							height: { xs: '14px', lg: '18px' },
							borderRadius: { xs: '3px', lg: '5px' },
						}}
					></Box>
					<Typography
						component='span'
						display='inline-block'
						variant='body'
						sx={{ fontSize: { xs: '12px', lg: '14px' }, paddingLeft: '10px' }}
					>
						Reserved
					</Typography>
					<Typography
						component='span'
						sx={{ paddingLeft: '5px', color: 'rgba(255,255,255, .5)' }}
					>
						{props.plotStatistics.reserved
							? `(${props.plotStatistics.reserved} / ${props.plotStatistics.total})`
							: `(XX/XX)`}
					</Typography>
				</Box>
				<Box
					sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}
				>
					<Box
						sx={{
							display: 'inline-block',
							backgroundColor: '#494949',
							width: { xs: '14px', lg: '18px' },
							height: { xs: '14px', lg: '18px' },
							borderRadius: { xs: '3px', lg: '5px' },
						}}
					></Box>
					<Typography
						component='span'
						display='inline-block'
						variant='body'
						sx={{ fontSize: { xs: '12px', lg: '14px' }, paddingLeft: '10px' }}
					>
						Interred
					</Typography>
					<Typography
						component='span'
						sx={{ paddingLeft: '5px', color: 'rgba(255,255,255, .5)' }}
					>
						{props.plotStatistics.interred
							? `(${props.plotStatistics.interred} / ${props.plotStatistics.total})`
							: `(XX/XX)`}
					</Typography>
				</Box>
			</Box>
		</div>
	);
}
