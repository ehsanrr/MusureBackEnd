function validatorJOI (schema, body){
    const { error, value } = schema.validate(body)

    return {
        errors: error,
        values: value
    }
}

module.exports = validatorJOI