import React, { useState, useEffect } from 'react';
import SVGWrapper from '../components/SVGWrapper';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function Dashboard(props) {

  const [plotData, setPlotData] = useState([]);
  const [activePlot, setActivePlot] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    console.log('fetch data from Airtable DB on mount');
    async function fetchDatabaseData() {
      try {
        const data = await axios.get('/plots');
        const results = data.data.map((plot) => {
          let formattedResults = {
            airtableId: plot.id,
            location: plot.fields.location,
            plot: plot.fields.plot,
            headstone: plot.fields.headstone,
            reserved: plot.fields.reserved,
            comments: plot.fields.comments,
            plotFilledStatus: plot.fields.plotFilledStatus,
            xCoord: plot.fields.x,
            yCoord: plot.fields.y
          }
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

  function makeActivePlot(plot) {
    setActivePlot(plot);
    setIsEditing(false);
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar
        data={plotData}
        setActive={makeActivePlot}
        logout={props.logout}
      />
      
      {/* <Box
        sx={{ flexGrow: 1, p: {xs: 1, sm: 3}, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={{backgroundColor: 'rgb(228, 231, 236)', borderRadius:'12px', p: {xs: 1, sm: 2}}}>

          {isEditing ? 
            <EditActivePlot toggleEditing={toggleEditing} data={activePlot} updatePlot={updatePlot} logout={props.logout}/> :
            <ActivePlot data={activePlot} isEditing={isEditing} toggleEditing ={toggleEditing} logout={props.logout}/>
          }  

          <Box flexGrow={1} sx={{ minHeight: '500px', backgroundColor: 'rgb(19, 33, 69)', color: 'white', borderRadius: '12px', padding: {xs: '0', md: '20px'}, mt: {xs: 1, sm: 2} }}>
            {isLoading ? 
              <Box sx={{width: '100%', height:'100%', display: 'flex', justifyContent:'center', alignItems: 'center', paddingTop:'40px'}}>
                <StyledSpinningLoader/>
              </Box>
              :
              <TabGroup
                activePlot={activePlot}
                data={plotData}
                setActive={makeActivePlot}
                setHighlighted={makeHighlightedPlot}
                highlightedPlot={highlightedPlot}
                plotStatistics={plotStatistics}
              />
            }
            
          </Box>
        </Box>
      </Box> */}
    </Box>
    </div>
  )
 }