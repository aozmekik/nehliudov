
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