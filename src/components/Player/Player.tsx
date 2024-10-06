/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

interface interfaceTrack {
    track: { 
        name: string;
        preview_url: string;
        album: {
            images: { url: string }[];
        }
    };
}

interface PlayerProps {
    currentTrackIndex: number;
    tracks: Array<interfaceTrack> | undefined;
    onTrackChange: (newIndex: number) => void;
}

export default function Player({ currentTrackIndex, tracks, onTrackChange }: PlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const currentTrack = tracks ? tracks[currentTrackIndex] : null;

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            const handleTimeUpdate = () => {
                if (audio.duration){
                    const percent = (audio.currentTime / audio.duration) * 100;
                    setProgress(percent);
                }
            };
            
            const handleEnded = () => {
                audio.currentTime = 0;
                audio.play().catch(err => {
                    console.error("error replaying audio", err);
                });
            }
            
            audio.addEventListener('timeupdate', handleTimeUpdate)
            audio.addEventListener('ended', handleEnded);

            if (currentTrack && currentTrack.track.preview_url) {
                audio.src = currentTrack?.track.preview_url;
                audio.load();

                setTimeout(() => {
                    audio.play().catch(err => {
                        console.error("Error playing audio:", err);
                    });
                    setIsPlaying(true); // Atualiza o estado para refletir que a música está tocando
                }, 0)

            } else {
                audio.pause();
                setIsPlaying(false);
            }

            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentTrack]);

    // Play|Pause Handler
    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(err => {
                    console.error("Error playing audio:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleNextTrack = () => {
        if (tracks && currentTrackIndex < tracks.length - 1){
            onTrackChange(currentTrackIndex + 1);
        }
    };

    const handlePreviousTrack = () => {
        if (currentTrackIndex > 0) {
            onTrackChange(currentTrackIndex - 1);
        }
    }
    
    if (currentTrack == null || currentTrack == undefined) {
        return ( 
            <div>
                <p>No music playing</p> 
            </div>            
        );
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
                <img className="h-8 cursor-pointer" src="images/previous.svg" alt="Previous button" onClick={handlePreviousTrack}/>                
                <button onClick={handlePlayPause}>
                    {isPlaying ? 
                        <img className="h-8 cursor-pointer" src="images/pause.png" alt="Play button" /> 
                        : 
                        <img className="h-8 cursor-pointer" src="images/play.svg" alt="Play button" />
                    }                    
                </button>

                <audio ref={audioRef}/>   

                <img className="h-8 cursor-pointer" src="images/next.svg" alt="Next button" onClick={handleNextTrack}/>                
            </div>
            <div className="w-full">
                <div className="relative w-full h-4 bg-gray-200 rounded-lg">
                    <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-l-lg" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
}