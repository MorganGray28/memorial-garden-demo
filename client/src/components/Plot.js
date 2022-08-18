import React from 'react';
import '../styles/Plot.css';

export default function Plot(props) {
	let plotClass;
	if (props.activePlot && props.activePlot.location === props.location) {
		plotClass = 'activePlot';
	} else if (props.plotFilledStatus === 'interred') {
		plotClass = 'interredPlot';
	} else if (props.plotFilledStatus === 'reserved') {
		plotClass = 'reservedPlot';
	} else {
		plotClass = 'unfilledPlot';
	}

	return (
		<rect
			className={plotClass}
			id={props.pathId}
			// points={props.pathPoints}
			x={props.xCoord}
			y={props.yCoord}
			width='72'
			height='72'
			rx={5}
			ry={5}
			fill='#505050'
			// stroke="white"
			onClick={props.click}
			onMouseOver={props.hover}
			onMouseOut={props.unhover}
		/>
	);
}
