import { useContext } from 'react';

import { ReservasContext } from '../context/ReservasContext';

export default function useReserva() {
  const context = useContext(ReservasContext);

  if (!context) {
    throw new Error(
      'useReserva debe usarse dentro de ReservasProvider'
    );
  }

  return context;
}
