import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Home } from './components/Home/Home'
import React from 'react'
import { getCharacters } from './components/api'
import { Character } from './components/Character/Character'
interface locMeta {
  name: string
  url: string
}
export interface CharacterType  {
  id: number
  name: string
  image: string
  species: string
  gender: string
  origin: locMeta
  location: locMeta
  status: string
  episode: string[]
}
export interface Character {
  character: CharacterType
}

function App() {
  const navigate = useNavigate()
  const { page: pageFromParam } = useParams<{ page: string }>()
  const [page, setPage] = React.useState<number>(Number(pageFromParam) || 1)
  const [characters, setCharacters] = React.useState<CharacterType[]>([])
  const loadCharacters = async (pageIndex: string): Promise<void> => {
    const data = await getCharacters(pageIndex)
    navigate(`/page/${page}`)
    setCharacters(data)
  }
  React.useEffect(() => {
    loadCharacters(`${page}`)
    window.scrollTo(0, 0)
  }, [page])

  const handleNextPage = () => {
    setPage(page + 1);
  }
  const handlePrevPage = () => {
    setPage(page - 1);
  }
  return (
    <Routes>
      <Route path='/' element={<Navigate to={'/page/:page'} replace />} />
      <Route path='/page/:page' element={
        <Home page={page} onPrevious={handlePrevPage} onNext={handleNextPage} characters={characters} />
      } />
      <Route path='/character/:id' element={<Character characters={characters} />} />
    </Routes>
  )
}

export default App
