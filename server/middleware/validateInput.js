const validateSignupInput = (data) => {
  const { username, email, password } = data;
  if(!username || !email || !password) {
    return "All fields are required";
  }
  return null; // Không có lỗi
};
const validateSigninInput = (data) => {
  const { email, password } = data;
  if(!email ||!password) {
    return "All fields are required";
  }
  return null;
};

module.exports = { validateSignupInput, validateSigninInput };
