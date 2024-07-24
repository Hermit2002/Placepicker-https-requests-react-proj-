import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchPlaces(){
      setIsFetching(true);

      try{
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();

      if(!response.ok){
        throw new  Error('Failed to fetch places');
      } //success response with 200, 300 status code. if response.ok false we get the 400, 500 status code.

      setAvailablePlaces(resData.places);

      }catch(error){
        setError({message: error.message || 'Could not fetch places, please try again later.'});
      }


      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if(error) {
    return <Error title="An error occured!" message={error.message} />
  }


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFetching}
      loadingText =  "Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
