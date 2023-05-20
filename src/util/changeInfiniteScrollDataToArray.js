function changeInfiniteScrollDataToArray(pageList) {
    const array = [];
    pageList?.pages.forEach((page) => {
        array.push(...page.result);
    });

    return array;
}

export { changeInfiniteScrollDataToArray };
