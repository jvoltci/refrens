import React from "react"
import { CharacterType } from "../../App"
import { useParams } from "react-router-dom"
import './Character.css'
import { getChapters, getGeoMeta } from "../api"
interface CType {
    characters: CharacterType[]
}
export const Character: React.FC<CType> = ({ characters }: CType) => {
    const { id } = useParams<{ id: string }>()

    const [character, setCharacter] = React.useState<CharacterType | undefined>()
    const [origMeta, setOrigMeta] = React.useState<string[]>(['unknown', '0'])
    const [locMeta, setLocMeta] = React.useState<string[]>(['unknown', '0'])
    const [chapters, setChapters] = React.useState<string[]>([])

    const [loading, setLoading] = React.useState(true)

    const handleGeoMeta = async (character: CharacterType) => {
        const loc = await getGeoMeta(character.location.url)
        setLocMeta(loc)
        const orig = await getGeoMeta(character?.origin.url)
        setOrigMeta(orig)
    }

    const handleChapters = async (episodes: string[]) => {
        const data = await getChapters(episodes)
        setChapters(data)
    }

    React.useEffect(() => {
        const numberId = Number(id)
        const selectedCharacter = characters.find((char: { id: number }) => char.id === numberId)
        setCharacter(selectedCharacter)
        setLoading(false)
        selectedCharacter && handleGeoMeta(selectedCharacter)
        selectedCharacter && handleChapters(selectedCharacter.episode)
    }, [id, characters])

    if (loading) {
        return (
            <h1>
                <i>Loading...</i>
            </h1>
        )
    } if (!loading && !character) {
        return (
            <h1>Character not found</h1>
        )
    }
    return (
        <div data-testid='character-container' style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
            <div className='card' style={{ display: 'flex', flexDirection: 'column', borderRadius: '20px', border: '1px solid black' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div>{character?.name}</div>
                    <img height={'80%'} style={{ borderRadius: '800px', border: '1px solid black' }} src={character?.image} alt={`profile:${character?.image}`} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '12px' }}>
                    <p className='data'>Gender: {character?.gender}</p>

                    <div style={{ color: 'green' }}>
                        <p className='data'>Location: {character?.location?.name}</p>
                        <p>Dimension: {locMeta[0] || 'unknown'}</p>
                        <p>Number of Residents: {locMeta[1] || 0}</p>
                    </div>
                    <div style={{ color: 'yellow' }}>
                        <p className='data'>Origin: {character?.origin?.name}</p>
                        <p>Dimension: {origMeta[0] || 'unknown'}</p>
                        <p>Number of Residents: {origMeta[1] || 0}</p>
                    </div>
                    <p className='data'>Species: {character?.species}</p>
                    <p className='data'>Status: {character?.status}</p>
                </div>
                {chapters.length ?
                    <>
                        <p>CHAPTERS:</p>
                        <ol>{chapters.map(name => (<li key={name}>{name}</li>))}</ol>
                    </> : null}
            </div>
        </div>
    )
}