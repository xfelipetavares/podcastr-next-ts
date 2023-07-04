/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import api from '@/services/api'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import styles from './episode.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { EpisodeProps } from '@/@types/types'

const Episode = ({ episode }: EpisodeProps) => {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href={'/'}>
          <button className={styles.firstChild} type="button">
            <img src="/arrow-left.svg" alt="voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          alt="capa do episodio"
        />
        <button className={styles.lastChild} type="button">
          <img src="/play.svg" alt="tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description ? episode.description : "" }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { slug } = context.params
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

export default Episode