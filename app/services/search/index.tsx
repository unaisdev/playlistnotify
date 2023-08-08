import { AxiosResponse } from "axios";
import { SEARCH_TYPE, SPOTIFY_API_URL } from "../../constants";
import createHttpClient from "../httpClient";
import { PlaylistModel } from "../types";
import HttpClient from "../httpClient";

//https://github.com/axios/axios/issues/1510

type SearchResponse = {  // Define SearchResponse as AxiosResponse
    playlists: {
        items: PlaylistModel[]
    }
}

export const fetchSearchPlaylists = async (searchText: string): Promise<PlaylistModel[]> =>  {
    const { data } = await HttpClient<SearchResponse>({
        baseURL: SPOTIFY_API_URL,
        url: '/search',
        method: 'get',
        params: {
            q: searchText,
            type: SEARCH_TYPE.PLAYLIST
        },
    });

    if (data.playlists.items.length === 0) {
        return [];
    }

    return data.playlists.items;
}
