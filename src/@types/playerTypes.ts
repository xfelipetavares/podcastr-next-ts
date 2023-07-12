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
  setPlayingState: (state: boolean) => void
}