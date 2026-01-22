<script setup>
import { onMounted, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const applyDynamicTheme = () => {
    // 1. Get Environment Variables
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
    const colorToApply = (isDark && darkPrimaryColor) ? darkPrimaryColor : primaryColor;

    // 2. Prepare CSS Variables Override Block
    // We do NOT fetch the external CSS file. We simply inject a style block that overrides the :root variables.
    // CSS cascading rules ensure these take precedence if loaded after, or we can use !important to be safe.
    
    // Surfaces Logic
    const surfaces = {
        ground: import.meta.env[isDark ? 'VITE_APP_SURFACE_GROUND_DARK' : 'VITE_APP_SURFACE_GROUND_LIGHT'],
        card: import.meta.env[isDark ? 'VITE_APP_SURFACE_CARD_DARK' : 'VITE_APP_SURFACE_CARD_LIGHT'],
        overlay: import.meta.env[isDark ? 'VITE_APP_SURFACE_OVERLAY_DARK' : 'VITE_APP_SURFACE_OVERLAY_LIGHT'],
        border: import.meta.env[isDark ? 'VITE_APP_SURFACE_BORDER_DARK' : 'VITE_APP_SURFACE_BORDER_LIGHT'],
        textPrimary: import.meta.env[isDark ? 'VITE_APP_TEXT_COLOR_DARK' : 'VITE_APP_TEXT_COLOR_LIGHT'],
        textSecondary: import.meta.env[isDark ? 'VITE_APP_TEXT_COLOR_SECONDARY_DARK' : 'VITE_APP_TEXT_COLOR_SECONDARY_LIGHT'],
        primaryText: import.meta.env[isDark ? 'VITE_APP_PRIMARY_COLOR_TEXT_DARK' : 'VITE_APP_PRIMARY_COLOR_TEXT_LIGHT'],
    };

    // Highlight Logic
    const highlightColorLight = import.meta.env.VITE_APP_HIGHLIGHT_COLOR_LIGHT;
    const highlightColorDark = import.meta.env.VITE_APP_HIGHLIGHT_COLOR_DARK;
    const highlightColor = isDark ? highlightColorDark : highlightColorLight;
    
    // Table Logic
    const tableHeaderBg = isDark ? import.meta.env.VITE_APP_TABLE_HEADER_BG_DARK : import.meta.env.VITE_APP_TABLE_HEADER_BG_LIGHT;
    const tableFooterBg = isDark ? import.meta.env.VITE_APP_TABLE_FOOTER_BG_DARK : import.meta.env.VITE_APP_TABLE_FOOTER_BG_LIGHT;

    let cssVariablesOverride = `
        :root {
            /* Primary Color Overrides */
            ${colorToApply ? `--primary-color: ${colorToApply} !important;` : ''}
    `;

    // Palette Overrides
    if (successColor) {
        cssVariablesOverride += ` --green-500: ${successColor} !important;`;
        cssVariablesOverride += ` --paleta-success: ${successColor} !important;`;
    }
    if (warnColor) cssVariablesOverride += ` --orange-500: ${warnColor} !important;`;
    if (dangerColor) cssVariablesOverride += ` --red-500: ${dangerColor} !important;`;
    if (helpColor) cssVariablesOverride += ` --purple-500: ${helpColor} !important;`;
    
    // Surface Overrides
    if (surfaces.ground) cssVariablesOverride += ` --surface-ground: ${surfaces.ground} !important;`;
    if (surfaces.card) cssVariablesOverride += ` --surface-card: ${surfaces.card} !important;`;
    if (surfaces.overlay) cssVariablesOverride += ` --surface-overlay: ${surfaces.overlay} !important;`;
    if (surfaces.border) cssVariablesOverride += ` --surface-border: ${surfaces.border} !important;`;
    if (surfaces.textPrimary) cssVariablesOverride += ` --text-color: ${surfaces.textPrimary} !important;`;
    if (surfaces.textSecondary) cssVariablesOverride += ` --text-color-secondary: ${surfaces.textSecondary} !important;`;
    if (surfaces.primaryText) cssVariablesOverride += ` --primary-color-text: ${surfaces.primaryText} !important;`;

    // Dark Mode Specific Patches for "Green/Blue" residuals from base theme
    if (isDark) {
         if (darkSurfaceColor) cssVariablesOverride += ` --paleta-050: ${darkSurfaceColor} !important;`; // Used in headers/footers
         // Patch dark blue surfaces to neutral
         cssVariablesOverride += `
             --surface-a: #121212 !important;
             --surface-b: #09090b !important; 
             --blue-900: #18181b !important;
         `;
    }

    // Highlight & Palette Generation
    if (highlightColor) {
        cssVariablesOverride += ` --highlight-bg: ${highlightColor}CC !important;`;
        cssVariablesOverride += ` --focus-ring: 0 0 0 0.2rem ${highlightColor}66 !important;`; 
    }
    
    // Palette 50-900 Generation using color-mix (Browser Native)
    if (colorToApply) {
        cssVariablesOverride += `
            --primary-50: color-mix(in srgb, var(--primary-color), white 90%) !important;
            --primary-100: color-mix(in srgb, var(--primary-color), white 80%) !important;
            --primary-200: color-mix(in srgb, var(--primary-color), white 60%) !important;
            --primary-300: color-mix(in srgb, var(--primary-color), white 40%) !important;
            --primary-400: color-mix(in srgb, var(--primary-color), white 20%) !important;
            --primary-500: var(--primary-color) !important;
            --primary-600: color-mix(in srgb, var(--primary-color), black 10%) !important;
            --primary-700: color-mix(in srgb, var(--primary-color), black 20%) !important;
            --primary-800: color-mix(in srgb, var(--primary-color), black 30%) !important;
            --primary-900: color-mix(in srgb, var(--primary-color), black 40%) !important;
            
            /* Aggressive Palette Overrides */
            --green-500: var(--primary-color) !important;
            --blue-500: var(--primary-color) !important;
            
            /* Teal-specific variables (Basil theme) */
            --paleta-040: var(--surface-card) !important;
            --paleta-050: var(--surface-ground) !important;
            --paleta-100: color-mix(in srgb, var(--primary-color), white 80%) !important;
            --paleta-200: color-mix(in srgb, var(--primary-color), white 60%) !important;
            --paleta-300: color-mix(in srgb, var(--primary-color), white 40%) !important;
            --paleta-400: var(--primary-color) !important;
            --paleta-500: color-mix(in srgb, var(--primary-color), white 20%) !important;
            
            /* Broad Green/Teal resets for any other theme defaults */
            --teal-500: var(--primary-color) !important;
            --teal-400: color-mix(in srgb, var(--primary-color), white 20%) !important;
            --teal-300: color-mix(in srgb, var(--primary-color), white 40%) !important;
            --teal-200: color-mix(in srgb, var(--primary-color), white 60%) !important;
            --teal-100: color-mix(in srgb, var(--primary-color), white 80%) !important;
        `;
    }

    /* GLOBAL OVERLAYS & PANELS RESET (Eliminating hardcoded #426948 and #2f4c33) */
    cssVariablesOverride += `
        .p-dropdown-panel, .p-multiselect-panel, .p-autocomplete-panel, .p-datepicker, .p-overlaypanel, .p-sidebar, .p-dialog {
            background: var(--surface-overlay) !important;
            border-color: var(--surface-border) !important;
        }
        .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
            background: var(--highlight-bg) !important;
            color: var(--primary-color-text) !important;
        }
        .p-paginator .p-dropdown {
             background: var(--surface-card) !important;
             border-color: var(--surface-border) !important;
        }
    `;

    cssVariablesOverride += `}`; // Close :root

    // Append Component Specific Styles
    if (tableHeaderBg) {
        cssVariablesOverride += `
            .p-datatable .p-datatable-thead > tr > th {
                background-color: ${tableHeaderBg} !important;
                color: var(--text-color);
            }
        `;
    }
    if (tableFooterBg) {
         cssVariablesOverride += `
            .p-datatable .p-datatable-footer {
                background-color: ${tableFooterBg} !important;
                color: var(--text-color);
            }
        `;
    }

    if (highlightColor) {
         cssVariablesOverride += `
            .p-selectbutton .p-button.p-highlight {
                background: ${highlightColor} !important;
                border-color: ${highlightColor} !important;
                color: ${isDark ? '#000000' : '#ffffff'} !important;
            }
            .p-selectbutton .p-button.p-highlight:hover {
                background: ${highlightColor} !important;
                border-color: ${highlightColor} !important;
            }
            
            /* Button State Fixes (Override hardcoded hexes in theme) */
            .p-button:enabled:hover {
                background: color-mix(in srgb, var(--primary-color), black 10%) !important;
                border-color: color-mix(in srgb, var(--primary-color), black 10%) !important;
            }
            .p-button:enabled:active {
                background: color-mix(in srgb, var(--primary-color), black 20%) !important;
                border-color: color-mix(in srgb, var(--primary-color), black 20%) !important;
            }
            
            /* Checkbox & RadioButton Fixes */
            .p-checkbox.p-highlight .p-checkbox-box {
                background: var(--primary-color) !important;
                border-color: var(--primary-color) !important;
            }
            .p-radiobutton.p-highlight .p-radiobutton-box {
                background: var(--primary-color) !important;
                border-color: var(--primary-color) !important;
            }
            
            /* Paginator Fixes */
            .p-paginator {
                background-color: var(--surface-card) !important; /* Ensure black bg */
                border-color: var(--surface-border) !important;
            }
            .p-paginator .p-paginator-pages .p-paginator-page {
                color: var(--text-color) !important;
            }
            .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
                background: ${highlightColor} !important;
                border-color: ${highlightColor} !important;
                color: ${isDark ? '#000000' : '#ffffff'} !important;
            }

            /* DataView & Lists Fixes (Eliminating hardcoded green #2f4c33) */
            .p-dataview .p-dataview-header,
            .p-dataview .p-dataview-content,
            .p-dataview .p-dataview-footer {
                background: var(--surface-card) !important;
                border: 1px solid var(--surface-border) !important;
                color: var(--text-color) !important;
            }
            .p-dataview.p-dataview-list .p-dataview-content > .grid > div {
                border-color: var(--surface-border) !important;
                background: var(--surface-card) !important;
            }

            /* Dropdown & Inputs Fixes (Eliminating hardcoded green) */
            .p-dropdown, .p-multiselect, .p-inputtext, .p-calendar, .p-autocomplete-input {
                background: var(--surface-card) !important;
                border-color: var(--surface-border) !important;
            }

            /* PanelMenu & Fieldset Fixes */
            .p-panelmenu .p-panelmenu-header .p-panelmenu-header-content {
                background: var(--surface-card) !important;
                border-color: var(--surface-border) !important;
            }
            .p-panelmenu .p-panelmenu-content {
                background: var(--surface-card) !important;
                border-color: var(--surface-border) !important;
            }

            /* Outlined Button Hover Fix (Limpiar) */
            /* Ensure it uses the primary color for text/border, but a neutral or primary-tinted background on hover */
            .p-button.p-button-outlined {
                color: var(--primary-color) !important;
                border-color: var(--primary-color) !important;
                background: transparent !important;
            }
            .p-button.p-button-outlined:hover {
                background: color-mix(in srgb, var(--primary-color), transparent 90%) !important;
                color: var(--primary-color) !important;
                border-color: var(--primary-color) !important;
            }

            /* Global Overlay & Panel Fixes (Eliminating hardcoded #426948 and #2f4c33) */
            .p-dropdown-panel, .p-multiselect-panel, .p-autocomplete-panel, .p-datepicker, 
            .p-overlaypanel, .p-sidebar, .p-dialog, .p-confirm-dialog {
                background: var(--surface-overlay) !important;
                border-color: var(--surface-border) !important;
            }
            
            /* Highlight Override for all components */
            .p-highlight, 
            .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight,
            .p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight,
            .p-tieredmenu .p-menuitem-link.p-highlight,
            .p-menu .p-menuitem-link.p-highlight {
                background: var(--highlight-bg) !important;
                color: var(--primary-color-text) !important;
            }
            
            .p-paginator .p-dropdown {
                 background: var(--surface-card) !important;
                 border-color: var(--surface-border) !important;
            }

            /* SplitButton Specific Overrides */
            .p-splitbutton > .p-button,
            .p-splitbutton > .p-splitbutton-menubutton {
                color: var(--primary-color) !important;
            }
            .p-splitbutton.p-button-raised > .p-button,
            .p-splitbutton.p-button-raised > .p-splitbutton-menubutton {
                box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12) !important;
            }
        `;
    }

    // 3. Inject into DOM
    const existingStyle = document.getElementById('dynamic-theme-style');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'dynamic-theme-style';
    style.textContent = cssVariablesOverride;
    document.head.appendChild(style);

    // Set body background color dynamically to match the theme ground
    if (surfaces.ground) {
        document.body.style.backgroundColor = surfaces.ground;
    }

    // Fade in the app once styles are applied correctly
    // Use a tiny timeout to ensure the browser has parsed the new CSS rules
    setTimeout(() => {
        document.body.classList.add('theme-ready');
    }, 50);
};

// Start application of styles IMMEDIATELY (Before first render)
applyDynamicTheme();

onMounted(() => {
    // Already applied in setup, but just in case of race conditions
    // applyDynamicTheme(); 
});

// Watch for theme changes (e.g. switching between light and dark mode)
watch([() => layoutConfig.theme.value, () => layoutConfig.darkTheme.value], () => {
    // Immediately hide the app to prevent the "green flash" of the new base theme
    document.body.classList.remove('theme-ready');
    
    // Wait a bit longer for the base theme link to swap and load
    setTimeout(applyDynamicTheme, 200); 
});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
