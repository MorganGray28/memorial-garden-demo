import React, { useState, useEffect } from 'react';
import SVGWrapper from '../components/SVGWrapper';
import axios from 'axios';

export default function Dashboard(props) {

  const [plotData, setPlotData] = useState([]);
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

  return (
    <div>
      <SVGWrapper />
    </div>
  )
 }