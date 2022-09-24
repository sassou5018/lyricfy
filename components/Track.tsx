import { VStack, Image, Heading, Text, Progress } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import PlayPause from './PlayPause';
export default function Track({ currentTrack }: any) {
    if (typeof currentTrack!== 'undefined' && !currentTrack.error) {
        return (
            <>
                <VStack border="2px" borderColor="green" borderRadius="20px" padding="20px" margin="10px" bgColor="gray.800" color="white">
                    <Image alt="album artwork" src={currentTrack.item? currentTrack.item.album.images[1].url : 'none'} />
                    <Heading>{currentTrack.item?currentTrack.item.name:'none'}</Heading>
                    <Text>By: {currentTrack.item?currentTrack.item.artists[0].name:'none'}</Text>
                    {currentTrack.item ? <Text>Album: {currentTrack.item?currentTrack.item.album.name:'none'}</Text> : null}
                    <Text>Duration: {new Date(currentTrack.item?currentTrack.item.duration_ms:0).toISOString().slice(11, 19)}</Text>
                    <Progress value={currentTrack.item?currentTrack.progress_ms/currentTrack.item.duration_ms*100:0} size='md' colorScheme="green" width="full" />
                    <PlayPause is_playing={currentTrack.is_playing? currentTrack.is_playing: false} />
                </VStack>
            </>
        )
    }
    return (
        <Text>No Track</Text>
    )
}
