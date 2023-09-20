import { Fruits } from '../../../src/interfaces/Fruits';
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getFruits(): Promise<Fruits[]> {
  const {data} = await axios.get('http://localhost:3000/fruits')
  return data
}

export const useFruits = () => useQuery({
  queryKey: ['fruits'],
  queryFn: getFruits
})