import React from 'react'

interface UsernameHook {
  name: string
  setter: (name: string) => void
}

interface HostHook {
  isHost: boolean
  setter: (isHost: boolean) => void
}

export function useUsername(): UsernameHook {
  const [username, setUsername] = React.useState<string>('')

  React.useEffect(() => {
    // Retrieve username from localStorage
    const username = localStorage.getItem('username')
    if (username) setUsername(username)
  }, [])

  React.useEffect(() => {
    // Updates localStorage with the new username
    localStorage.setItem('username', username)
  }, [username])

  return { name: username || 'Anonymous', setter: setUsername }
}

export function useHost(): HostHook {
  const [isHost, setIsHost] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Retrieve username from localStorage
    const host = localStorage.getItem('isHost')
    if (host) setIsHost(host === 'true')
  }, [])

  React.useEffect(() => {
    // Updates localStorage with the new username
    localStorage.setItem('isHost', isHost.toString())
  }, [isHost])

  return { isHost, setter: setIsHost }
}
