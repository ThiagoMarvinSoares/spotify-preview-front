/* eslint-disable @next/next/no-img-element */
import Home from "@/src/views/Home"

interface interfaceTrack {
    track: { 
        name: string;
        preview_url: string;
        album: {
            images: { url: string }[];
        }
    };
}

interface PlaylistProps {
    tracks: Array<interfaceTrack>;
    onPlay: (track: interfaceTrack) => void;
}

export default function Playlist({ tracks, onPlay }: PlaylistProps){
    return (
        <div className="max-h-full overflow-y-auto p-2">
            <ul className="space-y-2">
                {tracks.map((track, index) => (
                    <li key={index} className="relative flex items-center space-x-4 hover:bg-slate-600">
                        <img 
                            src={track.track.album.images[0]?.url} 
                            alt="Music cover image"
                            className="w-12 h-12 rounded-sm p-0.5" 
                        />
                        <p className="flex-1">{track.track.name}</p>
                        <button className="absolute right-2" onClick={() => onPlay(track)}>
                            <img 
                                src="/images/play-button-white.png"
                                alt="Play button"
                                className="w-8 h-8 cursor-pointer"
                            />     
                        </button>                  
                    </li>
                ))}
            </ul>
        </div>
    );
}
