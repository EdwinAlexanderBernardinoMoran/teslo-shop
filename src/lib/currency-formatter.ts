export const currencyFormatter = (mount: number) => {
    return mount.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    })
}