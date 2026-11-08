import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { setSound } from '../../features/interactions/audio'
export default function AudioController(){
  const [on,setOn]=useState(false)
  return(<button className="snd" aria-pressed={on} aria-label="Toggle sound" onClick={()=>{setSound(!on);setOn(!on)}}>{on?<Volume2 size={16}/>:<VolumeX size={16}/>}<span>{on?'Sound on':'Sound off'}</span></button>)
}
