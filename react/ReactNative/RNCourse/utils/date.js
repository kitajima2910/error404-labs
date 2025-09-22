export const getFormattedDate = (data) => {
    return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
};

export const getDateMinusDays = (date, days) => {
    return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    // return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};