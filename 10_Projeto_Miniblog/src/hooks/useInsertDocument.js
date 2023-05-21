import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp} from 'firebase/firestore'

const initialState={
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)
    
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const checkCanceledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }
    const insertDocument = async(document) => {
        checkCanceledBeforeDispatch({
            type: "LOADING",
        })
        try {
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCanceledBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })
        } catch (error) {
            checkCanceledBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    useEffect(()=>{
        return () => setCancelled(true)
    }, [])

    return {insertDocument, response}
}