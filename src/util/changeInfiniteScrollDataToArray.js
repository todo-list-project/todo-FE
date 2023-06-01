//받은 데이터를 하나의 배열로 반환해준다
function changeInfiniteScrollDataToArray(pageList) {
  const array = [];
  pageList?.pages.forEach(page => {
    array.push(...page.result);
  });

  return array;
}

export { changeInfiniteScrollDataToArray };
