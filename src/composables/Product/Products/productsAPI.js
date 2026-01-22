/**
 * @file productsAPI.js
 * @description Composable for managing product data via API.
 */
import { ref } from 'vue';
import useData from '@/service/FetchData/FetchDataAPI.js';

export default function useProducts(datos) {
    const { postRequest, putRequest, deleteRequest } = useData();

    // Define data y error en el ámbito de useProducts
    let data = null;
    let errorProducts = ref('');
    const statusCode = ref([]);

    /**
     * Creates a new product.
     * @param {Object} requestData - Product data.
     * @param {string} endPoint - API endpoint.
     */
    const postProducts = async (requestData, endPoint) => {
        console.log('[ProductsAPI] Creating product with data:', requestData);

        try {
            const response = await postRequest(endPoint, requestData);
            statusCode.value = response.ok ? 200 : response.statusCode || 400;

            if (!response.ok) {
                errorProducts.value = response.error;
                console.error('[ProductsAPI] Error in response:', response.error);
            } else {
                console.log('[ProductsAPI] Product created successfully:', response.data);
            }
        } catch (error) {
            console.error('[ProductsAPI] Unexpected error:', error);
            errorProducts.value = error;
        }
    };

    /**
     * Updates an existing product.
     * @param {Object} requestData - Updated product data.
     * @param {string} endPoint - API endpoint.
     * @param {string|number} id - Product ID.
     */
    const putProducts = async (requestData, endPoint, id) => {
        try {
            const response = await putRequest(endPoint, requestData, id);
            statusCode.value = response.ok ? 200 : response.statusCode || 400;

            if (!response.ok) {
                errorProducts.value = response.error;
                console.error('[ProductsAPI] Error in response:', response.error);
            } else {
                console.log('[ProductsAPI] Product updated successfully:', response.data);
            }
        } catch (error) {
            console.error('[ProductsAPI] Unexpected error:', error);
            errorProducts.value = error;
        }
    };

    /**
     * Deletes a product.
     * @param {Object} requestData - (Optional) Request data, note that centralized deleteRequest might ignore this.
     * @param {string} endPoint - API endpoint.
     * @param {string|number} id - Product ID.
     */
    const deleteProducts = async (requestData, endPoint, id) => {
        try {
            const response = await deleteRequest(endPoint, id);
            statusCode.value = response.ok ? 200 : response.statusCode || 400;

            if (!response.ok) {
                errorProducts.value = response.error;
                console.error('[ProductsAPI] Error in response:', response.error);
            } else {
                console.log('[ProductsAPI] Product deleted successfully:', response.data);
            }
        } catch (error) {
            console.error('[ProductsAPI] Unexpected error:', error);
            errorProducts.value = error;
        }
    };

    return {
        errorProducts,
        data,
        postProducts,
        putProducts,
        deleteProducts
    };
}
