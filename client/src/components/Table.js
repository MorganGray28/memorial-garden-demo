import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button} from '@mui/material';
import React, { useState} from 'react';
import TableList from './TableList';
import ReactToPrint from "react-to-print";


export default function Table(props) {
    const [plotFilter, setPlotFilter] = useState({
        available: false,
        reserved: true,
        interred: true
    })
    const componentRef = React.useRef();

    function sortAlphabetical(a, b) {
        if (a.headstone.toLowerCase() < b.headstone.toLowerCase()) return -1;
        if (a.headstone.toLowerCase() > b.headstone.toLowerCase()) return 1;
        return 0;
    }

    let availablePlotArr = props.data.filter(p => {
        return p.plotFilledStatus === 'available';
    });

    let reservedPlotArr = props.data.filter(p => {
        return p.plotFilledStatus === 'reserved';
    })

    let interredPlotArr = props.data.filter(p => {
        return p.plotFilledStatus === 'interred';
    })

    let plotResults = []; 
    if (plotFilter.reserved) {
        plotResults = plotResults.concat(reservedPlotArr);
    }
    if (plotFilter.interred) {
        plotResults = plotResults.concat(interredPlotArr);
    }
    plotResults = plotResults.sort(sortAlphabetical);

    if (plotFilter.available) {
        plotResults = plotResults.concat(availablePlotArr);
    }

    function handleChange(e) {
        setPlotFilter({
            ...plotFilter,
            [e.target.name]: e.target.checked
        })
    }

    return (
        <Box sx={{ maxHeight: { xs: '550px', sm: '680px', md: '750px' }, overflow: 'auto', position: 'relative' }}>   
            <Typography pt={2} mb={1} fontWeight={500}>Filter List By:</Typography>            
            <Box sx={{display: 'flex', justifyContent: {xs: 'space-between', md: 'flex-start'}}}>
                <FormGroup row>
                    <FormControlLabel sx={{ marginLeft: '0' }} labelPlacement='top' control={
                        <Checkbox
                            color='info'
                            onChange={handleChange}
                            sx={{
                                '&.MuiCheckbox-root': {
                                    color: '#0288d1'
                                }
                            }}
                        />}
                        label="Avaliable"
                        name="available"
                    />
                    <FormControlLabel labelPlacement='top' control={
                        <Checkbox
                            color='secondary'
                            defaultChecked
                            onChange={handleChange}
                            sx={{
                                '&.MuiCheckbox-root': {
                                    color: '#9c27b0'
                                }
                            }}
                        />}
                        label="Reserved"
                        name="reserved"
                    />
                    <FormControlLabel labelPlacement='top' control={
                        <Checkbox
                            color='success'
                            defaultChecked
                            onChange={handleChange}
                            sx={{
                                '&.MuiCheckbox-root': {
                                    color: '#2e7d32'
                                }
                            }}
                        />}
                        label="Interred"
                        name="interred"
                    />
                </FormGroup>
                <Box sx={{alignSelf: 'center', marginRight: {xs: '10px', sm: '35px'}, marginLeft: {md: '50px'}}}>
                    <ReactToPrint
                        trigger={() => <Button variant='contained' color='primary'>Print</Button>}
                        content={() => componentRef.current}
                    />
                </Box>
            </Box>
            <Box sx={{ position: 'sticky', width: '100%', top: 0, backgroundColor:'#345abc', display:'flex', justifyContent:'space-between', padding:'10px', fontWeight:'500' }}>
                <Typography variant="body1" sx={{width:'15%'}}>Location</Typography>
                <Typography variant="body1" sx={{width:'15%'}}>Headstone</Typography>
                <Typography variant="body1" sx={{width:'15%'}}>Reserved For</Typography>
                <Typography variant="body1" sx={{width:'15%'}}>Plot Status</Typography>
            </Box>
            <TableList
                ref={componentRef}
                plotData={plotResults}
                setActive={props.setActive}
                activePlot={props.activePlot}
            />
        </Box>
    )
}