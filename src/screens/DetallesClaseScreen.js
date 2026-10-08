import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useResponsive from '../hooks/useResponsive';
import useReserva from '../hooks/useReserva';
import { colors, radius, spacing, typography } from '../theme';
import { formatearPrecio } from '../data/clases';
import EtiquetaNivel from '../components/EtiquetaNivel';
import { leerStorage } from '../services/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export default function DetallesClaseScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { clase } = route.params;

  const { paddingHorizontal, esTablet } = useResponsive();

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const { reservar, reservas } = useReserva();

  const horariosReservados = Array.isArray(reservas)
    ? reservas
    : [];

  const manejarReserva = async () => {
    if (!horarioSeleccionado) {
      console.log(
        'Reserva no realizada: debe seleccionar un horario.'
      );
      return;
    }

    const perfil = await leerStorage(
      STORAGE_KEYS.PERFIL,
      null
    );

    if (!perfil) {
      console.log(
        'No existe un perfil registrado. Abriendo Perfil.'
      );

      navigation
        .getParent()
        ?.navigate('Perfil');

      return;
    }

    const horarioReservado =
      horariosReservados.some(
        (reserva) =>
          reserva.horario ===
          horarioSeleccionado
      );

    if (horarioReservado) {
      console.log(
        'Reserva no realizada: el horario ya está reservado.',
        horarioSeleccionado
      );
      return;
    }

    const resultado = await reservar(
      clase,
      horarioSeleccionado
    );

    if (!resultado) {
      console.log(
        'Reserva no realizada: el horario ya está reservado.'
      );
      return;
    }

    console.log(
      'Reserva realizada correctamente:',
      clase.titulo,
      horarioSeleccionado
    );

    setHorarioSeleccionado(null);
  };

  return (
    <View style={estilos.pantalla}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: clase.imagen }}
          resizeMode="cover"
          style={[
            estilos.portada,
            { height: esTablet ? 300 : 220 },
          ]}
        />

        <View
          style={{
            paddingHorizontal,
            paddingTop: spacing.xl,
          }}
        >
          <View style={estilos.encabezado}>
            <View style={estilos.tituloGrupo}>
              <Text style={typography.titulo}>
                {clase.titulo}
              </Text>

              <EtiquetaNivel nivel={clase.nivel} />
            </View>

            <Text style={estilos.descripcion}>
              {clase.descripcion}
            </Text>
          </View>

          <View style={estilos.datos}>
            <View style={estilos.dato}>
              <Ionicons
                name="star"
                size={18}
                color={colors.acento}
              />

              <Text style={estilos.datoValor}>
                {clase.rating}
              </Text>

              <Text style={typography.secundario}>
                Calificación
              </Text>
            </View>

            <View style={estilos.dato}>
              <Ionicons
                name="time-outline"
                size={18}
                color={colors.primario}
              />

              <Text style={estilos.datoValor}>
                {clase.duracion} min
              </Text>

              <Text style={typography.secundario}>
                Duración
              </Text>
            </View>

            <View style={estilos.dato}>
              <Ionicons
                name="people-outline"
                size={18}
                color={colors.exito}
              />

              <Text style={estilos.datoValor}>
                {clase.cupos}
              </Text>

              <Text style={typography.secundario}>
                Cupos
              </Text>
            </View>
          </View>

          <View style={estilos.profesor}>
            <Image
              source={{ uri: clase.profesor.foto }}
              style={estilos.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={estilos.profesorNombre}>
                {clase.profesor.nombre}
              </Text>

              <Text style={typography.secundario}>
                {clase.profesor.pais} · {clase.modalidad}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textoSuave}
            />
          </View>

          <Text style={estilos.seccionTitulo}>
            Horarios disponibles
          </Text>

          <View style={estilos.horarios}>
            {clase.horarios.map((horario) => {
              const seleccionado =
                horarioSeleccionado === horario;

              const reservado =
                horariosReservados.some(
                  (reserva) =>
                    reserva.horario === horario
                );

              return (
                <Pressable
                  key={horario}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: seleccionado,
                    disabled: reservado,
                  }}
                  disabled={reservado}
                  onPress={() =>
                    setHorarioSeleccionado(horario)
                  }
                  style={[
                    estilos.horario,
                    seleccionado &&
                      estilos.horarioSeleccionado,
                    reservado &&
                      estilos.horarioReservado,
                  ]}
                >
                  <Ionicons
                    name={
                      reservado
                        ? 'checkmark-circle'
                        : seleccionado
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={20}
                    color={
                      reservado
                        ? colors.exito
                        : seleccionado
                        ? colors.primario
                        : colors.textoSuave
                    }
                  />

                  <Text
                    style={[
                      estilos.textoHorario,
                      seleccionado &&
                        estilos.textoHorarioSeleccionado,
                      reservado &&
                        estilos.textoHorarioReservado,
                    ]}
                  >
                    {horario}
                  </Text>

                  {reservado && (
                    <Text
                      style={
                        estilos.textoReservado
                      }
                    >
                      Reservado
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          estilos.barra,
          {
            paddingBottom:
              insets.bottom + spacing.md,
          },
        ]}
      >
        <View style={estilos.precioGrupo}>
          <Text style={typography.secundario}>
            Precio por clase
          </Text>

          <Text style={estilos.precio}>
            {formatearPrecio(clase.precio)}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{
            disabled:
              !horarioSeleccionado ||
              horariosReservados.some(
                (reserva) =>
                  reserva.horario ===
                  horarioSeleccionado
              ),
          }}
          disabled={
            !horarioSeleccionado ||
            horariosReservados.some(
              (reserva) =>
                reserva.horario ===
                horarioSeleccionado
            )
          }
          onPress={manejarReserva}
          style={({ pressed }) => [
            estilos.botonReserva,

            (!horarioSeleccionado ||
              horariosReservados.some(
                (reserva) =>
                  reserva.horario ===
                  horarioSeleccionado
              )) &&
              estilos.botonDeshabilitado,

            pressed &&
              horarioSeleccionado &&
              !horariosReservados.some(
                (reserva) =>
                  reserva.horario ===
                  horarioSeleccionado
              ) &&
              estilos.botonPresionado,
          ]}
        >
          <Text style={estilos.textoBoton}>
            {horarioSeleccionado
              ? horariosReservados.some(
                  (reserva) =>
                    reserva.horario ===
                    horarioSeleccionado
                )
                ? 'Horario reservado'
                : 'Reservar clase'
              : 'Elige un horario'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

  portada: {
    width: '100%',
    backgroundColor: colors.primarioSuave,
  },

  encabezado: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  tituloGrupo: {
    gap: spacing.sm,
    alignItems: 'flex-start',
  },

  seccionTitulo: {
    ...typography.subtitulo,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },

  datos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },

  dato: {
    alignItems: 'center',
    gap: 2,
    minWidth: 72,
  },

  datoValor: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.texto,
  },

  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    padding: spacing.lg,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borde,
  },

  profesorNombre: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.texto,
  },

  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
    marginTop: spacing.sm,
  },

  horarios: {
    gap: spacing.sm,
  },

  horario: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
  },

  horarioSeleccionado: {
    borderColor: colors.primario,
    backgroundColor: colors.primarioSuave,
  },

  horarioReservado: {
    opacity: 0.65,
    backgroundColor: colors.fondo,
  },

  textoHorario: {
    ...typography.cuerpo,
    color: colors.texto,
    flex: 1,
  },

  textoHorarioSeleccionado: {
    color: colors.primarioOscuro,
    fontWeight: '700',
  },

  textoHorarioReservado: {
    color: colors.textoSuave,
    fontWeight: '700',
  },

  textoReservado: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.exito,
  },

  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },

  precioGrupo: {
    flex: 1,
    gap: 2,
  },

  precio: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primario,
  },

  botonReserva: {
    minHeight: 48,
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primario,
    borderRadius: radius.md,
  },

  botonDeshabilitado: {
    backgroundColor: colors.textoSuave,
  },

  botonPresionado: {
    backgroundColor: colors.primarioOscuro,
  },

  textoBoton: {
    color: colors.superficie,
    fontWeight: '700',
  },
});
