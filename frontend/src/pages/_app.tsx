import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function AppWithProviders(appProps: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <App {...appProps} />
    </QueryClientProvider>
  )
}
