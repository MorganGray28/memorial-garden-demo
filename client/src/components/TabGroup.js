import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import SVGWrapper from '../SVGWrapper';
import Table from './Table';

export default function TabGroup(props) {
    const [tabValue, setTabValue] = useState(0);

    function handleChange(event, newValue) {
        setTabValue(newValue);
    }
        
    return (
        <div>
            <Tabs
                value={tabValue}
                onChange={handleChange}
                centered
                sx={{'& .MuiTabs-indicator': {backgroundColor: '#6b9fff'}}}
            >
                <Tab
                    label="Garden Map"
                    index={0}
                    sx={{
                        '&.MuiTab-root': { color: 'rgba(101, 120, 157, .9)' },
                        '&.Mui-selected': {color: '#6b9fff'}
                    }}
                />
                <Tab
                    label="List"
                    index={1}
                    sx={{
                        '&.MuiTab-root': { color: 'rgba(101, 120, 157, .9)' },
                        '&.Mui-selected': {color: '#6b9fff'}
                    }}
                />
            </Tabs>

            {tabValue === 0 && (<SVGWrapper
                activePlot={props.activePlot}
                data={props.data}
                setActive={props.setActive}
                setHighlighted={props.setHighlighted}
                highlightedPlot={props.highlightedPlot}
                // plotStatistics={props.plotStatistics}
            />)
            }
            {tabValue === 1 && <Table
                activePlot={props.activePlot}
                data={props.data}
                setActive={props.setActive}
                setHighlighted={props.setHighlighted}
            />}
        </div>
    )
}