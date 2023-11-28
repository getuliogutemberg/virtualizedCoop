import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { atom, useAtom } from 'jotai'

export const socket = io('https://virtualized-server.vercel.app/')
export const charactersAtom = atom([])
export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom)
    useEffect(() => {
        function onConnect() {
            console.log('connected')
        }
        function onDisconnect() {
            console.log('disconnected')
        }
        function onMessage() {
            console.log('message')
        }
        function onHello() {
            console.log('hello')
        }
        function onCharacter(value) {
            console.log('characters', value)
            setCharacters(value)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('message', onMessage)
        socket.on('hello', onHello)
        socket.on('characters', onCharacter)
        
       return () => {
           socket.off('connect', onConnect)
           socket.off('disconnect', onDisconnect)
           socket.off('message', onMessage)
           socket.off('hello', onHello)
           socket.off('characters', onCharacter)
       }
    }, [])
}