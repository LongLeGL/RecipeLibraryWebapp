import React from 'react';
import './ViewRecipe.css';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReactStars from "react-rating-stars-component";
// import { display } from '@mui/system';

function ViewRecipe() {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    const Tags = ['Tatsy', 'Chicken', 'Pizza', 'Noodle', 'CleanEating', 'HealthyFood', 'JustEatRealFood', 'VeganFood', 'HealthyFoodRecipes', 'HealthyFoodLover', 'Popcorn']
    return (
        <div className='ViewRecipe'>
            <div className='main-bodypart'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Recipe Name: </h3>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField id="outlined-basic" label="Your input..." variant="outlined" />
                    </Box>
                </div>
                <h2>By Anthony Trudy</h2>
                <div style={{ paddingTop: '20px' }}>
                    <Autocomplete
                        multiple
                        id="tags-readOnly"
                        options={Tags.map((option) => option)}
                        defaultValue={[Tags[0], Tags[1], Tags[2]]}
                        readOnly
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" placeholder="." />
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
                        label="Intruction"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        <h3>Rate: </h3>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" >Save</Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;