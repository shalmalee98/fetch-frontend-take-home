import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

interface SearchableTableProps {
    loggedIn: boolean;
}

const SearchableTable: React.FC<SearchableTableProps> = ({ loggedIn }) => {
  const [dogs, setDogs] = useState<any>([]);
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [breed, setBreed] = useState<any>([]);
  const [zipCode, setZipCode] = useState<any>(Number);
  const [ageMin, setAgeMin] = useState<any>('');
  const [ageMax, setAgeMax] = useState<any>('');
  const [dogDetails, setDogDetails] = useState<any>({});
//   const [searchParams, setSearchParams] = useState({
//     breeds: [String],
//     zipCodes: [],
//     ageMin: null,
//     ageMax: null,
//   });
  useEffect(() => {
    console.log('what does localstorage have? ', localStorage.getItem('isLoggedIn'))
    !loggedIn ? navigate('/login') : null
    const getBreeds = async() => {
        try {
            // Simulate a search API call
            const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
            //   params: searchParams,
              withCredentials: true,
            });
      
            setBreeds(response.data);
          } catch (error) {
            console.error('Error searching for dog breeds:', error);
          }
    };
    getBreeds();
  },[]);

  const getDogDetails = async(dogIds) => {
    try {
        // Simulate a search API call
        const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, {
          withCredentials: true,
        });
        setDogDetails(response.data); 
        if(response.data.length > 0) {
            navigate('/dogs', {state:{dogs: response.data}}); 
        }
      } catch (error) {
        console.error('Error searching for dog details:', error);
      }
  }

  const handleSearch = async () => {
    try {
        // Simulate a search API call
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
            params: {
                breeds: breed.length>0 ? breed : [],
                zipCodes: zipCode ? zipCode : null,
                ageMin: ageMin ? ageMin : null,
                ageMax: ageMax ? ageMax : null,
            },
            withCredentials: true,
        });
        setDogs({dogs: response.data.resultIds});
        getDogDetails(response.data.resultIds);
    } catch (error) {
      console.error('Error searching for dogs:', error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <h2 style={{color: 'white'}}>Dogs</h2>
          <Card placeholder={''} color="transparent" shadow={false}>
            <Typography placeholder={'Sign up'} variant="h4" color="blue-gray">
                Filter Dogs Using the following filters
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                
                <Typography placeholder={'Enter Dog Breed'} variant="h3" color="blue-gray" className="-mb-3">
                    Enter dog breed
                </Typography>
                <Input
                crossOrigin={''}
                    size="lg"
                    style={{height: '30px'}}
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="Lhasa"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                />
                <Typography placeholder={'Enter zipcode'} variant="h3" color="blue-gray" className="-mb-3">
                    Enter zipcode
                </Typography>
                <Input
                crossOrigin={''}
                    size="lg"
                    style={{height: '30px'}}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="14215"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                />
                <Typography placeholder={'Enter minimum age required'} variant="h3" color="blue-gray" className="-mb-3">
                    Enter minimum age required
                </Typography>
                <Input
                    crossOrigin={''}
                    size="lg"
                    value={ageMin}
                    style={{height: '30px'}}
                    onChange={(e) => setAgeMin(e.target.value)}
                    placeholder="2"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                />
                <Typography placeholder='Enter Maximum Age' variant="h3" color="blue-gray" className="-mb-3">
                    Enter maximum age
                </Typography>
                <Input
                    crossOrigin={'http'}
                    size="lg"
                    style={{height: '30px'}}
                    placeholder="12"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                />
                
                
                </div>
                
                <Button placeholder={'Search'} style={{margin: '10px'}} className="mt-6" fullWidth onClick={handleSearch}>
                Search
                </Button>
            </form>
            </Card>
        </>
      ) : (
        <p>You need to be logged in to access this page.</p>
      )}
    </div>
  );
};

export default SearchableTable;