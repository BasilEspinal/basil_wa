import { defineAbility } from '@casl/ability';
import elementosVista from './permissionsMenuTmp';

export default defineAbility((can, cannot) => {
    //can('manage', 'all');
    elementosVista.forEach((elemento) => {
        can('ver', elemento);
    });
    can('Permiso 1', 'Permiso 2');

    cannot('delete', 'User');
});
