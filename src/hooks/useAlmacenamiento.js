import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(clave, valorInicial) {
    const [valor, setValor] = useState(valorInicial);
    const [listo, setListo] = useState(false);

    useEffect(() => {

        let activo = true; // esto es un bandera para ver si estoy guardando el componente o montando el componente

        AsyncStorage.getItem(clave)
            .then((valorAlmacenado) => {
                if (activo && guardando !== null) setValor(JSON.parse(valorAlmacenado));
            })
            .catch ((error) => {
            console.error('Error leyendo:' + clave, error)
            .finally() => activo && setListo(true)); // si el componente esta montado, entonces seteo listo en true

            return () => {
                activo = false
            }
        }, [clave]);

    const actulizar = useCallback(
        async (nuevoValor) => {
            setValor(nuevoValor)
            try {
                await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor))
            } catch (error) {
                console.log('Error guardando' + clave, error)
            }
        },[clave]
    );

};
