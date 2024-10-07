import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest, putRequest, deleteRequest, patchRequest, errorResponseAPI } = useData();
class SearchManager {
    constructor({ model, suggestions, searchEndpoint, field }) {
      this.model = model; // El modelo que va a bindear el valor del autocomplete
      this.suggestions = suggestions; // Lista de sugerencias
      this.searchEndpoint = searchEndpoint; // Endpoint para buscar los datos
      this.field = field; // Campo del objeto que se utilizará para la búsqueda
    }
  
    // Método para realizar la búsqueda
    async search(query) {
      if (!query.trim().length) {
        this.suggestions.value = await this.fetchSuggestions();
      } else {
        this.suggestions.value = this.suggestions.value.filter(item =>
          item[this.field].toLowerCase().startsWith(query.toLowerCase())
        );
      }
    }
  
    // Método para obtener las sugerencias del backend
    async fetchSuggestions() {
      const response = await getRequest(this.searchEndpoint);
      if (!response.ok) {
        toast.add({ severity: 'error', detail: 'Error: ' + response.error, life: 3000 });
        return [];
      }
      return response.data.data;
    }
  }
  export default SearchManager;