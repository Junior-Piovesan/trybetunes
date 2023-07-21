export const validNameImage = (info1:string, info2:string):boolean => {
  return info1.length > 0 && info2.length > 0;
};

export const validEmailDescrip = (info:string, info2:string):boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(info2) && info.length > 0;
};
