/* eslint-disable @next/next/no-img-element */
interface PlayerProps {
    currentTrack: {
        track: {
            name: string;
            album: {
                images: { url: string }[];
            };
        };
    } | null;
}

export default function Player({ currentTrack }: PlayerProps) {
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
                <img className="h-8 cursor-pointer" src="images/play.svg" alt="Play button" />
                <img className="h-8 cursor-pointer" src="images/next.svg" alt="Next button" />
            </div>
        </div>
    );
}