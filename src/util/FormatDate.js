const formatDate = (date) => {
    const formattedDate = date.toISOString().slice(0, 19);
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    return formattedDate;
};

export default formatDate;
