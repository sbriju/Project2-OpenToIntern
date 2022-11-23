const mongoose = require('mongoose');

//isValidBody
const isValidBody = (data) => {
    if (Object.keys(data).length > 0)
        return true
    return false
};

//isValidFullName
const isValidFullName = (fn) => {
    const nm = fn.trim()
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(nm)
    return regex
}

//email
const isValidEmail = (email) => {
    const regex = /^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/.test(email)
    return regex
}

//Mobile 
const isValidMobile = (phone) => {
    let regex = /^(\+91[\-\s]?)?(91)?[6789]\d{9}$/.test(phone)
    return regex
}

//isValidAbvr
const isValidAbvr = (name) => {
    let regex = /^[a-z.]{2,100}$/.test(name)
    return regex
}

// isValidUrl
const isValidUrl = (longUrl) => {
    const regex = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i.test(longUrl)
    return regex
}

module.exports = { isValidBody, isValidFullName, isValidEmail, isValidMobile, isValidAbvr, isValidUrl };
