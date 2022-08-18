import { Box, Typography } from '@mui/material';
import React from 'react';
import Plot from './Plot';
import Key from './Key';
import '../styles/SVGWrapper.css';

export default function SVGWrapper(props) {
	function handleClick(e) {
		let plot = findPlot(e.target.id);
		props.setActive(plot);
	}

	function handleHover(e) {
		let plot = findPlot(e.target.id);
		props.setHighlighted(plot);
	}

	function handleUnhover() {
		props.setHighlighted(null);
	}

	function findPlot(plotLocation) {
		let active = props.data.filter((plot) => {
			return plot.location === plotLocation;
		});
		return active[0];
	}

	const paths = props.data.map((plot) => {
		return (
			<Plot
				activePlot={props.activePlot}
				pathId={plot.id}
				xCoord={plot.xCoord}
				yCoord={plot.yCoord}
				comments={plot.comments}
				headstone={plot.headstone}
				plotFilledStatus={plot.plotFilledStatus}
				location={plot.location}
				plot={plot.plot}
				reserved={plot.reserved}
				key={plot.location}
				click={handleClick}
				hover={handleHover}
				unhover={handleUnhover}
			/>
		);
	});

	let highlightedPlot;
	if (props.highlightedPlot) {
		if (props.highlightedPlot.headstone) {
			highlightedPlot = (
				<>
					<Typography>Headstone: {props.highlightedPlot.headstone}</Typography>
					<Typography>Location: {props.highlightedPlot.location}</Typography>
				</>
			);
		} else if (props.highlightedPlot.plotFilledStatus === 'available') {
			highlightedPlot = (
				<>
					<Typography>Plot is available</Typography>
					<Typography>Location: {props.highlightedPlot.location}</Typography>
				</>
			);
		}
	} else {
		highlightedPlot = 'Hover over plot to view headstone';
	}
	return (
		<Box
			sx={{
				maxWidth: { xs: `calc(100vw - 160px)`, md: '100%', lg: '95%' },
				minWidth: { xs: '100%' },
				overflow: 'auto',
			}}
		>
			<Box sx={{ height: '5px' }}>{highlightedPlot}</Box>
			<Box
				className='SVGContainer'
				sx={{
					minWidth: { xs: '800px', md: '100%' },
					overflow: 'auto',
					position: 'relative',
					paddingTop: '50px',
				}}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					// width='70%'
					viewBox='0 0 1270 679.47'
				>
					<g id='sidewalk'>
						<polyline
							points='.5 327.47 .5 255.97 1269.5 255.47 1269.5 327.47 432 327.47 431.45 678.97 358.01 678.97 360 327.47 .5 327.97'
							fill='rgba(200, 200, 255, .1)'
							stroke='rgba(200, 200, 255, .3)'
							strokeWidth={2}
						/>
					</g>
					<g id='Statue'>
						<rect
							x='369.5'
							y='3.97'
							width='216'
							height='108'
							fill='rgba(200, 200, 255, .1)'
							stroke='rgba(200, 200, 255, .3)'
							strokeWidth={2}
						/>
						<text
							fill='rgba(255, 255, 255, .9)'
							transform='translate(451.9 62.03)'
						>
							<tspan x='0' y='0'>
								Statue
							</tspan>
						</text>
						<text
							fill='rgba(255, 255, 255, .9)'
							transform='translate(364.76 296.03)'
						>
							<tspan x='0' y='0'>
								Sidewalk
							</tspan>
						</text>
					</g>
					{paths}
				</svg>
				<Key plotStatistics={props.plotStatistics} />
			</Box>
		</Box>
	);
}
