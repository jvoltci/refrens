import { render, waitFor } from "@testing-library/react"
import { Character } from "./Character"
const mockUseLocationValue = {
    pathname: "/character/1",
    search: '',
    hash: '',
    state: null
}
jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    })
}));
describe('<Character />', () => {
    it('should show character', () => {
        const character = render(
            <Character
                characters={[
                    {
                        id: 1,
                        name: 'Test',
                        image: 'url',
                        species: 'known',
                        gender: 'male',
                        location: { name: '', url: '' },
                        origin: { name: '', url: '' },
                        status: '',
                        episode: []
                    }
                ]}
            />
        )

        waitFor(() => {
            expect(character.getByTestId('character-container')).toBeVisible()
        }, { timeout: 4000 })
    })
})