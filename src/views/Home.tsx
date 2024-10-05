'use client';

import { useEffect, useState } from 'react';
import Player from '../components/Player/Player'
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Playlist from '../components/Playlist/Playlist';
import axios from 'axios';

interface interfaceTrack {
    track: { 
        name: string;
        preview_url: string;
        album: {
            images: { url: string }[];
        }        
    };
}

//Setting types for playlist items
interface albumResponse{
    name: string;
    images: {url:string}[];
    total: number;
}

interface tracksResponse{
    name: string;
    items: Array <interfaceTrack>;
}

export default function Home(){
    //Setting data state
    const [data, setData] = useState <string> ('');
    const [playlist, setPlaylist] = useState <albumResponse | null> (null);
    const [tracksList, setTracksList] = useState <tracksResponse | null> (null);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

    const handlePlayTrack = (track: interfaceTrack, index: number) => {
        setCurrentTrackIndex(index);
    };

    //Album object
    let albumInfo = {
        name: playlist?.name,
        image: playlist?.images[0].url
    }

        //Use effect to get the data async
        useEffect(() => {
            axios.get('http://127.0.0.1:5000')
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

            axios.all([
                axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO2k3tf2',{headers: headers}),
                axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO2k3tf2/tracks',{headers: headers})
            ])
            .then(axios.spread(function(albumResponse, tracksResponse){
                setPlaylist(albumResponse.data)
                setTracksList(tracksResponse.data)

                console.log('Tracks Reponse:', tracksResponse.data.items);
            }))
            .catch((error) => {
                console.log(error)
            })
        }   
        
    return (
        <div className='flex items-center bg-slate-800 text-white justify-center h-screen'>
            <div className='flex justify-center w-[80vw] h-[80vh]'>
                {playlist === null ? (null) : (
                    <div className='flex items-center flex-col w-[20vw] space-y-5'>
                        <p className='text-xl'>{albumInfo.name}</p>
                        <img src={albumInfo.image} alt="Image from album" className='w-48 rounded-full'/> 
                    </div>
                )}
                <div className='border border-gray-400 p-2 m-2 w-[50vw]'>
                    {tracksList && <Playlist tracks={tracksList.items} onPlay={handlePlayTrack} />}
                </div>
                <div className='w-[30vw]'>
                    <div className='border border-gray-400 p-2 m-2'>
                        <Player 
                            currentTrackIndex={currentTrackIndex}
                            tracks={tracksList?.items}
                            onTrackChange={setCurrentTrackIndex} 
                        />                   
                    </div>
                    {/* <div className='border border-gray-400 p-2 m-2'><ProgressBar/></div>     */}
                </div>
            </div>
        </div>
    );
}