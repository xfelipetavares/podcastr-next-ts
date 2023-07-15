/* eslint-disable @next/next/no-img-element */
import { usePlayer } from '@/contexts/PlayerContext'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

const Player = () => {
  const {
    episodeList,
    currentEpisodeIndex,
    togglePlay,
    isPlaying,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    toggleLoop,
    toggleShuffle,
    isShuffling,
    clearPlayerState,
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]
  const audioRef = useRef<HTMLAudioElement | any>(null)
  const [progress, setProgress] = useState(0)

  const setupProgressListener = () => {
    audioRef.current?.currentTime ?? 0
    
    audioRef.current?.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current?.currentTime ?? 0))
    })
  }
  
  const handleSeek = (amount: number | number[]) => {
    if (typeof amount === 'number') {
      audioRef.current.currentTime = amount
      setProgress(amount)
    }
  }

  const handleEpisodeEnded = () => {
    if(hasNext){
      playNext()
    } else {
      clearPlayerState()
    }
  }

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play()
    else audioRef.current.pause()
  }, [isPlaying])

  return (
    <div className={styles.playerContainer}>
      {episode && (
        <audio
          loop={isLooping}
          src={episode.url}
          autoPlay
          onEnded={handleEpisodeEnded}
          onLoadedMetadata={setupProgressListener}
          ref={audioRef}
          onPause={() => setPlayingState(false)}
          onPlay={() => setPlayingState(true)}
        />
      )}
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>
      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt={episode.title}
          />
          <strong>{episode?.title}</strong>
          <span>{episode?.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}
      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ background: '#04d361' }}
                railStyle={{ background: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
            disabled={!episode || episodeList.length === 1}
          >
            <img src="/shuffle.svg" alt="embaralhar" />
          </button>
          <button
            type="button"
            onClick={playNext}
            name="previous"
            disabled={!hasNext || !episode}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className={styles.playButton}
            disabled={!episode}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Pausar" />
            )}
          </button>
          <button
            type="button"
            onClick={playPrevious}
            name="next"
            disabled={!hasPrevious || !episode}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button
            type="button"
            disabled={!episode}
            className={isLooping ? styles.isActive : ''}
            onClick={toggleLoop}
          >
            <img src="/repeat.svg" alt="repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Player
