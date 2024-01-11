// permissions.js

import { ref, onMounted, provide } from 'vue';
import { useAbility } from '@casl/vue';

const ability = useAbility();
const permissions = ref([]);

export const initPermissions = async () => {
  try {
    // Simular una llamada a la API para obtener permisos
    // Reemplaza esto con tu lógica de llamada a la API real
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Aquí, deberías obtener tus permisos de la API
    const data = ['read:posts', 'create:posts'];

    permissions.value = data;

    // Actualizar la capacidad de CASL con los permisos obtenidos
    updateAbility();
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
  }
};

export const updateAbility = () => {
  // Limpiar los permisos existentes y agregar nuevos
  ability.update(defineAbilitiesFor(permissions.value));
};

export const defineAbilitiesFor = (permissions) => {
  // Definir habilidades basadas en los permisos obtenidos
  const { can, rules } = ability;

  // Ejemplo: Conceder permisos según el array obtenido
  for (const permission of permissions) {
    if (permission === 'read:posts') {
      can('read', 'Post');
    } else if (permission === 'create:posts') {
      can('create', 'Post');
    }
    // Agregar más condiciones según tu estructura de permisos
  }

  return rules;
};

export const hasPermission = (action, subject) => {
  return ability.can(action, subject);
};

// Proporcionar la instancia de Ability para los componentes que usen este módulo
provide('ability', ability);

// Obtener los permisos al inicializar la aplicación
onMounted(() => {
  initPermissions();
});
