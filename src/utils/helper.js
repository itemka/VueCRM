export const getEnvVariables = (envVariables, keyNames = {}) => {
  if (!envVariables) {
    return {}
  }

  return Object.entries(keyNames).reduce((acc, [key, value]) => {
    acc[key] = envVariables[value]
    
    return acc
  }, {})
}
