import path from "node:path";

/**
 * Determines whether a given path is an ancestor of another path.
 * @param ancestorPath The potential ancestor path.
 * @param descendantPath The path to check if it is a descendant of `ancestorPath`.
 * @returns `true` if `descendantPath` is a descendant of `ancestorPath`, otherwise `false`.
 * @example isAncestor("/a/b", "/a/b/c/d") // => true
 * @example isAncestor("/a/b", "/a/b") // => false
 * @example isAncestor("/a/b", "/a") // => false
 */
function isAncestor(ancestorPath: string, descendantPath: string) {
  // Identical paths are not ancestors
  if (ancestorPath === descendantPath) return false;

  const relativePath = path.relative(ancestorPath, descendantPath);

  // Ensure descendantPath is within ancestorPath and on the same filesystem root
  return !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

/**
 * Determines whether a given path is a descendant of another path.
 * @param descendantPath Potential descendant path.
 * @param ancestorPath The path to check if it is an ancestor of `descendantPath`.
 * @returns `true` if `descendantPath` is a descendant of `ancestorPath`, otherwise `false`.
 * @example isDescendant("/a/b/c/d", "/a/b") // => true
 * @example isDescendant("/a/b", "/a/b") // => false
 * @example isDescendant("/a", "/a/b") // => false
 */
function isDescendant(descendantPath: string, ancestorPath: string) {
  return isAncestor(ancestorPath, descendantPath);
}

export default {
  isAncestor,
  isDescendant,
};
