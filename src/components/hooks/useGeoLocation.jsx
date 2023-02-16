
import React,{useState, useEffect} from 'react'


export const useGeoLocation = () => {
    const[location, setLocation] =  useState({
        loaded: false,
        coordinates: {lat:"", lng: ""}
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error:{
                code: error.code,
                message: error.message,
            },
        });
    };


    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
                code:0,
                message: "Location not supported in browser",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    return location;
}

export default useGeoLocation;