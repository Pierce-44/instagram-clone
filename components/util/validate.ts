export const emailValidate = (values: string) => {
  let errors = '';
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regexTwo = /@/;

  if (values.length === 0) {
    errors = 'Email is required!';
  } else if (!regexTwo.test(values)) {
    errors = 'Please include an "@" in your email address';
  } else if (!regex.test(values)) {
    errors = 'Please use a valid email address!';
  } else if (values.length > 30) {
    errors = 'Email address cannot exceed more than 30 characters';
  }
  return errors;
};

export const passwordValidate = (values: string) => {
  let errors = '';
  const regexLetters = /^(?=.*[a-z])(?=.*[A-Z])/;
  const regexNumbers = /^(?=.*[0-9])/;

  if (values.length === 0) {
    errors = 'Password is required!';
  } else if (!regexLetters.test(values)) {
    errors = 'Password must contain atleast one lowercase and uppercase letter';
  } else if (!regexNumbers.test(values)) {
    errors = 'Password must contain atleast one number';
  } else if (values.length < 8) {
    errors = 'Password be must be eight characters or longer';
  } else if (values.length > 30) {
    errors = 'Passwrod cannot exceed more than 30 characters';
  }

  return errors;
};
