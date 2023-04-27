import { act, fireEvent, render } from '@testing-library/react'
import { Home } from "./Home"
import { BrowserRouter } from 'react-router-dom'
const mockData = [
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
]
describe('<Home />', () => {
    const onNextMock = jest.fn()
    const onPreviousMock = jest.fn()
    it('should show empty div when no characters', () => {
        const home = render(
            <Home
                page={1}
                onNext={onNextMock}
                onPrevious={onPreviousMock}
                characters={[]}
            />
        )
        expect(home.getByTestId('empty-div')).toBeVisible()
    })
    it('should render characters', () => {
        const onNextMock = jest.fn()
        const onPreviousMock = jest.fn()
        const home = render(
            <BrowserRouter>
                <Home
                    page={1}
                    onNext={onNextMock}
                    onPrevious={onPreviousMock}
                    characters={mockData}
                />
            </BrowserRouter>
        )
        expect(home.getByTestId('characters-container')).toBeVisible()
    })
    it('should paginate', async () => {
        const home = render(
            <BrowserRouter>
                <Home
                    page={1}
                    onNext={onNextMock}
                    onPrevious={onPreviousMock}
                    characters={mockData}
                />
            </BrowserRouter>
        )
        await act(async () => { await fireEvent.click(home.getByTestId('next'))})
        expect(onNextMock).toBeCalled()
        await act(async () => { await fireEvent.click(home.getByTestId('previous'))})
        expect(onPreviousMock).toBeCalled
    })
})