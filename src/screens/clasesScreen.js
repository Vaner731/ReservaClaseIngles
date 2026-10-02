import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import { colors, radius, spacing, typography } from '../theme';

export default function DetallesClase({ route, navigation }) {
  const { clase } = route.params || {};
  const { esTablet } = useResponsive();
  const insets = useSafeAreaInsets();

  if (!clase) {
    return (
      <View style={estilos.cargando}>
        <Text style={estilos.cargandoTexto}>No se encontró la clase.</Text>
      </View>
    );
  }

  const [cuposDisponibles, setCuposDisponibles] = useState(clase.cupos);
  const [horariosReservados, setHorariosReservados] = useState([]);

  const gestionarReserva = (horario) => {
    if (horariosReservados.includes(horario)) {
      setCuposDisponibles(cuposDisponibles + 1);
      setHorariosReservados((actuales) => actuales.filter((item) => item !== horario));
      Alert.alert(
        'Reserva Cancelada',
        `La reserva de ${horario} fue cancelada.`
      );
      return;
    }
    if (cuposDisponibles <= 0) {
      Alert.alert(
        'Sin Cupos',
        'No hay cupos disponibles.'
      );
      return;
    }
    setCuposDisponibles(
      cuposDisponibles - 1
    );
    setHorariosReservados((actuales) => [...actuales, horario]);
    Alert.alert(
      'Reserva Activa',
      `Reserva realizada para ${horario}.`
    );
  };

  return (
    <View style={estilos.pantalla}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: clase.imagen }}
          resizeMode="cover"
          style={[estilos.portada, { height: esTablet ? 260 : 175 }]}
        />

        <View style={estilos.contenido}>
          <Text style={estilos.datoTexto}>Cupos disponibles: {cuposDisponibles}</Text>
          <Text style={estilos.tituloSeccion}>Horarios disponibles</Text>
          <View style={estilos.listaHorarios}>
            {clase.horarios.map((horario, index) => (
              <Pressable
                key={index}
                onPress={() => gestionarReserva(horario)}
                style={[estilos.horarioItem, horariosReservados.includes(horario) && estilos.horarioActivo]}
              >
                <Ionicons name="time-outline" size={18} color={colors.primario} />
                <Text style={estilos.horarioTexto}>{horario}</Text>
                <Ionicons
                  name={horariosReservados.includes(horario) ? 'checkmark-circle' : 'chevron-forward'}
                  size={20}
                  color={horariosReservados.includes(horario) ? colors.exito : colors.textoSuave}
                />
              </Pressable>
            ))}
          </View>
          <View style={estilos.profesor}>
            <Image
              source={{ uri: clase.profesor.foto }}
              style={estilos.avatar}
            />
            <View>
              <Text style={estilos.profesorNombre}>
                {clase.profesor.nombre}
              </Text>
              <Text>
                {clase.profesor.pais}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Pressable style={[estilos.botonAtras, { top: insets.top + spacing.sm }]} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={colors.texto} />
      </Pressable>
      <View style={[estilos.barra, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={[estilos.estadoReserva, horariosReservados.length > 0 && estilos.estadoActivo]}>
          <View style={[estilos.puntoEstado, horariosReservados.length > 0 && estilos.puntoActivo]} />
          <Text style={estilos.precio}>
            {horariosReservados.length > 0 ? `${horariosReservados.length} reserva${horariosReservados.length > 1 ? 's' : ''} activa${horariosReservados.length > 1 ? 's' : ''}` : 'Disponible'}
          </Text>
        </View>
        <Text style={estilos.instruccionReserva}>
          {horariosReservados.length > 0 ? 'Toca cualquier horario para reservar o cancelar' : 'Toca un horario para reservar'}
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  contenido: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg, gap: spacing.md },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  tituloSeccion: { fontSize: 17, fontWeight: '800', color: colors.texto, marginTop: spacing.sm },
  listaHorarios: { gap: spacing.sm },
  horarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  horarioActivo: { backgroundColor: colors.primarioSuave, borderWidth: 1, borderColor: colors.primario },
  horarioTexto: { flex: 1, color: colors.texto, fontSize: 14, fontWeight: '600' },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    shadowColor: '#0F172A',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  estadoReserva: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  estadoActivo: { backgroundColor: colors.primarioSuave, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  puntoEstado: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.exito },
  puntoActivo: { backgroundColor: colors.primario },
  precio: { fontSize: 15, fontWeight: '800', color: colors.primario, textAlign: 'center' },
  datoTexto: { marginTop: spacing.lg, color: colors.texto, fontSize: 15 },
  botonAtras: {
    position: 'absolute',
    left: spacing.lg,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.superficie,
  },
  instruccionReserva: { color: colors.textoSuave, fontSize: 12, textAlign: 'center' },
});
