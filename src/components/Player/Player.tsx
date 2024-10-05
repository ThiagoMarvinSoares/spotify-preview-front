/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

interface PlayerProps {
    currentTrack: {
        track: {
            name: string;
            album: {
                images: { url: string }[];
            };
            preview_url: string;
        };
    } | null;
}

export default function Player({ currentTrack }: PlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const audio = audioRef.current

        if (audio && currentTrack && currentTrack.track.preview_url){
            audio.pause();
            audio.src = currentTrack.track.preview_url;
            audio.play();
            setIsPlaying(true);

            const handleEnded = () => {
                setIsPlaying(false);
            };

            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentTrack]);

    // Play|Pause Handler
    const handlePlayPause = () => {
        if (audioRef.current){
            if (isPlaying){
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };


    if (!currentTrack) {
        return <p>No music playing</p>
    }
    
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <img 
                src={currentTrack.track.album.images[0]?.url} 
                alt="Music cover image"
                className="w-42 p-1 rounded-xl"
            />
            <p className="text-3xl">{currentTrack.track.name}</p>
            <div className="flex items-center justify-center space-x-4">
                <img className="h-8 cursor-pointer" src="images/previous.svg" alt="Previous button" />                
                <button onClick={handlePlayPause}>
                    {isPlaying ? 
                        <img className="h-8 cursor-pointer" src="images/pause.png" alt="Play button" /> 
                        : 
                        <img className="h-8 cursor-pointer" src="images/play.svg" alt="Play button" />
                    }                    
                </button>

                <audio ref={audioRef}/>   

                <img className="h-8 cursor-pointer" src="images/next.svg" alt="Next button" />
            </div>
        </div>
    );
}