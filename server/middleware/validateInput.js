const validateSignupInput = (data) => {
  const { username, email, password } = data;
  if (!username) {
    return "Please enter your username";
  }
  if (!email) {
    return "Please enter your email";
  }
  if (!password) {
    return "Please enter your password";
  }
  return null; // Không có lỗi
};
const validateSigninInput = (data) => {
  const { email, password } = data;
  if (!email) {
    return "Please enter your email";
  }
  if (!password) {
    return "Please enter your password";
  }
  return null;
};

module.exports = { validateSignupInput, validateSigninInput };
