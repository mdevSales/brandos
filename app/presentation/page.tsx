import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BrandOS Workshop Presentation | Southasiaforce DMV',
  description: 'Interactive presentation guide for LinkedIn Brand Building Workshop',
}

export default function PresentationPage() {
  return (
    <iframe
      src="/presentation.html"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      title="BrandOS Workshop Presentation"
    />
  )
}
