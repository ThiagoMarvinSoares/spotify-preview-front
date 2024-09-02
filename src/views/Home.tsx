import Player from '../components/Player/Player'
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Playlist from '../components/Playlist/Playlist';

export default function Home(){
    return (
        <div>
            <Playlist></Playlist>
            <Player></Player>
            <ProgressBar></ProgressBar>
        </div>
    );
}