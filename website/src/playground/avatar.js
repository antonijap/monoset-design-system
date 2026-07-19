export function getAvatarNameError(name) {
  return typeof name === "string" && name.trim()
    ? null
    : "Enter a name for the avatar.";
}
