import React, { useEffect, useState } from 'react';
import './CreateRecipe.css'
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import { userCreateRecipe } from "../../firebase/database"

function CreateRecipe() {
    const navigate = useNavigate();

    const user = localStorage.getItem('username');

    const [valueName, setValueName] = useState("");
    const [tags, setTags] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [instrucion, setInstrucion] = useState("");

    // useEffect(() => {
    //     console.log(tags);
    // }, [tags]);


    async function submitFunction() {
        if (!valueName && !tags && !ingredient && !instrucion) {
            alert("Please fill all information!")
        } else {
            await userCreateRecipe({ ingredients: ingredient, steps: instrucion, name: valueName, tags: tags, createdTime: Date.now(), username: user, ratingCount: 1, rating: 5, ratedUser: [] }, user)
            setValueName("")
            setIngredient("")
            setInstrucion("")
            setTags([])
            alert("Recipe successfully added!")
            navigate("/RecipeLibraryWebapp");
        }
    }


    const Tags = ['BreakFast', 'MainMeal', 'LightMeal', 'Desert', 'CleanEating', 'HealthyFood', 'Vegan', 'JunkFood', 'Snack']
    return (
       
        <div className='CreateRecipe'>
            <div className='main-bodypart'>
                <div className='recipeName' style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Recipe Name:  </h3>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField onChange={(e) => { setValueName(e.target.value) }} style={{ width: '40vw' }} id="outlined-basic" label="Your input..." variant="outlined" />
                    </Box>
                </div>
                <div style={{ paddingTop: '20px'}}>
                    <Autocomplete
                        sx={{maxHeight: 80, overflow: 'auto', paddingTop: '10px'}}
                        multiple
                        id="tags-filled"
                        options={Tags.map((option) => option)}
                        // defaultValue={[Tags[0]]}
                        freeSolo
                        onChange={(event, value) => setTags(value)}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tags"
                                placeholder="Choose of type your own tags..."
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
                        onChange={(e) => { setIngredient(e.target.value) }}
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
                        style={{ whiteSpace: 'pre-line' }}
                        label="Instructions"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={(e) => { setInstrucion(e.target.value) }}
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <Stack spacing={2} direction="row">
                        <Button onClick={submitFunction} variant="outlined" >Upload</Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default CreateRecipe;