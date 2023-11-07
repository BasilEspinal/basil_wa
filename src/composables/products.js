import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
// import axios from 'axios'
import { useFetch } from '@/service/fetch.js';
import { post } from '@/service/api.js';

export default function useProducts() {
    
    const products = ref([])
    const product = ref([])
    const errors = ref('')
    // const router = useRouter()
    // const swal = inject('$swal')
    const endPoint="/products"
    const options = {};
    const getAllProducts = async () => {
        
        console.log("Composable GetAlProducts")

         let { response, error } =  await useFetch(endPoint,options , true); 

        console.log("Response Fetch :"+response)

        // console.log("Error Fetch :"+error)
        
         products.value = []
        // console.info( products.value)
    }

    // const getSingleProduct = async (id) => {
    //     const response = await axios.get(`/api/products/${id}`)

    //     product.value = response.data.data
    // }

    // const storeProduct = async (data) => {
    //     await axios.post('/api/products/', data)
    //         .then(response => {
    //             router.push({ name: 'products.index' })

    //             swal({
    //                 icon: 'success',
    //                 title: 'Datos creado exitosamente'
    //             })
    //         })
    //         .catch(error => {
    //             if (error.response.status === 422) {
    //                 errors.value = error.response.data.errors
    //             }
    //         })
    // }

    // const updateProduct = async (product) => {

    //     await axios.put('/api/products/' + product.id, product)
    //         .then(response => {
    //             router.push({ name: 'products.index' })

    //             swal({
    //                 icon: 'success',
    //                 title: 'Datos editados exitosamente'
    //             })
    //         })
    //         .catch(error => {
    //             if (error.response?.data) {
    //                 errors.value = error.response.data.errors
    //             }
    //         })
    // }

    // const deleteProduct = async (id) => {
    //     swal({
    //         title: 'Estas seguro que deseas eliminar?',
    //         text: 'No podras revertir esta accion',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Si, eliminar el dato!',
    //         confirmButtonColor: '#ef4444',
    //         timer: 20000,
    //         timerProgressBar: true,
    //         reverseButtons: true
    //     })
    //         .then(result => {
    //             if (result.isConfirmed) {
    //                 axios.delete('/api/products/' + id)
    //                     .then(response => {
    //                         getAllProducts()
    //                         router.push({ name: 'products.index' })
    //                         swal({
    //                             icon: 'success',
    //                             title: 'Producto eliminado exitosamente'
    //                         })
    //                     })
    //                     .catch(error => {
    //                         swal({
    //                             icon: 'error',
    //                             title: 'Hubo un problema'
    //                         })
    //                     })
    //             }
    //         })
    // }

    return {
        products,
        product,
        errors,
        getAllProducts,
        // getSingleProduct,
        // storeProduct,
        // updateProduct,
        // deleteProduct
    }

}
