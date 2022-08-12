import React, { useState } from 'react';
import SearchList from './SearchList';

import '../styles/Search.css';
import { TextField, InputAdornment, IconButton, FormControl, Select, MenuItem, Typography, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Search(props) {
    const [inputState, setInputState] = useState({ search: '', category: 'headstone' });

    function handleChange(e) {
        setInputState({ ...inputState, [e.target.name]: e.target.value });
    }

    function handleClear(e) {
        setInputState({ ...inputState, search: '' });
    }

    function setActivePlot(id) {
        // find plot from data based on airtableId
        let foundPlot = props.data.filter(plot => {
            return plot.airtableId === id
        });
        props.setActive(foundPlot[0]);
    }

    let filteredSearch = props.data.filter(
        (plot) => {
            if(plot[inputState.category]) {
                return plot[inputState.category].toLowerCase().includes(inputState.search.toLowerCase());
            }
            return null;
        }
    )

    return (
        <div>
            <form>
                <TextField
                    // TODO: background of input fields: background-color: rgb(0 0 230 / 6%)
                    // TODO: color of Search Plots label: color: rgb(27 37 163);
                    label="Search Plots"
                    name="search"
                    sx={{ m: 1 }}
                    InputProps={{
                        // TODO: Icons: fill: rgb(33 78 187)
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton onClick={handleClear}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </InputAdornment>
                    }}
                    variant="filled"
                    autoComplete="off"
                    value={inputState.search}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    {/* <InputLabel id="category">Category</InputLabel> */}
                    <Select
                        sx={{ m: 1 }}
                        labelId="category"
                        name="category"
                        id="demo-simple-select"
                        value={inputState.category}
                        label="Age"
                        onChange={handleChange}
                        variant="standard"
                        >
                            <MenuItem value='headstone'>Headstone</MenuItem>
                            <MenuItem value='reserved'>Reserved For</MenuItem>
                            <MenuItem value='location'>Location</MenuItem>
                            <MenuItem value='plot'>Plot</MenuItem>
                    </Select>
                </FormControl>
            </form>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgb(200, 200, 200)', padding: '10px', marginTop: '20px' }}>
                {/* TODO: background: background-color: rgb(0 0 230 / 6%) */}
                <Typography>Headstone</Typography>
                <Typography>Location</Typography>
            </Box>
            <Box>
                <Box sx={{overflowY:'auto'}}>
                    {filteredSearch.map(plot => {
                        return <SearchList category={inputState.category} headstone={plot.headstone} plot={plot.plot} location={plot.location} reserved={plot.reserved} id={plot.airtableId} key={plot.airtableId} setActive={setActivePlot} />
                    })}
                </Box>
            </Box>
        </div>
    )
}