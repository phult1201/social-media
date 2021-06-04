const valid = ({
  firstname,
  lastname,
  username,
  email,
  password,
  cf_password,
}) => {
  const error = {};
  if (!firstname) {
    error.firstname = "Please enter your first name.";
  }
  if (!lastname) {
    error.lastname = "Please enter your last name.";
  }

  if (!username) {
    error.username = "Please enter your user name.";
  } else if (username.length >= 25 || username.length < 6) {
    error.username = "Username must be between 6 and 25 characters.";
  }

  if (!email) {
    error.email = "Please enter your email.";
  } else if (!validateEmail(email)) {
    error.email = "Email invalidate.";
  }

  if (!password) {
    error.password = "Please enter your password.";
  } else if (password.length < 6) {
    error.password = "Password must be at least 6 characters.";
  }

  if (password !== cf_password) {
    error.cf_password = "Confirm password does not match. ";
  }

  return {
    errorMsg: error,
    errorLength: Object.keys(error).length,
  };
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default valid;
