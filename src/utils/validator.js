
export function validateText(text, type) {
    if (type === 'alpha')
        text = text.replace(/[^A-Za-zğüşöçİĞÜŞÖÇ'\s]/g, '');
    else if (type === 'numeric')
        text = text.replace(/[^0-9]/g, '');
    return text;
}

export function setWithValidation(text, type, setState) {
    if (type === 'alpha')
        text = text.replace(/[^A-Za-zğüşöçİĞÜŞÖÇ'\s]/g, '');
    else if (type === 'numeric')
        text = text.replace(/[^0-9]/g, '');

    setState(text);
}

export function validateAndDialog(model, key, options) {
    if (!options?.length) {
        if (model == null)
            return `${key} girilmesi zorunludur`;
    }
    else if (model) {
        if (model.toString().length != options?.length)
            return `${key} ${options.length} haneli olmalıdır`;
        if (options?.max && model > options?.max)
            return `${key} en fazla ${options.max} olabilir`;
        if (options?.min && model < options?.min)
            return `${key} en az ${options.min} olabilir`;
    }
    return null;
}