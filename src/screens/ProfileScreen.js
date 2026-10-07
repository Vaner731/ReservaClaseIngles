import React, { useState } from 'react';
import {View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAlmacenamiento from '../hooks/useAlmacenamiento';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { colors, radius, spacing, typography } from '../theme';

const PERFIL_INICIAL = {
  nombre: '',
  apellido: '',
  telefono: '',
  correo: '',
  cc: '',
  nivelIngles: '',
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [
    perfil,
    guardarPerfilStorage,
    cargandoPerfil,
  ] = useAlmacenamiento(
    STORAGE_KEYS.PERFIL,
    null
  );

  const [formulario, setFormulario] = useState(PERFIL_INICIAL);

  const actualizarCampo = (campo, valor) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  };

  const guardarPerfil = () => {
    const datos = {
      nombre: formulario.nombre.trim(),
      apellido: formulario.apellido.trim(),
      telefono: formulario.telefono.trim(),
      correo: formulario.correo.trim(),
      cc: formulario.cc.trim(),
      nivelIngles: formulario.nivelIngles.trim(),
    };

    const camposVacios = Object.values(datos).some(
      (valor) => valor === ''
    );

    if (camposVacios) {
      Alert.alert(
        'Perfil incompleto',
        'Debe completar todos los campos.'
      );
      return;
    }

    guardarPerfilStorage(datos);
  };

  if (cargandoPerfil) {
    return (
      <View style={styles.pantalla}>
        <View style={styles.cargando}>
          <Text style={styles.cargandoTexto}>
            Cargando perfil...
          </Text>
        </View>
      </View>
    );
  }

  if (perfil) {
    return (
      <View
        style={[
          styles.pantalla,
          {
            paddingTop: insets.top + spacing.lg,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.contenido}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.encabezado}>
            <View style={styles.iconoEncabezado}>
              <Ionicons
                name="person"
                size={28}
                color={colors.primario}
              />
            </View>

            <View style={styles.encabezadoTexto}>
              <Text style={typography.titulo}>
                Mi Perfil
              </Text>

              <Text style={typography.secundario}>
                Información del estudiante
              </Text>
            </View>
          </View>

          <View style={styles.tarjeta}>
            <View style={styles.fila}>
              <Text style={styles.etiqueta}>Nombre</Text>
              <Text style={styles.valor}>{perfil.nombre}</Text>
            </View>

            <View style={styles.fila}>
              <Text style={styles.etiqueta}>Apellido</Text>
              <Text style={styles.valor}>{perfil.apellido}</Text>
            </View>

            <View style={styles.fila}>
              <Text style={styles.etiqueta}>Teléfono</Text>
              <Text style={styles.valor}>{perfil.telefono}</Text>
            </View>

            <View style={styles.fila}>
              <Text style={styles.etiqueta}>Correo</Text>
              <Text style={styles.valor}>{perfil.correo}</Text>
            </View>

            <View style={styles.fila}>
              <Text style={styles.etiqueta}>CC</Text>
              <Text style={styles.valor}>{perfil.cc}</Text>
            </View>

            <View style={styles.fila}>
              <Text style={styles.etiqueta}>
                Nivel de inglés
              </Text>

              <Text style={styles.valor}>
                {perfil.nivelIngles}
              </Text>
            </View>
          </View>

          <View style={styles.aviso}>
            <Ionicons
              name="checkmark-circle"
              size={22}
              color={colors.exito}
            />

            <Text style={styles.avisoTexto}>
              Tu perfil ya está registrado. El formulario de
              registro está desactivado.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.pantalla,
        {
          paddingTop: insets.top + spacing.lg,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.encabezado}>
          <View style={styles.iconoEncabezado}>
            <Ionicons
              name="person-outline"
              size={28}
              color={colors.primario}
            />
          </View>

          <View style={styles.encabezadoTexto}>
            <Text style={typography.titulo}>
              Mi Perfil
            </Text>

            <Text style={typography.secundario}>
              Registra tus datos para reservar clases
            </Text>
          </View>
        </View>

        <View style={styles.formulario}>
          <Campo
            etiqueta="Nombre"
            valor={formulario.nombre}
            onChangeText={(valor) =>
              actualizarCampo('nombre', valor)
            }
            placeholder="Ingresa tu nombre"
          />

          <Campo
            etiqueta="Apellido"
            valor={formulario.apellido}
            onChangeText={(valor) =>
              actualizarCampo('apellido', valor)
            }
            placeholder="Ingresa tu apellido"
          />

          <Campo
            etiqueta="Teléfono"
            valor={formulario.telefono}
            onChangeText={(valor) =>
              actualizarCampo('telefono', valor)
            }
            placeholder="Ingresa tu teléfono"
            keyboardType="phone-pad"
          />

          <Campo
            etiqueta="Correo"
            valor={formulario.correo}
            onChangeText={(valor) =>
              actualizarCampo('correo', valor)
            }
            placeholder="Ingresa tu correo"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Campo
            etiqueta="CC"
            valor={formulario.cc}
            onChangeText={(valor) =>
              actualizarCampo('cc', valor)
            }
            placeholder="Ingresa tu número de documento"
            keyboardType="numeric"
          />

          <Campo
            etiqueta="Nivel de inglés"
            valor={formulario.nivelIngles}
            onChangeText={(valor) =>
              actualizarCampo('nivelIngles', valor)
            }
            placeholder="Ej. Básico, Intermedio, Avanzado"
          />

          <Pressable
            onPress={guardarPerfil}
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
            ]}
          >
            <Ionicons
              name="save-outline"
              size={20}
              color={colors.superficie}
            />

            <Text style={styles.textoBoton}>
              Guardar perfil
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function Campo({
  etiqueta,
  valor,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{etiqueta}</Text>

      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textoSuave}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
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

  contenido: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },

  iconoEncabezado: {
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

  formulario: {
    gap: spacing.md,
  },

  campo: {
    gap: spacing.xs,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.texto,
  },

  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    backgroundColor: colors.superficie,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.texto,
  },

  boton: {
    minHeight: 50,
    marginTop: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primario,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },

  botonPresionado: {
    backgroundColor: colors.primarioOscuro,
  },

  textoBoton: {
    color: colors.superficie,
    fontSize: 15,
    fontWeight: '700',
  },

  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.lg,
  },

  fila: {
    gap: spacing.xs,
  },

  etiqueta: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textoSuave,
  },

  valor: {
    fontSize: 16,
    color: colors.texto,
    fontWeight: '600',
  },

  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },

  avisoTexto: {
    flex: 1,
    color: colors.textoSuave,
    lineHeight: 20,
  },
});
