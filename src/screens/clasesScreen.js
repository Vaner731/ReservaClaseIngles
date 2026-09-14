import React, {useState} from "react";
import {View,Text,Image,Pressable,StyleSheet,TextInput,ScrollView,} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import EtiquetaNivel from "../components/EtiquetaNivel";
import NivelChip from "../components/NivelChip";
import { colors, radius, spacing, typography } from "../theme/index";
import { formatearPrecio, CLASES, NIVELES } from "../data/clases";
 
export default function ClasesScreen({ navigation }) {
  const [nivel, setNivel] = useState();
  const [busqueda, setBusqueda] = useState("");
 
  return (
    <View style={[style.pantalla, { paddingTop: insets.top + spacing.md }]}> 
      <View>
        <Text>Aplicacion para clases de ingles</Text>
        <Ionicons name="search" size={18} color={colors.textoSuave} />
        <TextInput />
        placeholder="Buscar por nivel" value = {nivel}
        onChangeText={setbusqueda}
        autoCorrect={false}
        {busqueda.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.textoSuave}
            onPress={() => setBusqueda("")}
          />
        )}
      </View>
      <ScrollView style={{ flexGrow: 0 }} horizontal>
        {NIVELES.map((item) => (
          <NivelChip
            etiqueta={item}
            activo={item}
            onPress={() => setNivel(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
 
 const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});