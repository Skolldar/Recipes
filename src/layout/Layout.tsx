import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import Header from "../components/Header"
import Modal from "../components/Modal"
import Notification from "../components/Notification"
import { useAppStore } from "../stores/useAppStore"

export default function Layout() {

  const loadFromStorage = useAppStore((state) => state.loadFromStorage)


  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage]) //conecta el state de localstorage y el state en redux.

  return (
    <>
     
            <Header/>
            <main className="container mx-auto lg:py-16 p-5">
            <Outlet />
            </main>
            <Modal/>
            <Notification />

    </>
  )
}
