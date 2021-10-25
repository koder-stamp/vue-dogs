import axios from "axios";


export default {
    state: {
        list: [],
        listRandom: [],
        breedList: [],
        favorites: []
    },
    mutations: {
        setItem (state, {item, data}) { state[item] = data },
        setPush (state, {item, data}) { state[item].push(data) },
    },
    getters: {
        getList: state => JSON.parse(JSON.stringify(state.list)),
        getListRandom: state => state.listRandom,
        getListBreed: state => state.breedList,
        getListFavorites: state => state.favorites,
    },
    actions: {
        async getListBreeds({commit, dispatch}) {
            let response = await axios.get(process.env.VUE_APP_URL + '/breeds/list');
            await commit('setItem', {item: 'list', data: JSON.parse(JSON.stringify(response.data.message))});
            await dispatch('shuffle');
        },
        shuffle({commit, state}) {
            const array = state.list;
            let copy = [], n = array.length, i;
            while (n) {
                i = Math.floor(Math.random() * array.length);
                if (i in array) {
                    copy.push(array[i]);
                    delete array[i];
                    n--;
                }
            }
            commit('setItem', {item: 'listRandom', data: copy})
        },

         getImageBredRandom(...args){
            return axios.get(process.env.VUE_APP_URL + '/breed/' + args[1] + '/images/random').then((res)=>{
                return  res.data.message
            });
        },
        async getImagesBred({commit}, payload){
            let response = await axios.get(process.env.VUE_APP_URL + '/breed/' + payload + '/images')
                commit('setItem', {item: 'breedList', data: response.data.message})
        },
        setFavorites(...payload){
            let a = [];
            a = JSON.parse(localStorage.getItem('favorites')) || [];
            a.push(payload[1]);
            localStorage.setItem('favorites', JSON.stringify(a));
        }

    },

}