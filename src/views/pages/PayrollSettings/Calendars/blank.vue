
<template>
    <div>
    <small id="username-help" :class="{ 'p-invalid text-red-500': errorsNew['farm']|| errorResponseAPI?.errors?.farm }">
    {{ errorsNew.farm || errorResponseAPI?.errors?.farm}}
</small>

<small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.farm }">
    <div v-if="errorResponseAPI?.errors?.farm">
        <div v-for="(error, index) in errorResponseAPI?.errors?.farm" :key="index">
            {{ error }}
        </div>
    </div>
</small>
</div>
</template>