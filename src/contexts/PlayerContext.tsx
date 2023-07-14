import {
  EpisodePlayer,
  PlayerContextData,
  PlayerContextProviderProps,
} from '@/@types/playerTypes'
import { createContext, useContext, useState } from 'react'

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState<EpisodePlayer[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  const play = (episode: EpisodePlayer) => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const playList = (list: EpisodePlayer[], index: number) => {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const togglePlay = () => setIsPlaying(!isPlaying)
  const setPlayingState = (state: boolean) => {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = currentEpisodeIndex + 1 < episodeList.length

  const playNext = () => {
    if(isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  const playPrevious = () => {
    if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
  }

  const toggleLoop = () => {
    setIsLooping(!isLooping)
  }

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling)
  }

  const contextParams = {
    episodeList,
    currentEpisodeIndex,
    play,
    isPlaying,
    togglePlay,
    setIsPlaying,
    setPlayingState,
    playList,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    isShuffling,
    toggleLoop,
    toggleShuffle,
  }

  return (
    <PlayerContext.Provider value={contextParams}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
