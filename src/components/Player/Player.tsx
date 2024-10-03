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
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            {currentTrack ? (
                <>
                    <img 
                        src={currentTrack.track.album.images[0]?.url} 
                        alt="Music cover image"
                        className="w-42 p-1 rounded-xl"
                    />
                    <p className="text-3xl">{currentTrack.track.name}</p>
                </>    
            ) : (
                <p className="text-3xl">No music playing</p>              
            )} 
        </div>
    );
}