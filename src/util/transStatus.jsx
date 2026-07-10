export const transStatus = ({status}) => {
  // eslint-disable-next-line
  if (status === 'Active' || status == 1) {
    return '1';
  } else {
    return '0';
  }
};
