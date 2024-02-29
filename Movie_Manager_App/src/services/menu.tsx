import axios from 'axios';
import DataList from '../model/DataList';

const getDataFromJsonServer = (subUrl : string) => {
    let url = 'http://localhost:3001';
    //let subUrl = '/movies-in-theaters';
    
    url = url + '/' + subUrl;
    
    return axios.get<DataList[]>(url)
            .then( response => response.data )
};


const pushDataToJsonServer = ( newDataAdded : Omit<DataList, 'id'> ) => {
    console.log(newDataAdded);
    return axios.post<DataList>(
        'http://localhost:3001/favourit',
        newDataAdded,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then( response => response.data )
};


const removeDataFromJsonServer = ( id : number, title : string ) => {
    console.log(id + ":" + title);
    return axios.delete<DataList> (`http://localhost:3001/favourit/${id}`)
            .then( response => response.data )
};


const getDataByTitleFromJsonServer = ( id : number, title : string ) => {
    let url = `http://localhost:3001/favourit?title=${title}`;
    let subUrl = (id !== undefined && id > 0) ? `&id=${id}` : '';
    url = url + subUrl;
    return axios.get<DataList[]>(url)
            .then( response => response.data )
};



export {
    getDataFromJsonServer,
    pushDataToJsonServer,
    removeDataFromJsonServer,
    getDataByTitleFromJsonServer
}
