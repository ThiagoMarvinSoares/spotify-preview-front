'use client';

import { useEffect, useState } from 'react';
import Player from '../components/Player/Player'
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Playlist from '../components/Playlist/Playlist';
import axios from 'axios';

export default function Home(){
    //Setting data state
    const [data, setData] = useState(null)

        Use effect to get the data async
        useEffect(() => {
            axios.get('http://127.0.0.1:5000/accessToken')
            .then(response => {
                console.log('data')
                setData(response.data)
            })
            .catch(error => {
                console.log('error:', data)
            })
        })
    return (
        <div>
            <Playlist></Playlist>
            <Player></Player>
            <ProgressBar></ProgressBar>
            <p>{data}</p>
        </div>
    );
}