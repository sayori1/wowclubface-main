
export const isUserPremium = function isUserPremium(user) {
  if (!user.premiumExpires) {
    return false;
  }

  return +new Date() < +new Date(user.premiumExpires);
}

export const isPremiumContent = (isPremium, user) => {
  if (!isPremium) {
    return false;
  }

  return !isUserPremium(user);
}
