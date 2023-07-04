export interface EpisodeProps {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: string
  description?: string
  durationAsString: string
  url: string
}

export interface EpisodeFormatter {
  id: string
  title: string
  thumbnail: string
  members: string
  published_at: string
  durationAsString: string
  file: {
    duration: string
    url: string
  }
}

export interface HomeProps {
  latestEpisodes: EpisodeProps[]
  allEpisodes: EpisodeProps[]
}

export interface EpisodeProps {
  episode: EpisodeProps
}