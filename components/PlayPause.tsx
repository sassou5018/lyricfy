import {Icon, IconButton} from "@chakra-ui/react";
import {RiPlayCircleLine, RiPauseCircleLine} from "react-icons/ri";
export default function PlayPause({is_playing}:any){
    if(is_playing){
        return(
            <IconButton aria-label='player state' icon={<Icon as={RiPlayCircleLine} size="lg"/>} borderRadius="full" colorScheme="green"/>
        )
    } else {
        return(
            <IconButton aria-label='player state' icon={<Icon as={RiPauseCircleLine} size="lg"/>} borderRadius="full" colorScheme="green" disabled/>
        )
    }
}