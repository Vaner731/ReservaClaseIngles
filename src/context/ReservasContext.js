import React, {createContext, useCallback} from 'react';
import useAlmacenamiento from '../hooks/useAlmacenamiento';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const ReservasContext = createContext(null);

export function ReservasProvider({ children }) {
 const [reservas, actualizarReservas, cargandoReservas] =
  useAlmacenamiento(STORAGE_KEYS.RESERVAS, []);

  const reservar = useCallback(
    async (clase, horario) => {
      if (!clase || !clase.id) {
        return false;
      }

      if (!horario) {
        return false;
      }

      const actuales = Array.isArray(reservas)
        ? reservas
        : [];

      const yaExiste = actuales.some(
        (reserva) =>
          reserva.claseId === clase.id
      );

      if (yaExiste) {
        return false;
      }

      const nuevaReserva = {
        claseId: clase.id,
        claseTitulo: clase.titulo,
        horario,
      };

      await actualizarReservas([
        ...actuales,
        nuevaReserva,
      ]);

      return true;
    },
    [reservas, actualizarReservas]
  );

  const obtenerReserva = useCallback(
    (claseId) => {
      const actuales = Array.isArray(reservas)
        ? reservas
        : [];

      return actuales.find(
        (reserva) =>
          reserva.claseId === claseId
      );
    },
    [reservas]
  );

  return (
    <ReservasContext.Provider
      value={{
        reservas,
        reservar,
        obtenerReserva,
        cargandoReservas,
      }}
    >
      {children}
    </ReservasContext.Provider>
  );
}