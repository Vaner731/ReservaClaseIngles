import React from 'react';
import { View, Text, StyleSheet,FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EstadoVacio from '../components/EstadoVacio';
import useReserva from '../hooks/useReserva';
import {colors, radius, spacing, typography} from '../theme';

export default function ReservasScreen() {
  const insets = useSafeAreaInsets();

  const {
    reservas,
    cargandoReservas,
  } = useReserva();

  const listaReservas = Array.isArray(reservas)
    ? reservas
    : [];

  if (cargandoReservas) {
    return (
      <View
        style={[
          styles.pantalla,
          {
            paddingTop:
              insets.top + spacing.lg,
          },
        ]}
      >
        <View style={styles.cargando}>
          <Text style={styles.cargandoTexto}>
            Cargando reservas...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.pantalla,
        {
          paddingTop:
            insets.top + spacing.lg,
        },
      ]}
    >
      <View style={styles.encabezado}>
        <View style={styles.icono}>
          <Ionicons
            name="calendar-outline"
            size={28}
            color={colors.primario}
          />
        </View>

        <View style={styles.encabezadoTexto}>
          <Text style={typography.titulo}>
            Mis Reservas
          </Text>

          <Text style={typography.secundario}>
            Clases que has reservado
          </Text>
        </View>
      </View>

      <FlatList
        data={listaReservas}
        keyExtractor={(item) =>
          String(item.claseId)
        }
        contentContainerStyle={
          listaReservas.length === 0
            ? styles.listaVacia
            : styles.lista
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <View style={styles.iconoTarjeta}>
              <Ionicons
                name="book-outline"
                size={22}
                color={colors.primario}
              />
            </View>

            <View style={styles.informacion}>
              <Text style={styles.tituloClase}>
                {item.claseTitulo}
              </Text>

              <View style={styles.fila}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={colors.textoSuave}
                />

                <Text style={styles.detalle}>
                  {item.horario}
                </Text>
              </View>

              <View style={styles.estado}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={colors.exito}
                />

                <Text style={styles.estadoTexto}>
                  Reserva confirmada
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EstadoVacio
            icono="calendar-outline"
            titulo="No tienes reservas"
            mensaje="Cuando reserves una clase aparecerá aquí."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  icono: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },

  encabezadoTexto: {
    flex: 1,
    gap: spacing.xs,
  },

  lista: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  listaVacia: {
    flexGrow: 1,
  },

  tarjeta: {
    flexDirection: 'row',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },

  iconoTarjeta: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },

  informacion: {
    flex: 1,
    gap: spacing.sm,
  },

  tituloClase: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.texto,
  },

  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  detalle: {
    flex: 1,
    fontSize: 13,
    color: colors.textoSuave,
  },

  estado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  estadoTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.exito,
  },

  cargando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cargandoTexto: {
    color: colors.texto,
    fontSize: 16,
    fontWeight: '600',
  },
});