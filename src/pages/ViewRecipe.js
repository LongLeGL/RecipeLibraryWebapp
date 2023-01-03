import React from 'react';
import './ViewRecipe.css';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReactStars from "react-rating-stars-component";
import { useState } from 'react';
import { rateRecipe, getRecipeByName } from "../components/firebase/database"
import { useParams } from "react-router-dom"
// import { display } from '@mui/system';

function ViewRecipe() {

    const { recipeName, userName } = useParams();

    const { rating, name, } = getRecipeByName(recipeName, userName)

    const user = "Guest"
    const nameOfRecipe = "Ice Cream"
    const nameOfAuthor = "Thien Luu"
    const rateNum = 4
    const tags = ['Ice Cream']
    const ingredient = "Ice Cream"
    const instrucion = "Ice Cream"

    const [rate, setRate] = useState(0)

    const ratingChanged = (newRating) => {
        setRate(newRating)
        console.log(rate);
        console.log("\n", typeof (rate));
    };

    const handleSubmit = () => {
        if (!rate) {
            alert("Please rate before click this button!")
        } else {
            rateRecipe(user, nameOfRecipe, Number(rate))
            alert("Rate successfully!")
        }
    }

    const Tags = ['Tatsy', 'Chicken', 'Pizza', 'Noodle', 'CleanEating', 'HealthyFood', 'JustEatRealFood', 'VeganFood', 'HealthyFoodRecipes', 'HealthyFoodLover', 'Popcorn']
    return (
        <div className='ViewRecipe'>
            <div className='main-bodypart'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Recipe Name: </h3>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        {/* <TextField disabled
                            id="standard-disabled" label={nameOfRecipe} variant="outlined" /> */}
                        <h1>{nameOfRecipe}</h1>
                    </Box>
                </div>
                <h2>{nameOfAuthor}</h2>
                <div style={{ paddingTop: '20px' }}>
                    <Autocomplete
                        multiple
                        id="tags-readOnly"
                        options={Tags.map((option) => option)}
                        defaultValue={tags.map((item) => (item))}
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
                        // id="outlined-multiline-static"
                        label="Ingredients"
                        disabled
                        // id="component-disabled"
                        id="outlined-disabled"
                        multiline
                        defaultValue={ingredient}
                        rows={4}
                        fullWidth
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <TextField
                        InputProps={{

                        }}
                        // id="outlined-multiline-static"
                        label="Intruction"
                        disabled
                        id="outlined-disabled"
                        multiline
                        rows={4}
                        defaultValue={instrucion}
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
                            value={rateNum}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSubmit} variant="outlined" >Save</Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;