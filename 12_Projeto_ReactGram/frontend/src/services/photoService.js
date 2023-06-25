import {api, requestConfig} from '../utils/config'

// publish an user's photo
const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true)

    try {
        const res = await fetch(`${api}/photos/`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

// get user's photos

const getUserPhotos = async(id, token) => {
    const config = requestConfig("GET", null, token)
    try {
        const res = await fetch(`${api}/photos/user/${id}`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

// delete a photo
const deletePhoto = async(id, token) => {
    const config = requestConfig("DELETE", null, token)
    try {
        const res = await fetch(`${api}/photos/${id}`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error)
    }
}

// update a photo

const updatePhoto = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(`${api}/photos/${id}`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

// get a photo by its id
const getPhoto = async(id, token) => {
    const config = requestConfig('GET', null, token)
    try {
        const res = await fetch(`${api}/photos/${id}`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

// like a photo
const like = async(id, token) => {
    const config = requestConfig("PUT", null, token)

    try {
        const res = await fetch(`${api}/photos/like/${id}`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

// add comment to a photo
const addComment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)
    
    try {
        const res = await fetch(`${api}/photos/comment/${id}`, config)
                    .then((res)=>res.json())
                    .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

// get all photos
const getPhotos = async (token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = fetch(`${api}/photos/`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

// search photo by title
const searchPhotos = async(query, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = fetch(`${api}/photos/search?q=${query}`, config)
                        .then((res)=>res.json())
                        .catch((err)=>err)
        return res
    } catch (error) {
        console.log(error);
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    addComment,
    getPhotos,
    searchPhotos
}

export default photoService