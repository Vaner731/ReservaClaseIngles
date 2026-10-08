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
     reserva.horario === horario
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

const eliminarReserva = useCallback(
 async (claseId, horario) => {
  const actuales = Array.isArray(reservas)
   ? reservas
   : [];

  const nuevasReservas = actuales.filter(
   (reserva) =>
    !(
     reserva.claseId === claseId &&
     reserva.horario === horario
    )
  );

  await actualizarReservas(nuevasReservas);

  console.log(
   'Reserva eliminada:',
   claseId,
   horario
  );
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
   eliminarReserva,
   obtenerReserva,
   cargandoReservas,
  }}
 >
  {children}
 </ReservasContext.Provider>
 );
}