import bcrypt from 'bcryptjs';

const SALT = 10;

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('password must be at least 8 characters');
  }

  return bcrypt.hash(password, SALT);
};

export { hashPassword as default };
