import axios from 'axios'
import useSWR, { mutate } from 'swr'

import Authaxios from '../components/Authaxios'

export default function useResource() {
    //  users
    // *************

    
    const userupdateURL = '/users/user-update'
    // stores
    // *************
    const storeupdateURL = '/stores/updateStore'
    const storesearchURL = 'stores/searchStoreslist?search_key='
    const userstoresURL = '/stores/getuserStores'
    const storedeleteURL = '/stores/deleteStore'
    // appointments
    // *************
    const createappointmentURL = '/appointments/createAppointment'
    const userappointmentsURL = '/appointments/getuserAppointments'
    const storeappointmentsURL = '/appointments/getstoreAppointments'
    const updateappointmentURL = '/appointments/updateAppointment'

    

    return ({

    })
}