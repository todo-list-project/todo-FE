//받은 데이터를 하나의 배열로 반환해준다
function changeInfiniteScrollDataToArray(pageList) {
  // console.log('합치기 위한 배열', pageList);
  const array = [];
  pageList?.pages.forEach(page => {
    if (Array.isArray(page.result.response)) {
      array.push(...page.result.response);
    } else {
      // 처리할 수 없는 데이터 형식에 대한 처리가 필요하다면 여기에서 수행
      return;
    }
  });

  return array;
}

export { changeInfiniteScrollDataToArray };
