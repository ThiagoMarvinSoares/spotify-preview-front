import Home from "@/src/views/Home"

interface interfaceTrack {
    track: { 
        name: string;
        album: {
            images: { url: string }[];
        }
    };
}

interface PlaylistProps {
    tracks: Array<interfaceTrack>;
}

export default function Playlist({ tracks }: PlaylistProps){
    return (
        <div className="max-h-full overflow-y-auto p-2">
            <ul className="space-y-2">
                {tracks.map((track, index) => (
                    <li key={index} className="flex items-center space-x-4 hover:bg-slate-600">
                        <img 
                            src={track.track.album.images[0]?.url} 
                            alt=""
                            className="w-12 h-12 rounded-sm p-0.5" 
                        />
                        <p>{track.track.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
