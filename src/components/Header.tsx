import { ChangeEvent,FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore';

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const {pathname} = useLocation();
    const isHome = useMemo(() => pathname === '/', [pathname])
    
    const fethCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => {
        fethCategories()
    }, [fethCategories])

    const handleChange = (e:  ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //vallidar
        if(Object.values(searchFilters).includes('')) {
            showNotification({
                text:'All field has to be completed',
                error: true
            })
            return
        }
        //Consultar las recetas
        searchRecipes(searchFilters)
    }
  return (
    <>
    <header className={ isHome ? 'bg-header bg-cover bg-center' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 lg:py-16 py-5">
            <div className="flex justify-between items-center">
                <div>
                    <a href='/'><img className="lg:w-32 w-20" src="/logo.svg" alt="logotipo"/></a>
                   
                </div>

                <nav className='flex lg:gap-4 gap-2 lg:text-xl text-sm'>
                    <NavLink to="/" className={({isActive}) => isActive ? 'text-orange-500 font-bold uppercase' : 'text-white font-bold uppercase' }>Home</NavLink>
                    <NavLink to="/favorites" className={({isActive}) => isActive ? 'text-orange-500 font-bold uppercase' : 'text-white font-bold uppercase' }>Favorites</NavLink>
                    <NavLink to="/generate" className={({isActive}) => isActive ? 'text-orange-500 font-bold uppercase' : 'text-white font-bold uppercase' }>Generate Ai</NavLink>
                </nav>
            </div>
            {isHome && (
                <form onSubmit={handleSubmit} className='md:w-1/2 2xl:w-1/3 bg-orange-600 my-32 p-10 rounded-lg shadow space-y-6'>
                    <div className='space-y-4'>
                        <label
                        htmlFor='ingredient'
                        className='block text-white uppercase font-extrabold lg:text-lg'
                        >Name or Ingredient</label>

                        <input
                        id='ingredient'
                        type='text'
                        name='ingredient'
                        className='p-3 w-full rounded-lg focus:outline-none'
                        placeholder='Name or ingredient, ex: Vodka, Tequila, Coffee...'
                        onChange={handleChange}
                        value={searchFilters.ingredient}
                        />

                    </div>
                    <div className='space-y-4'>
                        <label
                        htmlFor='category'
                        className='block text-white uppercase font-extrabold lg:text-lg'
                        >Category</label>

                        <select
                        id='category'
                        name='category'
                        className='p-3 w-full rounded-lg focus:outline-none'
                        onChange={handleChange}
                        value={searchFilters.category}
                        >
                            <option value="">-- Select --</option>
                                {categories.drinks.map(category => (
                                    <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                                ))}
                                
                        </select>
                    </div>
                    <input
                    type="submit"
                    value="Search Recipe"
                    className='cursor-pointer bg-orange-800 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                    />

                </form>
            )}
        </div>
    </header>
    </>
  )
}
