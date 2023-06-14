const {body} = require("express-validator")

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório.")
            .isString(0)
            .withMessage("O título é obrigatório.")
            .isLength({min: 3})
            .withMessage("O título precisa ter, no mínimo, três caracteres."),
        body("image").custom((value, {req}) => {
            if (!req.file){
                throw new Error("A imagem é obrigatória.")
            }
            return true
        })
    ]
}

const photoUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O título é obrigatório.")
            .isLength({min: 3})
            .withMessage("O título precisa ter, no mínimo, três caracteres.")
    ]
}

const photoCommentValidation = () => {
    return [
        body("comment")
            .isString()
            .withMessage("O comentário é obrigatório.")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    photoCommentValidation
}