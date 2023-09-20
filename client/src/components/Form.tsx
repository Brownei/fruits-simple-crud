import { useRef, SyntheticEvent } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useQueryClient } from "@tanstack/react-query"

export default function Form() {
    const queryClient = useQueryClient()
    const nameRef = useRef<HTMLInputElement>(null)
    const genusRef = useRef<HTMLInputElement>(null)
    const familyRef = useRef<HTMLInputElement>(null)
    const orderRef = useRef<HTMLInputElement>(null)
    const carbohydratesRef = useRef<HTMLInputElement>(null)
    const caloriesRef = useRef<HTMLInputElement>(null)
    const proteinRef = useRef<HTMLInputElement>(null)
    const fatRef = useRef<HTMLInputElement>(null)
    const sugarRef = useRef<HTMLInputElement>(null)
    
    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        const name = nameRef.current?.value
        const family = familyRef.current?.value
        const order = orderRef.current?.value
        const genus = genusRef.current?.value
        const calories = caloriesRef.current?.value
        const carbohydrates = carbohydratesRef.current?.value
        const fat = fatRef.current?.value
        const protein = proteinRef.current?.value
        const sugar = sugarRef.current?.value
        const nutritions = {
            carbohydrates,
            fat,
            protein,
            sugar,
            calories
        }
        
        console.log(nutritions)

        try {
            const response = await axios.post('http://localhost:3000/fruits', {
                name,
                genus,
                family,
                order,
                nutritions
            })
            if(response.data) {
                toast.success('Fruit Created', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

                queryClient.invalidateQueries({queryKey: ['fruits']})

                
            }
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError) {
                const response = error.response?.data

                toast.error(response, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

            }
        }
    }

    //genus, name, family, order, nutritions

    return (
        <main className='sticky grid justify-center items-center ml-10 mt-20'>
            <div className="mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add Fruits</h2>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto mt-4 sm:mt-2">
            <div className="grid grid-cols-1 gap-2 items-center sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="genus" className="block text-sm font-semibold leading-6 text-gray-900">
                  Genus
                </label>
                <div className="mt-1">
                  <input    
                    ref={genusRef}
                    type="text"
                    name="genus"
                    className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                  Family
                </label>
                <div className="mt-2.5">
                  <input
                    ref={familyRef}
                    type="text"
                    name="family"
                    className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="order" className="block text-sm font-semibold leading-6 text-gray-900">
                  Order
                </label>
                <div className="mt-2.5">
                  <input
                    ref={orderRef}
                    type="text"
                    name="order"
                    className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Nutritions
                </label>
                <div>
                    <div className='flex gap-3 items-center'>
                        <label className='block text-sm font-semibold leading-6 text-gray-900 '>Caborhydrates: </label>
                        <div className="mt-2.5">
                            <input
                                ref={carbohydratesRef}
                                type="number"
                                name="carbohydrates"
                                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <label className='block text-sm font-semibold leading-6 text-gray-900'>Protein: </label>
                        <div className="mt-2.5">
                            <input
                                ref={proteinRef}
                                type="number"
                                name="protein"
                                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <label className='block text-sm font-semibold leading-6 text-gray-900'>Calories: </label>
                        <div className="mt-2.5">
                            <input
                                ref={caloriesRef}
                                type="number"
                                name="calories"
                                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <label className='block text-sm font-semibold leading-6 text-gray-900'>Fat: </label>
                        <div className="mt-2.5">
                            <input
                                ref={fatRef}
                                type="number"
                                name="fat"
                                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <label className='block text-sm font-semibold leading-6 text-gray-900'>Sugar: </label>
                        <div className="mt-2.5">
                            <input
                                ref={sugarRef}
                                type="number"
                                name="sugar"
                                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={handleSubmit}
                type="button"
                className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* { isPending ? 'Create' : 'Creating...'} */}
                Create
              </button>
            </div>
          </form>
        </main>
      )
}