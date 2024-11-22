const validateSignupInput = (data) => {
  const { username, email, password } = data;
  if (!username) return "Username is required";
  if (!email) return "Email is required";
  if (!password) return "Password is required";
  return null; // Không có lỗi
};

module.exports = { validateSignupInput };
