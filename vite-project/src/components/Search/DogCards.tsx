import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Spinner
  } from "@material-tailwind/react";
import { Card, Grid, CardActionArea, CardContent, Typography, CardMedia } from '@mui/material';

interface SearchableTableProps {
    loggedIn: boolean;
}

const DogCards: React.FC<SearchableTableProps> = ({loggedIn}) => {
  const [dogs, setDogs] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('what does localstorage have? ', location.state.dogs)
    !loggedIn ? navigate('/login') : null
    setDogs(location.state.dogs);
  },[]);

  return (
    <div>
      {loggedIn ? (
        <>
          <h2 style={{textAlign: 'center'}}>Dogs</h2>
          <div className='p-5' style={{flex:1, overflowY:'scroll', height: '70vh',display: 'flex' , margin: '50px'}}>
                {
                    dogs ? 
                <Grid container spacing={2}>
                    {
                        dogs.map((dog) => {
                            return (
                                <Grid item xs={12} sm={4}>
                                   <Card style={{height:'300px'}} className='shadow-lg'>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={dog.img}
                                                alt="Paella dish"
                                            />
                                            <CardContent style={{height:'13vh'}}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={4}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {dog.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {dog.age}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {dog?.zip_code}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography gutterBottom variant="h5" component="div">  
                                                        {dog.zip_code}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {dog.breed}
                                                    </Typography>
                                                </Grid>
        
                                            </Grid>
                                            
                                            </CardContent>

                                            


                                            <div className='flex justify-between align-middle'>

                                        
                                            <div>
                                            {/* <a href="#" className="inline-block m-2">
                                            <Button style={{ fontFamily: "Poppins, sans-serif" }} variant="text" className="flex items-center gap-2 hover:text-blue-500">
                                                See Details
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                                >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                />
                                                </svg>
                                            </Button>
                                            </a> */}
                                            </div>

                                            
                                            <div>

                                            {/* <Button onClick={() => {
                                                deleteTrial(data);
                                            }} style={{ fontFamily: "Poppins, sans-serif" }} size="sm" variant="text" className="flex items-center gap-2 hover:text-blue-500 mt-2">
                                                <DeleteIcon/>
                                                </Button> */}
                                            </div>
                                            

                                            </div>
                                        </CardActionArea>
                                        
                                        </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid> :
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1}}>
                    <Spinner className="h-12 w-12"  color="blue"/>
                </div>

                }
            </div>
        </>
      ) : (
        <p>You need to be logged in to access this page.</p>
      )}
    </div>
  );
};

export default DogCards;