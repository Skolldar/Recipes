import { lazy, Suspense } from 'react'; // para separar el archivo y no pese mucho la pagina

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
//importamos con lazy para que cargue el archivo cuando el usuario de click en la ruta.
const HomePage = lazy(() => import ('./view/HomePage'))
const FavoritePage = lazy(() => import ('./view/FavoritePage'))


function AppRouter() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={    
        <Suspense fallback="loading...">
          <HomePage/>
        </Suspense>} index/>

      <Route path="/favorites" element={
        <Suspense fallback="loading...">
          <FavoritePage/>
        </Suspense>
        }/>

      </Route> 
    </Routes>
    </BrowserRouter>     
    </>
  )
}

export default AppRouter
