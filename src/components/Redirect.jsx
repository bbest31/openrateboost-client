import { useEffect } from 'react';

const Redirect = (props) => {
  const { url } = props;
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};

export default Redirect;
