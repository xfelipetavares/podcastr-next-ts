import { ReactNode } from "react"

export interface EpisodePlayer {
  title: string
  thumbnail: string
  members: string
  duration: number
  url: string
}

export interface PlayerContextData {
  episodeList: EpisodePlayer[]
  currentEpisodeIndex: number
  play: (episode: EpisodePlayer) => void
  isPlaying: boolean
  isShuffling: boolean
  isLooping: boolean
  togglePlay: () => void
  toggleShuffle: () => void
  toggleLoop: () => void
  playNext: () => void
  playPrevious: () => void
  setPlayingState: (state: boolean) => void
  setIsShuffling: (state: boolean) => void
  hasNext: boolean
  hasPrevious: boolean
  playList: (list: EpisodePlayer[], index: number) => void
  clearPlayerState: () => void
}

export interface PlayerContextProviderProps {
  children: ReactNode
}