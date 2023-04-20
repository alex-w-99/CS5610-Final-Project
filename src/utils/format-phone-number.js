
const formatPhoneNumber = (phoneNumberString) =>  {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return [match[1], '-', match[2], '-', match[3], '-', match[4]].join('');
    }
    return null;
}

export default formatPhoneNumber;
