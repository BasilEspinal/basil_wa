export default class CutService {
    getHola(){
        console.log("Jolaaa ")
    }
        getCutInfo() {
            return fetch('http://localhost:8050/api/v1/cutcontrols')
                .then((res) => res.json())
                .then((d) => d.data);
                console.log("Prueba")
        }
    
      
      
        getCustInfo(params) {
            const queryParams = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            return fetch('http://127.0.0.1:8000/api/v1/cutcontrols' + queryParams).then((res) => res.json());
        }
        
    }
        