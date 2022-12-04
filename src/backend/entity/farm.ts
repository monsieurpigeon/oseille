import { db } from '../service/database';
import {store} from "../service/store";

export interface Farm {
    _id:string;
    _rev: string;
  title: string;
}

export interface FarmInput {
    title: string
}

export const loadFarm = () => {
    db.get('myFarm').then((data) => {
        store.farm = data as unknown as Farm
    }).catch((error) => {
        if (error.status === 404) {
            db.post({_id: 'myFarm'}).then(() => {
                loadFarm()
            })
        }
    })
}

export const updateFarmName = ({title}: FarmInput) => {
    db.get('myFarm').then((doc) => {
        db.put({
            _id: 'myFarm',
            _rev: doc._rev,
            title
        }).catch(console.error)
    }).then(() => loadFarm())
}