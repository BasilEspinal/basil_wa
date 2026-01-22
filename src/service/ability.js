import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
    //can('manage', 'all');
    can('Permiso 1', 'Permiso 2');

    cannot('delete', 'User');
});
