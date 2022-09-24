import { VStack, Image, Heading, Text, IconButton, Icon } from '@chakra-ui/react';
import PlayPause from './PlayPause';
export default function Track({ currentTrack }: any){
    if(currentTrack){
        return (
            <>
            <VStack border="4px" borderColor="green" borderRadius="20px" padding="10px" margin="10px">
                <Image alt="album artwork" src={currentTrack.item.album.images[1].url}/>
                <Heading>{currentTrack.item.name}</Heading>
                <Text>By: {currentTrack.item.artists[0].name}</Text>
                {currentTrack.item.album.type==="album"?<Text>Album: {currentTrack.item.album.name}</Text>:null}
                {currentTrack.item.album.type==="single"?<Text>Single: {currentTrack.item.album.name}</Text>:null}
                {currentTrack.item.album.type==="compilation"?<Text>Compilation: {currentTrack.item.album.name}</Text>:null}
                <Text>Duration: {new Date(currentTrack.item.duration_ms).toISOString().slice(11, 19)}</Text>
                {currentTrack.item.explicit?<Text size="xs">Explicit</Text>:null}
                <PlayPause is_playing={currentTrack.is_playing}/>
                
    
            </VStack>
            </>
        )
    }
    return (
       <Text>No Track</Text>
    )
}