import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import Repo from './Repo';
import Skeleton from './skeleton';
const location = <FontAwesomeIcon icon={faMapMarkerAlt} />



function Profile() {
    const [pf, setPf] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.github.com/users/johnpapa`)
            setPf(await response.json());
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [])



    return (
        <div className="main">
        {isLoading ? (
            <Skeleton type="top" />
        ) : (
                <div className="container">
                    <div className="profile-section">
                        <div className="profile">
                      
                            <div className="row">   
                         
                                <div className="col-md-4">
                                    <img className="avatar" src={pf.avatar_url} alt="Avatar"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="profile-details">
                                        <h1 className="profile-text">{pf.name}</h1>
                                        <p>{pf.bio}</p>
                                        <div className="location-details">
                                            <h1>{location}</h1>
                                            <h1>{pf.location}</h1>
                                        </div>
                                        <h1 className="twitter-link">Twitter: https://www.twitter.com/{pf.twitter_username}</h1>
                                    </div>
                                </div>
                                
                            </div>
                            {isLoading ? (
                                <Skeleton type="feed" />
                            ) : (

                            <Repo />
                            )}
                        </div>
                    </div>
                </div>
                )}
        </div>
    )
}

export default Profile
