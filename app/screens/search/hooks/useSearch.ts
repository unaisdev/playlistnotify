import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {fetchSearchPlaylists} from '../../../services/search';
import {PlaylistModel} from '../../../services/types';
import {TextInput} from 'react-native';

export const useSearch = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const debouncedSearchTerm = useDebounce(searchPhrase, 500);
  const queryClient = useQueryClient();
  //isLoading only return true if it is hard "first" loading
  //isFetching always when makes a request
  const {data, isLoading, isFetching, error} = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => {
      if (debouncedSearchTerm) return fetchSearchPlaylists(debouncedSearchTerm);
      return [];
    },
    keepPreviousData: true,
    staleTime: 2000,
  });

  const mutation = useMutation(
    async (text: string | undefined) => {
      if (text) {
        // Normalize the text by removing leading and trailing spaces
        const normalizeText = text.trim();

        const playlists = await fetchSearchPlaylists(normalizeText);
        return playlists;
      }

      if (text === '') return [];

      return [];
    },
    {
      onSuccess: async (data: PlaylistModel[]) => {
        // if we dont have data we dont need to communicate it
        if (data.length > 0) {
          queryClient.setQueryData(['search'], data);
        } else {
          queryClient.setQueryData(['search'], []); // Set empty array if no data
        }
      },
    },
  );

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    inputRef.current?.blur();
  };

  const handleClear = () => {
    handleSearchTextChange('');
    inputRef.current?.blur();
    inputRef.current?.clear();
  };

  const handleSearchTextChange = (searchText: string) => {
    setSearchPhrase(searchText);
  };

  const updateSearchResults = useCallback(() => {
    mutation.mutate(debouncedSearchTerm);
    // debouncedSearchTerm is require in order to make the side effect
  }, [debouncedSearchTerm]);

  useEffect(() => {
    updateSearchResults();
  }, [updateSearchResults]);

  return {
    data,
    searchPhrase,
    inputRef,
    isLoading,
    isFetching,
    handleBlur,
    handleClear,
    handleFocus,
    handleSearchTextChange,
  };
};

//Dynamic State debounced value
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a new timer with the updated value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer on component unmount
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
