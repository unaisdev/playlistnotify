import { SEARCH_TYPE, SPOTIFY_API_URL } from "../../constants";
import HttpClient from "../httpClient"
import { PlaylistModel } from "../types";

export const fetchSearchPlaylists = async (searchText: string) =>  {
    const {data} = await HttpClient({
        baseURL: SPOTIFY_API_URL,
        url: '/search',
        method: 'get',
        params: {
            q: searchText,
            type: SEARCH_TYPE.PLAYLIST
        }
      });

    return data.playlists.items as PlaylistModel[]
}