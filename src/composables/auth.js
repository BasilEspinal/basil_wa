import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { AbilityBuilder, Ability } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';

const user = ref({
    name: '',
    email: ''
});

export default function useAuth() {
    const processing = ref(false);
    const validationErrors = ref({});
    const router = useRouter();
    const ability = inject(ABILITY_TOKEN);
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false
    });

    const submitLogin = async () => {
        if (processing.value) return;

        processing.value = true;
        validationErrors.value = {};

        fetch('/api/v1/login', loginForm)
            .then(async (response) => response.json())
            .then(async (data) => {
                
                user.value.name = data.data.name;
                user.value.email = data.data.email;
                loginUser(data);
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (processing.value = false));
    };

    const loginUser = async (response) => {
        user.value.name = response.data.name;
        user.value.email = response.data.email;

        localStorage.setItem('loggedIn', JSON.stringify(true));
        await getAbilities();
        await router.push({ name: 'dashboard' });
    };

    const getUser = () => {
        fetch('/api/v1/user')
            .then((response) => response.json())
            .then((data) => {
                loginUser(data);
            });
    };

    const getAbilities = async () => {
        fetch('/api/v1/abilities')
            .then((response) => response.json())
            .then((data) => {
                const permissions = data.data;
                const { can, rules } = new AbilityBuilder(Ability);

                can(permissions);

                ability.update(rules);
            });
    };

    return {
        loginForm,
        validationErrors,
        processing,
        submitLogin,
        user,
        getUser,
        getAbilities
    };
}
