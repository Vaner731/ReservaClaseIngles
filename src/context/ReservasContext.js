import React, { createContext, useState } from 'react';

export const ReservasContext = createContext(null);

export function ReservasProvider({ children }) {
    const [reservas, setReservas] = useState([]);

    const reservar = (clase, horario) => {
        setReservas((actuales) => {
            if (actuales.some((reserva) => reserva.claseId === clase.id)) return actuales;
            return [...actuales, { claseId: clase.id, claseTitulo: clase.titulo, horario }];
        });
    };

    const obtenerReserva = (claseId) => reservas.find((reserva) => reserva.claseId === claseId);

    return (
        <ReservasContext.Provider value={{ reservar, obtenerReserva }}>
            {children}
        </ReservasContext.Provider>
    );
}
