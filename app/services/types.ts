export interface User {
  country: string;
  display_name: string;
  email: string;
  followers: Followers;
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    },
  ];
  product: string;
  type: string;
  uri: string;
}

export interface Playlist {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: PlaylistModel[];
  }

  export interface PlaylistModel {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner; 
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      limit: number;
      next: string;
      offset: number;
      previous: string;
      total: number;
      items: Track[];
    };
    type: string;
    uri: string;
  }


export interface PlaylistTrack {
    added_at: string;
    added_by: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string;
        total: number;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    is_local: boolean;
    track: Track;
  }
  
  export interface Track {
    album: {
      album_type: string;
      total_tracks: number;
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      restrictions: {
        reason: string;
      };
      type: string;
      uri: string;
      copyrights: {
        text: string;
        type: string;
      }[];
      external_ids: {
        isrc: string;
        ean: string;
        upc: string;
      };
      genres: string[];
      label: string;
      popularity: number;
      album_group: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string;
        total: number;
      };
      genres: string[];
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      name: string;
      popularity: number;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
      ean: string;
      upc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: any;
    restrictions: {
      reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }


interface ExternalUrls {
    spotify: string;
  }
  
  interface Followers {
    href: string;
    total: number;
  }
  
  interface Image {
    url: string;
    height: number;
    width: number;
  }
  
  interface Owner {
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  }
  interface Followers {
    href: string;
    total: number;
  }