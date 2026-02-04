import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {
    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state) => state.closeModal)
    const selectedRecipe = useAppStore((state) => state.selectedRecipe)
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
    const favoriteExists = useAppStore((state) => state.favoriteExists)

    const renderIngredients = () => {
        const ingredients : JSX.Element[] = [];
        for(let i = 1; i <= 6; i++) {
          const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
          const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];
          if(ingredient && measure) {
            ingredients.push(
              <li key={i} className="text-lg font-normal flex items-center gap-2">
                <span className="inline-block w-4 text-center">•</span>
                <span>{ingredient} - {measure}</span>
              </li>
            );
          }
        }
        return (
          <ul className="pl-2 mb-4">
            {ingredients}
          </ul>
        );
      }


  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center lg:p-4 p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-xl transition-all sm:my-4 sm:max-w-xl sm:p-6" >

                  <Dialog.Title as="h3" className="text-gray-900 lg:text-4xl text-2xl font-extrabold lg:my-5 my-2 text-center">
                      {selectedRecipe.strDrink}
                  </Dialog.Title>

                  <img src={selectedRecipe.strDrinkThumb} className="mx-auto" alt={`image of ${selectedRecipe.strDrink}`}/>

                  <Dialog.Title as="h3" className="text-gray-900 lg:text-2xl text-xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  {renderIngredients()}
                  <Dialog.Title as="h3" className="text-gray-900 lg:text-2xl text-xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>
                    <p className='lg:text-lg text-md'>{selectedRecipe.strInstructions}</p>
                    <div className='lg:mt-5 mt-3 flex justify-between lg:gap-4 gap-2'>
                      <button className='w-full rounded lg:text-xl text-sm bg-gray-600 lg:p-3 p-2 font-bold uppercase text-white shadow hover:bg-gray-500' type='button' onClick={closeModal}>
                      Close
                      </button>
                      <button className='w-full rounded lg:text-xl text-sm bg-orange-600 lg:p-3 p-2 font-bold uppercase text-white shadow hover:bg-orange-500' type='button' onClick={() => handleClickFavorite(selectedRecipe)}>
                        {favoriteExists(selectedRecipe.idDrink) ? 'Delete' : 'Add to Favorite'}
                      </button>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}