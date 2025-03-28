import {getTrackInfo} from '@app/services/track';
import {useQueries} from '@tanstack/react-query';

export function useTracksInfo(trackIds: string[]) {
  // Crear un array de objetos de consulta para cada trackId
  const queries = trackIds.map(trackId => {
    return {
      queryKey: ['trackInfo', trackId], // Usar trackId en el queryKey para cada pista
      queryFn: () => getTrackInfo(trackId), // Llamar a getTrackInfo con el trackId
    };
  });

  // Usar useQueries para ejecutar todas las consultas a la vez
  const results = useQueries({queries});

  // Procesar los resultados de las consultas
  const tracksInfo = results.map(result => {
    return result.data; // Devolver los datos si están disponibles
  });

  return tracksInfo;
}
