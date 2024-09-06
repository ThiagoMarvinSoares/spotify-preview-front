/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Player from '../components/Player/Player'
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Playlist from '../components/Playlist/Playlist';
import axios from 'axios';

interface interfaceTrack{
    track: { name: string };
}

interface response{
    name: string;
    description: string;
    tracks: string;
    images: {url:string}[];
    items: Array <interfaceTrack>;
    preview_url: string;
}

export default function Home(){
    //Setting data state
    const [data, setData] = useState <string> ('');
    const [playlist, setPlaylist] = useState < response | null > (null);
    // const albumImage = playlist?.images[0].url;
    // const preview = playlist?.

        //Use effect to get the data async
        useEffect(() => {
            axios.get('http://127.0.0.1:5000/accessToken')
            .then((response) => {
                setData(response.data)
                getPlaylist(response.data)
            })
            .catch(() => {
                console.log('erro:', data)
            })
        },[])

        //get playlist info
        const getPlaylist = (data:string) => {
            if (!data) {return}

            const headers = {
                "Authorization": `Bearer ${data}`
            }

            axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO2k3tf2/tracks',{headers: headers})
            .then((response) => {
                setPlaylist(response.data)
            })
            .catch((error) => {
                console.log('error', data)
            })
        }
        console.log(playlist?.items[0].track.name)
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex justify-center bg-blue-500'>
                {/* playlist === null ? (null) : (
                    <div>
                        <p>{playlist.name}</p>
                        <img src={albumImage} alt="Image from album" className='w-48'/> 
                    </div>
                )*/}
                <div className='border border-gray-400 p-2 m-2'>
                    <Playlist/>
                </div>
                <div>
                    <div className='border border-gray-400 p-2 m-2'><Player/></div>
                    <div className='border border-gray-400 p-2 m-2'><ProgressBar/></div>    
                </div> 
            </div>
        </div>
    );
}