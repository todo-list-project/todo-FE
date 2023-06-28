export const formatDate = (date) => {
  console.log(date);
  const formattedDate = date.toISOString().slice(0, 19);
  console.log(formattedDate);
  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, '0');
  // const day = String(date.getDate()).padStart(2, '0');
  return formattedDate;
};

export const reFormatDate = (newdate) => {
  const date = new Date(newdate);

  const month = date.getMonth() + 1; // JavaScript의 Date.getMonth() 함수는 월을 0부터 시작하기 때문에 1을 더합니다.
  const day = date.getDate();

  const reFormattedDate = `${month}월 ${day}일`;
  return reFormattedDate;
};

export const modifyFormatDate = (modifyData) => {
  console.log("modifyData", modifyData);
  const dateString = "2023-06-16T14:12:54";
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  console.log(formattedDate);
  return formattedDate;
};
