import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, FlatList, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EstadoVacio from '../components/EstadoVacio';
import NivelChip from '../components/NivelChip';
import Card from '../components/Card';
import useResponsive from '../hooks/useResponsive';
import { colors, radius, spacing, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';

export default function ClasesScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { anchoTarjeta, paddingHorizontal, width } = useResponsive();
    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');
    const listaRef = useRef(null);

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincideTexto =
                textoBusqueda === '' ||
                clase.profesor.nombre.toLowerCase().includes(textoBusqueda) ||
                clase.titulo.toLowerCase().includes(textoBusqueda);
            return coincideNivel && coincideTexto;
        });
    }, [nivel, busqueda]);

    useEffect(() => {
        listaRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, [nivel, busqueda]);

const estilos = StyleSheet.create({
        pantalla: { flex: 1, backgroundColor: colors.fondo },
        encabezado: { paddingHorizontal, paddingBottom: spacing.md },
        filtros: {
            height: 64,
            flexGrow: 0,
            marginBottom: spacing.xl,
            marginTop: spacing.xs,
        },
        filtrosContenido: {
            paddingHorizontal,
            paddingVertical: spacing.sm,
            alignItems: 'center',
        },
        listaClases: { flex: 1 },
        tituloResponsive: { flexShrink: 1, lineHeight: 30 },
        tituloMovil: { fontSize: 21, lineHeight: 26 },

        buscador: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            backgroundColor: colors.superficie,
            borderRadius: radius.md,
            paddingHorizontal: spacing.lg,
            minHeight: 52,
            width: '100%',
            marginTop: spacing.md,
            borderWidth: 1,
            borderColor: colors.borde,
        },

        input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
    });

    return (
        <View style={[estilos.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <View style={estilos.encabezado}>
                                <Text
                                    style={[
                                        typography.titulo,
                                        estilos.tituloResponsive,
                                        width < 420 && estilos.tituloMovil,
                                    ]}
                                >
                                    Aplicacion para clases de ingles
                                </Text>
                <View style={estilos.buscador}>
                    <Ionicons name="search" size={20} color={colors.textoSuave} />
                    <TextInput
                        style={estilos.input}
                        placeholder="Buscar por nivel o profesor"
                        placeholderTextColor={colors.textoSuave}
                        value={busqueda}
                        onChangeText={setBusqueda}
                        autoCorrect={false}
                    />
                    {busqueda.length > 0 && (
                        <Pressable onPress={() => setBusqueda('')} hitSlop={8}>
                            <Ionicons name="close-circle" size={20} color={colors.textoSuave} />
                        </Pressable>
                    )}
                </View>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={estilos.filtros}
                contentContainerStyle={estilos.filtrosContenido}
            >
                {NIVELES.map((item) => (
                    <NivelChip
                        key={item}
                        etiqueta={item}
                        activo={item === nivel}
                        onPress={() => setNivel(item)}
                    />
                ))}
            </ScrollView>
            <FlatList
                ref={listaRef}
                style={estilos.listaClases}
                data={resultados}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={anchoTarjeta + spacing.lg}
                decelerationRate="fast"
                renderItem={({ item }) => (
                    <Card
                        clase={item}
                        style={{ width: anchoTarjeta, marginRight: spacing.lg }}
                        onPress={() => navigation.navigate('DetallesClase', { clase: item })}
                    />
                )}
                contentContainerStyle={{
                    paddingHorizontal,
                    paddingTop: spacing.sm,
                    paddingBottom: spacing.lg,
                    alignItems: 'flex-start',
                }}
                ListEmptyComponent={
                    <EstadoVacio
                        icono="search-outline"
                        titulo="No encontraramos resultados"
                        mensaje="La combinacion de busqueda no tiene resultados"
                        onAction={() => {
                            setNivel('Todos');
                            setBusqueda('');
                        }}
                    />
                }
            />
        </View>
    );
}

