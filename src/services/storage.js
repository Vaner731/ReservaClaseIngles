import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarStorage = async (clave, valor) => {
  try {
    const json = JSON.stringify(valor);
    await AsyncStorage.setItem(clave, json);
    return true;
  } catch (error) {
    console.error(
      `Error guardando ${clave}:`,
      error
    );
    return false;
  }
};

export const leerStorage = async (
  clave,
  valorInicial = null
) => {
  try {
    const json = await AsyncStorage.getItem(clave);

    if (json === null) {
      return valorInicial;
    }

    return JSON.parse(json);
  } catch (error) {
    console.error(
      `Error leyendo ${clave}:`,
      error
    );

    return valorInicial;
  }
};

export const eliminarStorage = async (clave) => {
  try {
    await AsyncStorage.removeItem(clave);
    return true;
  } catch (error) {
    console.error(
      `Error eliminando ${clave}:`,
      error
    );
    return false;
  }
};