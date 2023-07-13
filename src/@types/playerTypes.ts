import { ReactNode } from "react"

export interface EpisodePlayer {
  title: string
  thumbnail: string
  members: string
  duration: string
  url: string
}

export interface PlayerContextData {
  episodeList: EpisodePlayer[]
  currentEpisodeIndex: number
  play: (episode: EpisodePlayer) => void
  isPlaying: boolean
  togglePlay: () => void
  playNext: () => void
  playPrevious: () => void
  setPlayingState: (state: boolean) => void
  hasNext: boolean
  hasPrevious: boolean
  playList: (list: EpisodePlayer[], index: number) => void
}

export interface PlayerContextProviderProps {
  children: ReactNode
}