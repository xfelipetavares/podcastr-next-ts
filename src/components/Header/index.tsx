/* eslint-disable @next/next/no-img-element */
import React from 'react'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './styles.module.scss'
import Link from 'next/link'

const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR })
  return (
    <header className={styles.headerContainer}>
      <Link href={'/'}>
        <img src="/logo.svg" alt="logo" />
      </Link>
      <p>O melhor para você ouvir, sempre.</p>
      <span>{currentDate}</span>
    </header>
  )
}

export default Header
