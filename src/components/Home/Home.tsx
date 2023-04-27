import React from "react"
import { Link } from "react-router-dom"
import "./Home.css"
import { Character, CharacterType } from "../../App"

interface HomeType {
    page: number
    onPrevious: () => void
    onNext: () => void
    characters: CharacterType[]
}
export const Home: React.FC<HomeType> = ({ page, onPrevious, onNext, characters }) => {

    if (!characters.length) {
        return (<div data-testid='empty-div'></div>)
    }
    return (
        <div data-testid='characters-container'>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {characters.map((character: CharacterType) => <Card key={character.id} character={character} />)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button data-testid='previous' style={{ background: 'pink' }} onClick={onPrevious} disabled={page === 1}>
                    Previous Page
                </button>
                <button data-testid='next' style={{ background: 'pink' }} onClick={onNext} disabled={characters.length === 0}>
                    Next Page
                </button>
            </div>
        </div>
    )
}

const Card: React.FC<Character> = ({ character }: Character) => {
    const { id, name, image, species, gender } = character
    return (
        <Link to={`/character/${id}`}>
            <div className='card-container' style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', cursor: 'pointer', padding: 16, width: '16rem', border: '1px solid black', color: 'white' }}>
                <div style={{ display: 'flex', flexDirection: 'column', background: 'black', borderRadius: '10px', textAlign: 'center', marginBottom: 10, border: '1px solid black' }}>
                    <img style={{ borderRadius: '10px' }} src={image} alt={name} />
                    <span style={{ margin: '20px 0' }}>{name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <span>Species: {species}</span>
                    <span>Gender: {gender}</span>
                </div>
            </div>
        </Link>
    )
}