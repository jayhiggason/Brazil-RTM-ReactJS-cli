import axios from 'axios';

export function action(data) {
    return dispatch => {
        return axios.post('/api/auth',data);
    }
}

