import '../styles/global.scss'

import type { AppProps } from 'next/app'
import styles from '../styles/app.module.scss'
import Header from '@/components/Header'
import Player from '@/components/Player'
import PlayerContext from '@/contexts/PlayerContext'
import { useState } from 'react'
import { EpisodePlayer } from '@/@types/playerTypes'

export default function App({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState<EpisodePlayer[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = (episode: EpisodePlayer) => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => setIsPlaying(!isPlaying)
  const setPlayingState = (state: boolean) => {
    setIsPlaying(state)
  }

  const contextParams = {
    episodeList,
    currentEpisodeIndex,
    play,
    isPlaying,
    togglePlay,
    setIsPlaying,
    setPlayingState,
  }

  return (
    <PlayerContext.Provider value={contextParams}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}
