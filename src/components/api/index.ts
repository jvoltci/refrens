import axios from "axios"

const BASE_CHARACTER_URL = 'https://rickandmortyapi.com/api/character'
const BASE_EPISODE_URL = 'https://rickandmortyapi.com/api/episode'

export const getCharacters = async (page: string): Promise<[]> => {
    try {
        const response = await axios.get(`${BASE_CHARACTER_URL}/?page=${page}`)
        return response.data.results || [] as []
    } catch(e: unknown) {
        console.log(e)
        return []
    }
}

export const getGeoMeta = async (url: string): Promise<string[]> => {
    try {
        const data: string[] = []
        const response = await axios.get(url)
        if(response.data) {
            data.push(response.data?.dimension)
            data.push(`${response.data?.residents.length}`)
        }
        return data
    } catch(e: unknown) {
        console.log(e)
        return []
    }
}

export const getChapters = async (episodesUrls: string[]): Promise<string[]> => {
    try {
        const param = extractChapterIndexParams(episodesUrls)
        let data: string[] = []
        const response = await axios.get(`${BASE_EPISODE_URL}/${param}`)
        if(response.data) {
            data = response.data.map((d: {name: string}) => (d?.name))
        }
        return data
    } catch(e: unknown) {
        console.log(e)
        return []
    }
}

const extractChapterIndexParams = (urls: string[]): string => {
    let param = ""
    urls.forEach(url => (param += url.split('/').pop() + ','))
    return param
}