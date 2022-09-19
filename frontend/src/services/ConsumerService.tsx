import { Consumer } from '../model/Consumer';
import { v4 as uuid } from 'uuid';

const remove = (id: string, callback: Function) => {
    fetch('consumers/' + id, { method: 'DELETE' })
        .then(() => callback());
}

const create = (data: Consumer, callback: Function) => {
    if (!data.id) {
        data.id = uuid();
    }
    data.addresses.forEach(ad => {
        if (!ad.id) ad.id = uuid();
    });
    fetch('consumers', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            callback();
        });
}

const getAll = async () => {
    // get the data from the api
    const data = await fetch('/consumers');
    // convert the data to json
    const json = await data.json();
    return json as unknown as Consumer[];
}

const ConsumerService = {
    getAll,
    create,
    remove
};

export default ConsumerService;