// src/service/auth/auth_service.js
import useData from '@/service/FetchData/FetchDataAPI.js';
import { useAbilityStore } from '@/stores/abilities';
import ability from '@/service/ability.js';
import { AbilityBuilder } from '@casl/ability';
import { useAppMovilService } from '@/service/appMovil/appMovilService';

const SESSION_KEYS = {
  token: 'accessSessionToken',
  user: 'accessSessionUser',
};

function setSession({ token, user }) {
  sessionStorage.setItem(SESSION_KEYS.token, token);
  sessionStorage.setItem(SESSION_KEYS.user, user);

  // Si quieres persistencia, deja esto. Si no, bórralo.
  localStorage.setItem(SESSION_KEYS.token, token);
  localStorage.setItem(SESSION_KEYS.user, user);
}

export function useAuthService() {
  const { postRequest } = useData();
  const abilityStore = useAbilityStore();
  const appMovil = useAppMovilService();

  const error = (e) => ({ ok: false, error: e, data: null });

  const login = async ({ email, password }) => {
    try {
      // 1) Login
      const resp = await postRequest('/login', { email, password });

      // 2) Normaliza respuesta según tu Login actual
      const payload = resp?.data?.data;

      if (!resp?.ok) return error(resp?.error || 'Login failed');
      if (!payload) return error('Respuesta vacía del servidor');
      if (payload?.error) return error(payload.error);
      if (!payload?.user) return error('Usuario no encontrado en la respuesta');
      if (!payload?.token) return error('Token no encontrado en la respuesta');

      const token = payload.token;
      const user = payload.user?.name ?? payload.user?.email ?? 'user';

      // 3) Guardar sesión (1 solo lugar)
      setSession({ token, user });

      // 4) Refrescar estado reactivo que depende de sessionStorage
      await appMovil.refreshSessionState?.();

      // 5) Permisos (CASL)
      await abilityStore.fetchAbilities();
      const abilities = abilityStore.getAbilities;

      const { can, rules } = new AbilityBuilder();
      abilities.forEach(({ action, subject }) => can(action, subject));
      ability.update(rules);

      return { ok: true, data: payload };
    } catch (e) {
      return error(e?.message || e);
    }
  };

  return { login };
}
