export const getEnvVariables = (envVariables, keyNames = {}) => {
  if (!envVariables) {
    return {}
  }

  return Object.entries(keyNames).reduce((acc, [key, value]) => {
    acc[key] = envVariables[value]
    
    return acc
  }, {})
}

export const getRandomColors = (array) => array.reduce((acc) => {
  const randomColor = [...Array(3)]
    .map(() => Math.floor(Math.random() * 255))
    .join(',');
  
  acc.backgroundColor = [ ...(acc.backgroundColor || []), `rgba(${randomColor}, 0.2)`]
  acc.borderColor = [ ...(acc.borderColor || []), `rgba(${randomColor}, 1)`]

  return acc
}, {})
