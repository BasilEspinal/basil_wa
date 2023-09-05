export default class CutService {

        getCutInfo(url) {
            return fetch(url)
                .then((res) => res.json())
                .then((d) => d.data);
     
        }
    }
        