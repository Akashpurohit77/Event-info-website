import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex flex-col flex-between flex-center gap-5 wrapper text-center p-5 sm:flex-row'>
        <Link href='/'>
        <Image
        src="/assets/images/logo.svg"
        alt='logo'
        width={128}
        height={38}
        />
        </Link>
        <p>2025 Evently.All Rights Reserved</p>
      </div>

    </footer>
  )
}

export default Footer
