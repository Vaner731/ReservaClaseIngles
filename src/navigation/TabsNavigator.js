import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ClasesStack from './ClasesStack';
import { colors } from '../theme';

function ReservasPlaceholder() {
  return null;
}

function PerfilPlaceholder() {
  return null;
}

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primario,
        tabBarInactiveTintColor: colors.textoSuave,
        tabBarStyle: {
          backgroundColor: colors.superficie,
          borderTopColor: colors.borde,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let nombreIcono = 'home-outline';

          if (route.name === 'Reservas') {
            nombreIcono = focused
              ? 'calendar'
              : 'calendar-outline';
          }

          if (route.name === 'Perfil') {
            nombreIcono = focused
              ? 'person'
              : 'person-outline';
          }

          if (route.name === 'Inicio') {
            nombreIcono = focused
              ? 'home'
              : 'home-outline';
          }

          return (
            <Ionicons
              name={nombreIcono}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={ClasesStack}
      />

      <Tab.Screen
        name="Reservas"
        component={ReservasPlaceholder}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilPlaceholder}
      />
    </Tab.Navigator>
  );
}