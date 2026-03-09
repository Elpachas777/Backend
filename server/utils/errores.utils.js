export class ValidacionError extends Error {
    constructor(mensaje, statusCode, mensajePublico) {
        super(mensaje)
        this.name = "Error de validación"
        this.statusCode = statusCode
        this.publicMessage = mensajePublico
    }
}

export class DuplicadoError extends Error {
    constructor(mensaje, statusCode, mensajePublico) {
        super(mensaje)
        this.name = "Error de la base de datos"
        this.statusCode = statusCode
        this.publicMessage = mensajePublico
    }
}

export class InesperadoError extends Error {
    constructor(mensaje, statusCode, mensajePublico) {
        super(mensaje)
        this.name = "Error inesperado"
        this.statusCode = statusCode
        this.publicMessage = mensajePublico
    }
}

export class ApiError extends Error {
    constructor(mensaje, statusCode, mensajePublico) {
        super(mensaje)
        this.statusCode = statusCode
        this.publicMessage = mensajePublico
    }
}