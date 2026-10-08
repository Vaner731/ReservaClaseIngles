import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert} from 'react-native';
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

  const [perfil, guardarPerfilStorage, cargandoPerfil] =
    useAlmacenamiento(STORAGE_KEYS.PERFIL, null);

  const [formulario, setFormulario] = useState(PERFIL_INICIAL);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const actualizarCampo = (campo, valor) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  };

  const guardarPerfil = async () => {
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
      console.log(
        'Registro rechazado: hay campos vacíos.'
      );

      Alert.alert(
        'Perfil incompleto',
        'Debe completar todos los campos.'
      );
      return;
    }

    // Evitar registrar exactamente los mismos datos.
    if (
      perfil &&
      Object.keys(datos).every(
        (campo) => datos[campo] === perfil[campo]
      )
    ) {
      console.log(
        'Registro rechazado: este usuario ya está registrado.'
      );

      Alert.alert(
        'Usuario ya registrado',
        'Los datos ingresados son iguales a los del perfil guardado.'
      );
      return;
    }

    try {
      await guardarPerfilStorage(datos);

      console.log(
        'Perfil guardado correctamente:',
        datos
      );

      setFormulario(PERFIL_INICIAL);
      setMostrarFormulario(false);

      Alert.alert(
        'Registro exitoso',
        'El perfil se guardó correctamente.'
      );
    } catch (error) {
      console.log(
        'Error al guardar el perfil:',
        error
      );

      Alert.alert(
        'Error',
        'No fue posible guardar el perfil.'
      );
    }
  };

  const registrarOtroUsuario = () => {
    console.log(
      'Se abrió el formulario para registrar otro usuario.'
    );

    setFormulario(PERFIL_INICIAL);
    setMostrarFormulario(true);
  };

  const cancelarRegistro = () => {
    console.log('Se canceló el registro del usuario.');

    setFormulario(PERFIL_INICIAL);
    setMostrarFormulario(false);
  };

  if (cargandoPerfil) {
    return (
      <View
        style={[
          styles.cargando,
          { paddingTop: insets.top },
        ]}
      >
        <Text style={styles.cargandoTexto}>
          Cargando perfil...
        </Text>
      </View>
    );
  }

  // Mostrar los datos del perfil guardado.
  if (perfil && !mostrarFormulario) {
    return (
      <ScrollView
        style={styles.pantalla}
        contentContainerStyle={[
          styles.contenido,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.xxl,
          },
        ]}
      >
        <View style={styles.encabezado}>
          <Ionicons
            name="person-circle-outline"
            size={64}
            color={colors.primario}
          />

          <Text style={styles.titulo}>
            Mi perfil
          </Text>

          <Text style={styles.subtitulo}>
            Estos son los datos del usuario registrado.
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <DatoPerfil
            etiqueta="Nombre"
            valor={perfil.nombre}
          />

          <DatoPerfil
            etiqueta="Apellido"
            valor={perfil.apellido}
          />

          <DatoPerfil
            etiqueta="Teléfono"
            valor={perfil.telefono}
          />

          <DatoPerfil
            etiqueta="Correo electrónico"
            valor={perfil.correo}
          />

          <DatoPerfil
            etiqueta="Cédula"
            valor={perfil.cc}
          />

          <DatoPerfil
            etiqueta="Nivel de inglés"
            valor={perfil.nivelIngles}
          />
        </View>

        <Pressable
          style={styles.botonPrincipal}
          onPress={registrarOtroUsuario}
        >
          <Ionicons
            name="person-add-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.textoBotonPrincipal}>
            Registrar otro usuario
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  // Mostrar el formulario para el primer registro
  // o para intentar registrar otro usuario.
  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={[
        styles.contenido,
        {
          paddingTop: insets.top + spacing.lg,
          paddingBottom: insets.bottom + spacing.xxl,
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.encabezado}>
        <Ionicons
          name="person-circle-outline"
          size={64}
          color={colors.primario}
        />

        <Text style={styles.titulo}>
          {perfil ? 'Registrar otro usuario' : 'Crear perfil'}
        </Text>

        <Text style={styles.subtitulo}>
          Complete todos los campos para guardar el perfil.
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Campo
          etiqueta="Nombre"
          valor={formulario.nombre}
          onChangeText={(valor) =>
            actualizarCampo('nombre', valor)
          }
          placeholder="Ingrese su nombre"
          autoCapitalize="words"
        />

        <Campo
          etiqueta="Apellido"
          valor={formulario.apellido}
          onChangeText={(valor) =>
            actualizarCampo('apellido', valor)
          }
          placeholder="Ingrese su apellido"
          autoCapitalize="words"
        />

        <Campo
          etiqueta="Teléfono"
          valor={formulario.telefono}
          onChangeText={(valor) =>
            actualizarCampo('telefono', valor)
          }
          placeholder="Ingrese su teléfono"
          keyboardType="phone-pad"
        />

        <Campo
          etiqueta="Correo electrónico"
          valor={formulario.correo}
          onChangeText={(valor) =>
            actualizarCampo('correo', valor)
          }
          placeholder="Ingrese su correo"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Campo
          etiqueta="Cédula"
          valor={formulario.cc}
          onChangeText={(valor) =>
            actualizarCampo('cc', valor)
          }
          placeholder="Ingrese su cédula"
          keyboardType="numeric"
        />

        <Campo
          etiqueta="Nivel de inglés"
          valor={formulario.nivelIngles}
          onChangeText={(valor) =>
            actualizarCampo('nivelIngles', valor)
          }
          placeholder="Ej. A1, A2, B1, B2"
          autoCapitalize="characters"
        />

        <Pressable
          style={styles.botonPrincipal}
          onPress={guardarPerfil}
        >
          <Ionicons
            name="save-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.textoBotonPrincipal}>
            Guardar perfil
          </Text>
        </Pressable>

        {perfil && (
          <Pressable
            style={styles.botonSecundario}
            onPress={cancelarRegistro}
          >
            <Text style={styles.textoBotonSecundario}>
              Cancelar
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

function Campo({
  etiqueta,
  valor,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.etiqueta}>
        {etiqueta}
      </Text>

      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={colors.textoSecundario}
      />
    </View>
  );
}

function DatoPerfil({ etiqueta, valor }) {
  return (
    <View style={styles.dato}>
      <Text style={styles.etiquetaDato}>
        {etiqueta}
      </Text>

      <Text style={styles.valorDato}>
        {valor || 'No registrado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

  contenido: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  encabezado: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  titulo: {
    ...typography.titulo,
    color: colors.texto,
    textAlign: 'center',
    marginTop: spacing.sm,
  },

  subtitulo: {
    ...typography.texto,
    color: colors.textoSecundario,
    textAlign: 'center',
    marginTop: spacing.xs,
  },

  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  campo: {
    marginBottom: spacing.md,
  },

  etiqueta: {
    ...typography.texto,
    color: colors.texto,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.texto,
    backgroundColor: colors.fondo,
    fontSize: 16,
  },

  dato: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borde,
  },

  etiquetaDato: {
    ...typography.texto,
    color: colors.textoSecundario,
    marginBottom: spacing.xs,
  },

  valorDato: {
    ...typography.texto,
    color: colors.texto,
    fontWeight: '600',
  },

  botonPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },

  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  botonSecundario: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  textoBotonSecundario: {
    color: colors.texto,
    fontSize: 16,
    fontWeight: '600',
  },

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo,
  },

  cargandoTexto: {
    fontSize: 16,
    color: colors.texto,
    fontWeight: '600',
  },
});

