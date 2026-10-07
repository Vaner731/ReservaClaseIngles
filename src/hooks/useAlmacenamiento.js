import {useState, useEffect, useCallback} from 'react';
import {leerStorage, guardarStorage} from '../services/storage';

export default function useAlmacenamiento(clave,valorInicial) {
  const [valor, setValor] = useState(valorInicial);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      const valorAlmacenado = await leerStorage(
        clave,
        valorInicial
      );

      if (activo) {
        setValor(valorAlmacenado);
        setCargando(false);
      }
    };

    cargar();

    return () => {
      activo = false;
    };
  }, [clave]);

  const actualizar = useCallback(
    async (nuevoValor) => {
      setValor(nuevoValor);

      await guardarStorage(
        clave,
        nuevoValor
      );
    },
    [clave]
  );

  return [
    valor,
    actualizar,
    cargando,
  ];
}