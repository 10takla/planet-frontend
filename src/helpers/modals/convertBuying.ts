export const convertBuying = (dateString: string) => {
    const dateObj = new Date(dateString)
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    // @ts-ignore
    const formattedDate = dateObj.toLocaleDateString('ru-RU', options);
    return formattedDate
}