<script setup>
import { onMounted, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const applyDynamicTheme = async () => {
    const primaryColor = import.meta.env.VITE_APP_PRIMARY_COLOR;
    const darkPrimaryColor = import.meta.env.VITE_APP_DARK_PRIMARY_COLOR;
    
    // Palette Colors
    const successColor = import.meta.env.VITE_APP_SUCCESS_COLOR;
    const warnColor = import.meta.env.VITE_APP_WARN_COLOR;
    const dangerColor = import.meta.env.VITE_APP_DANGER_COLOR;
    const helpColor = import.meta.env.VITE_APP_HELP_COLOR;
    const darkSurfaceColor = import.meta.env.VITE_APP_DARK_SURFACE_COLOR;

    const isDark = layoutConfig.darkTheme.value;
    
    // Choose color based on current theme mode
    const colorToApply = (isDark && darkPrimaryColor) 
        ? darkPrimaryColor 
        : primaryColor;

    console.log('Applying Dynamic Theme. DarkMode:', isDark, 'Primary:', colorToApply);

    const themeLink = document.getElementById('theme-css');
    if (themeLink) {
        const themeUrl = themeLink.getAttribute('href');
        try {
            const response = await fetch(themeUrl);
            if (response.ok) {
                let cssText = await response.text();
                
                // 1. Primary Color Replacement (Base Teal #14B8A6)
                if (colorToApply) {
                    // Replace the exact hex and variations if possible, simplified for now
                    cssText = cssText.replace(/#14B8A6/gi, colorToApply);
                }

                // 2. Palette Replacements (Standard Lara Theme Hexes)
                if (successColor) cssText = cssText.replace(/#22c55e/gi, successColor); // Green-500
                if (warnColor) cssText = cssText.replace(/#f97316/gi, warnColor);       // Orange-500
                if (dangerColor) cssText = cssText.replace(/#ff3d32/gi, dangerColor);   // Red-500
                if (helpColor) cssText = cssText.replace(/#a855f7/gi, helpColor);       // Purple-500

                // 3. Dark Mode Surface Replacement
                // The dark theme uses #426948 (dark green) for surface-ground
                if (isDark && darkSurfaceColor) {
                    cssText = cssText.replace(/#426948/gi, darkSurfaceColor);
                }

                // Remove existing dynamic style if any
                const existingStyle = document.getElementById('dynamic-theme-style');
                if (existingStyle) {
                    existingStyle.remove();
                }

                const style = document.createElement('style');
                style.id = 'dynamic-theme-style';
                style.textContent = cssText;
                document.head.appendChild(style);
            }
        } catch (e) {
            console.error('Error applying dynamic theme:', e);
        }
    }
};

onMounted(() => {
    applyDynamicTheme();
});

// Watch for theme changes (e.g. switching between light and dark mode)
watch(() => layoutConfig.theme.value, () => {
    // Wait a brief moment for the link tag to update its href if handled by layout.js
    // or just re-fetch the new theme content.
    setTimeout(applyDynamicTheme, 100); 
});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
