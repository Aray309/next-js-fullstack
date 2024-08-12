export const otpGenerator = () => {
  const sixDigit = Math.floor(100000 + Math.random() * 900000);
  const otp = sixDigit.toString();
  return otp;
};
