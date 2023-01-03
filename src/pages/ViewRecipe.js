import React from 'react';
import './ViewRecipe.css';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from 'react';
import { rateRecipe, getRecipeByName } from "../firebase/database"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";


function ViewRecipe() {

    const navigate = useNavigate();
    const [recommdedRecipeState, setrecommdedRecipeState] = useState(null);

    const { recipeName, userName } = useParams();

    const getRecipe = async (recipeName, userName) => {
        const result = await getRecipeByName(recipeName, userName);
        return result;
    }

    useEffect(() => {

        getRecipe(recipeName, userName).then(result => {

            setrecommdedRecipeState(result);

        });
    }, [])

    const user = sessionStorage.getItem('username');

    const [rate, setRate] = useState()

    const ratingChanged = (newRating) => {
        setRate(newRating)
    };

    const handleSubmit = async () => {
        if (!rate) {
            alert("Please rate before click this button!")
        } else {
            console.log(rate)
            await rateRecipe(recommdedRecipeState.username, recommdedRecipeState.name, Number(rate))
            alert("Rate successfully!")
            navigate("/");
        }
    }

    const handleSave = () => {

    }

    const Tags = ['Tatsy', 'Chicken', 'Pizza', 'Noodle', 'CleanEating', 'HealthyFood', 'JustEatRealFood', 'VeganFood', 'HealthyFoodRecipes', 'HealthyFoodLover', 'Popcorn']
    return (
        recommdedRecipeState && <div className='ViewRecipe'>
            <div className='main-bodypart'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Recipe Name: </h3>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        {/* <TextField disabled
                            id="standard-disabled" label={recommdedRecipeState.name} variant="outlined" /> */}
                        <h1>{recommdedRecipeState.name}</h1>
                    </Box>
                </div>
                <h2>{recommdedRecipeState.username}</h2>
                <div style={{ paddingTop: '20px' }}>
                    <Autocomplete
                        multiple
                        id="tags-readOnly"
                        options={Tags.map((option) => option)}
                        defaultValue={recommdedRecipeState.tags}
                        readOnly
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" placeholder="." />
                        )}
                    />
                    {/* {recommdedRecipeState.tags?.map((item) => (item))} */}
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <TextField
                        InputProps={{
                            inputProps: {
                                style: { justifyContent: "right" },
                            }
                        }}
                        // id="outlined-multiline-static"
                        // label="recommdedRecipeState.ingredientss"
                        disabled
                        // id="component-disabled"
                        id="outlined-disabled"
                        multiline
                        defaultValue={recommdedRecipeState.ingredients}
                        rows={4}
                        fullWidth
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <TextField
                        InputProps={{

                        }}
                        // id="outlined-multiline-static"
                        // label="Intruction"
                        disabled
                        id="outlined-disabled"
                        multiline
                        rows={4}
                        defaultValue={recommdedRecipeState.steps}
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
                            value={recommdedRecipeState.rating}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSubmit} variant="outlined" >Submit rate</Button>
                        </Stack>
                    </div>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSave} variant="outlined" >Save</Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;