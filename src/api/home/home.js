import {get} from '../api'

export const homeService = {
    //  首页
    banner(param) {
        return get('/home/banner', param)
    },
    recommend(param) {
        return get('/home/recommend', param)
    }
}