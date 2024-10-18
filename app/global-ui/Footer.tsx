import React from 'react'

const Footer = () => {
  return (
    <footer className='py-6 px-8 md:px-8 md:py-4 bg-merino'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row '>
        <p className='text-gray text-center text-sm leading-loose text-muted-foreground md:text-left'>
          Built by{' '}
          <a
            href='https://www.linkedin.com/in/garysmith1933/'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'>
            Gary Smith
          </a>
          ,{' '}
          <a
            href='https://www.linkedin.com/in/olga-yudkin'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'>
            Olga Yudkin
          </a>
          ,{' '}
          <a
            href='https://www.linkedin.com/in/radhika-godla-81335166'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'>
            Radhika G
          </a>
          ,{' '}
          <a
            href='https://www.linkedin.com/in/lidiaprado'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'>
            Lidia Prado.{' '}
          </a>
        </p>
        <p className='text-gray text-center text-sm leading-loose text-muted-foreground md:text-left'>
          The source code is available on{' '}
          <a
            href='https://github.com/chingu-voyages/v51-tier3-team-33'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'>
            Github.
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer