# Bitácora del proyecto

## Diagnóstico previo

**Fecha:** 2026-10-06  
**Módulo:** Diagnóstico inicial de reservas y navegación  
**Archivo revisado:** `src/screens/ClasesScreen.js`

**Cambios realizados:** Ninguno.

**Problemas encontrados:**
- La navegación principal todavía no estaba organizada mediante tabs.
- No se habían implementado las pantallas de Perfil y Reservas.
- No se encontró un logo institucional entre los recursos existentes.
- Se observó un posible error de sintaxis en `src/hooks/useAlmacenamiento.js`; quedó pendiente de validación y corrección.

**Solución aplicada:** Ninguna; se esperaban indicaciones antes de modificar el proyecto.

**Resultado:** Pendiente.

## Commit 1 sugerido por la docente: agregar navegación principal por tabs

**Fecha:** 2026-10-06  
**Módulo:** Navegación principal  
**Objetivo:** Incorporar una navegación principal por pestañas para Inicio, Reservas y Perfil, manteniendo el acceso al stack de clases y sus detalles.

**Archivos modificados por el usuario:**
- `App.js`
- `src/navigation/TabsNavigator.js`

**Cambios documentados:**
- `App.js` monta `TabsNavigator` dentro de `NavigationContainer`.
- `ReservasProvider` sigue envolviendo la navegación de la aplicación.
- `TabsNavigator` declara las pestañas Inicio, Reservas y Perfil con iconos de casa, agenda y usuario.
- La pestaña Inicio conserva el flujo existente mediante `ClasesStack`.

**Resultado:** Parcial. La estructura de tabs está conectada, pero Reservas y Perfil todavía renderizan placeholders vacíos (`return null`); sus funciones requeridas quedan pendientes.

**Observaciones de Peer Review:**
- La composición conserva el Provider de reservas en el nivel de la aplicación y reutiliza el stack existente para Inicio.
- Los iconos y las etiquetas de las pestañas están definidos sin agregar dependencias.
- Los componentes placeholder están desacoplados, pero no presentan contenido ni funcionalidad de reservas o perfil.
- La implementación de tabs, por sí sola, no completa los flujos requeridos de registro, visualización de reservas ni logo institucional.
- No se ejecutaron pruebas ni se modificó código funcional en esta actualización de bitácora.

**Commit sugerido:** `feat: agregar navegación principal por tabs`

## Commit 2 sugerido por la docente: integrar pantalla de Perfil

**Fecha:** 2026-10-06  
**Módulo:** Perfil del estudiante  
**Objetivo:** Reemplazar el placeholder de Perfil por una pantalla visible dentro de la navegación por tabs, con información del estudiante y una acción visual de cierre de sesión.

**Archivos revisados:**
- `src/navigation/TabsNavigator.js`
- `src/screens/ProfileScreen.js`

**Cambios documentados:**
- La pestaña Perfil ya está conectada al componente `ProfileScreen`; dejó de renderizar el placeholder que tenía antes.
- `ProfileScreen.js` usa `StyleSheet` y contiene un formulario para nombre, apellido, teléfono, correo, cédula y nivel de inglés, además de una vista de resumen después de guardar los datos en estado local.

**Resultado:** Parcial. La pantalla Perfil está conectada y presenta el formulario y el resumen de datos, pero el perfil mostrado no persiste fuera del estado del componente.

**Observaciones de Peer Review:**
- En los archivos revisados no aparece `src/screens/PerfilScreen.js`; el archivo existente se llama `src/screens/ProfileScreen.js` y ese es el que importa la navegación.
- No se encontró un avatar ni un botón visual de cerrar sesión en el contenido actual de `ProfileScreen.js`; la descripción solicitada de esos elementos queda pendiente de confirmación o implementación.
- La pantalla solicita y muestra los datos del estudiante, pero usa estado local (`useState`); no se valida persistencia al salir o reiniciar la aplicación.
- `TabsNavigator.js` mantiene Reservas como placeholder; el flujo de consulta de reservas sigue pendiente.
- No se modificó código funcional ni se ejecutaron pruebas en esta actualización; el alcance fue únicamente documental.

**Commit sugerido:** `feat: integrar pantalla de perfil en navegación por tabs`

## Iteración: persistencia de perfil y reservas

**Fecha:** 2026-10-07
**Módulo:** Almacenamiento local, reservas y perfil

**Alcance de la conversación anexada:** Se registra únicamente el tramo señalado por el usuario, desde su indicación de trabajar como arquitecto senior hasta la solicitud de actualizar esta bitácora. Este apartado es un resumen de las solicitudes y del trabajo indicado, no una transcripción literal.

**Solicitudes registradas:**
- Trabajar con enfoque de arquitectura senior.
- Actualizar la bitácora sin eliminar las entradas anteriores.
- Documentar la creación de `storageKeys.js` y `storage.js`, y las modificaciones de `useAlmacenamiento`, `ReservasContext`, `useReserva` y `ProfileScreen`.

**Cambios documentados:**
- Se creó `src/constants/storageKeys.js` para centralizar las claves de almacenamiento del perfil y las reservas.
- Se creó `src/services/storage.js` con operaciones para leer, guardar y eliminar datos mediante AsyncStorage.
- Se modificó `src/hooks/useAlmacenamiento.js` para cargar y actualizar valores persistidos y exponer un estado de carga.
- Se modificó `src/context/ReservasContext.js` para persistir las reservas, exponerlas junto con su estado de carga y evitar reservas duplicadas para una misma clase.
- Se actualizó `src/hooks/useReserva.js` conservando la validación de que el hook se utilice dentro de `ReservasProvider`.
- Se actualizó `src/screens/ProfileScreen.js` para guardar y recuperar el perfil mediante el hook de almacenamiento y mostrar un estado mientras se carga.
- `App.js` también presenta un cambio de formato en la importación de navegación; no cambia su comportamiento.

**Resultado:** El perfil y las reservas quedaron conectados al almacenamiento local; la pantalla de Perfil muestra un estado de carga mientras recupera los datos. Esta actualización fue documental: no se modificó código funcional ni se ejecutaron pruebas.
