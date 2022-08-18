import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import EditActivePlot from '../components/EditActivePlot';
import ActivePlot from '../components/ActivePlot';
import TabGroup from '../components/TabGroup';
import axios from 'axios';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import StyledSpinningLoader from '../components/styled/StyledSpinningLoader';

export default function Dashboard(props) {
	const [plotData, setPlotData] = useState([]);
	const [activePlot, setActivePlot] = useState(null);
	const [highlightedPlot, setHighlightedPlot] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [plotStatistics, setplotStatistics] = useState({
		available: null,
		reserved: null,
		interred: null,
		total: null,
	});

	useEffect(() => {
		console.log('fetch data from Airtable DB on mount');
		async function fetchDatabaseData() {
			try {
				const data = await axios.get('/plots');
				const results = data.data.map((plot) => {
					let formattedResults = {
						airtableId: plot.id,
						id: plot.fields.location,
						location: plot.fields.location,
						plot: plot.fields.plot,
						headstone: plot.fields.headstone,
						reserved: plot.fields.reserved,
						comments: plot.fields.comments,
						plotFilledStatus: plot.fields.plotFilledStatus,
						xCoord: plot.fields.x,
						yCoord: plot.fields.y,
					};
					return formattedResults;
				});
				setPlotData(results);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
		fetchDatabaseData();
	}, []);

	// calculate the number of available, reserved, and interred plots to display every time the plotData state changes
	useEffect(() => {
		let numAvailable = 0;
		let numReserved = 0;
		let numInterred = 0;
		if (plotData.length) {
			for (let plot of plotData) {
				if (plot.plotFilledStatus === 'available') {
					numAvailable += 1;
				} else if (plot.plotFilledStatus === 'reserved') {
					numReserved += 1;
				} else if (plot.plotFilledStatus === 'interred') {
					numInterred += 1;
				}
			}
			setplotStatistics({
				available: numAvailable,
				reserved: numReserved,
				interred: numInterred,
				total: plotData.length,
			});
		}
	}, [plotData]);

	function makeActivePlot(plot) {
		setActivePlot(plot);
		setIsEditing(false);
	}

	function toggleEditing() {
		setIsEditing(!isEditing);
	}

	function makeHighlightedPlot(plot) {
		setHighlightedPlot(plot);
	}

	function updatePlot(id, updates) {
		let newActive;
		let updatedPlots = plotData.map((plot) => {
			if (plot.airtableId === id) {
				for (let key in updates) {
					plot[key] = updates[key];
				}
				newActive = plot;
				return plot;
			}
			return plot;
		});
		// sort the plots alphabetically by headstone before we call setPlotData
		setPlotData(updatedPlots);
		setActivePlot(newActive);
		setIsEditing(false);
	}

	const drawerWidth = 300;

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<NavBar
					data={plotData}
					setActive={makeActivePlot}
					logout={props.logout}
					currentActive={activePlot}
				/>

				<Box
					sx={{
						flexGrow: 1,
						p: { xs: 1, sm: 3 },
						width: { md: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					<Box
						sx={{
							backgroundColor: 'rgb(228, 231, 236)',
							borderRadius: '12px',
							p: { xs: 1, sm: 2 },
						}}
					>
						{isEditing ? (
							<EditActivePlot
								toggleEditing={toggleEditing}
								data={activePlot}
								updatePlot={updatePlot}
								logout={props.logout}
							/>
						) : (
							<ActivePlot
								data={activePlot}
								isEditing={isEditing}
								toggleEditing={toggleEditing}
								logout={props.logout}
							/>
						)}

						<Box
							flexGrow={1}
							sx={{
								minHeight: '500px',
								backgroundColor: 'rgb(19, 33, 69)',
								color: 'white',
								borderRadius: '12px',
								padding: { xs: '0', md: '20px' },
								mt: { xs: 1, sm: 2 },
							}}
						>
							{isLoading ? (
								<Box
									sx={{
										width: '100%',
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										paddingTop: '40px',
									}}
								>
									<StyledSpinningLoader />
								</Box>
							) : (
								<TabGroup
									activePlot={activePlot}
									data={plotData}
									setActive={makeActivePlot}
									setHighlighted={makeHighlightedPlot}
									highlightedPlot={highlightedPlot}
									plotStatistics={plotStatistics}
								/>
							)}
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
