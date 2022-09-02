function handleCreateUsernameQueryArray(username: string) {
  const usernameArray = username.split('');
  const usernameQueryArray = [''];

  usernameArray.forEach((chracter: string, index: number) => {
    const mergerExtract = usernameQueryArray[index];
    const mergerResult = mergerExtract.concat(chracter);

    usernameQueryArray.push(mergerResult);
  });
  usernameQueryArray.shift();

  return usernameQueryArray;
}

export default handleCreateUsernameQueryArray;
