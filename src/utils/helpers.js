export const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
  
  export const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  export const validateDiamondId = (id) => {
    return /^DIA\d{6}$/.test(id);
  };