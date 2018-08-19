export const isActiveString = (str: string): str is string => {
  if (typeof str === "string" && str.length > 0) {
    return true
  }
  return false
}
