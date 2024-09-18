export default function Playlist(){
    return (
        <div className='bg-white border border-gray-400 min-w-full'>
            <div className='flex items-center justify-between'>
                <div className='flex space-x-2'>
                    <img className='h-24 p-1 rounded-lg' src='/images/music-cover.jpg' alt='Music cover image' />
                    <div className="flex flex-col justify-center">
                        <p className='text-lg text-black font-semibold'>HIGHEST</p>
                        <p className='text-slate-500 font-medium'>OxT</p>
                    </div>                                   
                </div>
                <div className='flex-shrink-0 mr-5'>
                    <img className='h-10 cursor-pointer' src='/images/play-button.png' alt='Play button' />
                </div>                
            </div>
        </div>
    );
}0