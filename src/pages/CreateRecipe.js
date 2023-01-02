import React from 'react';
import './CreateRecipe.css'
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function CreateRecipe() {
    const username = sessionStorage.getItem('username');
    const Tags = ['Tatsy', 'Chicken', 'Pizza', 'Noodle', 'CleanEating', 'HealthyFood', 'JustEatRealFood', 'VeganFood', 'HealthyFoodRecipes', 'HealthyFoodLover', 'Popcorn']
    return (
        <div className='CreateRecipe'>
            <div className='main-bodypart'>
                <div className='recipeName' style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Recipe Name: </h3>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField style={{ width: '40vw' }} id="outlined-basic" label="Your input..." variant="outlined" />
                    </Box>
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={Tags.map((option) => option)}
                        defaultValue={[Tags[0]]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                // variant="filled"
                                label="Tags"
                                placeholder="Add tags..."
                            />
                        )}
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <TextField
                        InputProps={{
                            inputProps: {
                                style: { justifyContent: "right" },
                            }
                        }}
                        id="outlined-multiline-static"
                        label="Ingredients"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <TextField
                        InputProps={{

                        }}
                        id="outlined-multiline-static"
                        label="Instruction"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" >Upload</Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default CreateRecipe;