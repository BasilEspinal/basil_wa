import { ref, reactive, toRefs, inject } from 'vue'
// import { useRouter } from 'vue-router'
// import { useFetch } from '@/service/fetch.js';
import { APISettings } from '@/service/configfetch.js';

export default function useEmployees() {
    // const router = useRouter()
    // const swal = inject('$swal')
    // const options = {};
     let base = `http://164.90.146.196:81`; // remote
    // let base = `http://agroonline_end.test`;  //local
    let api = `/api/v1`;
    let baseUrl = `${base}${api}`;

    const employees = ref()
    const employee = ref({});
    const response = ref([])
    const errors = ref('')
    const statusCode = ref([])
    const delError = ref(null)
    const endPoint = "/employees"

    const state = reactive({
        response: [],
        error: null,
        fetching: true
    })
    
    const getAllemployees = async () => {
        let token = sessionStorage.getItem('accessSessionToken');
        APISettings.headers.set('Content-Type', 'application/json');
        APISettings.headers.set('Access-Control-Allow-Origin', '*');
        APISettings.headers.set('Authorization', 'Bearer ' + token);
        await fetch(baseUrl + '/employees', {
            method: 'GET',
            headers: APISettings.headers,
        })
            .then(response => response.json())
            .then((d) => {
                employees.value = d.data
                console.info("GetAllEmployess", employees)
            })
            .catch(error => {
                state.error = errors
                console.error('Panic at the disco:', error);
            });


    }

 
    const postEmployee = async (dataIn) => {
        let token = sessionStorage.getItem('accessSessionToken');
        APISettings.headers.set('Content-Type', 'application/json');
        APISettings.headers.set('Access-Control-Allow-Origin', '*');
        APISettings.headers.set('Authorization', 'Bearer ' + token);

        // console.info("Function PostEmployee Form", dataIn)
        await fetch(baseUrl + endPoint, {
            method: 'POST',
            headers: APISettings.headers,
            body: JSON.stringify(dataIn)
        })
        .then(response =>{ 
            statusCode.value=response.status
            return response.json()
        })
          .then(data => {
            // actions to data answer
            console.log(statusCode.value)
            if (data.errors){
                errors.value=data.errors    
            }
            else{
                //redicionamiento es necesario cua
            }
            // console.log(errors)
            console.log(data)
          })
          .catch(error => {
            if (error.name === 'TypeError') {
              // Error de red
              console.error('Error de red:', error.message);
            } else {
              // Error en la respuesta
              console.error('Error en la respuesta:', error.message);
            }
            console.error('Error :', error);
          });

    }



    const fetchdata = async (data) => {
        console.info("Post Product", { ...data })
        let token = sessionStorage.getItem('accessSessionToken');
        APISettings.headers.set('Content-Type', 'application/json');
        APISettings.headers.set('Access-Control-Allow-Origin', '*');
        APISettings.headers.set('Authorization', 'Bearer ' + token);
        try {
            const res = await fetch(baseUrl + '/employees', {
                method: 'POST',
                headers: APISettings.headers,
                body: JSON.stringify(data)
            })
            const json = await res.json();
            response.value = res
            // console.info("Res Value",res.status)
            if (res.status === 422) {
                console.info("Response Value", response)
                state.response = json;
                statusCode = state.response
                console.info("State response", state.response)
            }

        } catch (error) {
            state.error = errors
        }
        finally {
            state.fetching = false
        }
    }
    return {
        ...toRefs(state),
        fetchdata,
        employees,
        employee,
        errors,
        statusCode,
        postEmployee,
        getAllemployees

    }
}