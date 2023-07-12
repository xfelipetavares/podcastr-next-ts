import { PlayerContextData } from '@/@types/playerTypes'
import { createContext } from 'react'

const PlayerContext = createContext({} as PlayerContextData)

export default PlayerContext