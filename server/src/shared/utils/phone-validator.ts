export function isValidPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '')
    return cleanPhone.length === 10 || cleanPhone.length === 11
}

export function formatPhone(phone: string): string {
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length === 11) {
        return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (cleanPhone.length === 10) {
        return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
    return phone
}
