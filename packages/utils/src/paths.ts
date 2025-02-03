import path from "node:path";

/**
 * Check if a path is an ancestor of another path.
 * @param basePath Path to check for ancestor status
 * @param targetPath Path to check if it is a descendant of `basePath`
 * @returns `true` if `targetPath` is a descendant of `basePath`, `false` otherwise
 * @example isAncestor("/a/b", "/a/b/c/d") // => true
 * @example isAncestor("/a/b", "/a/b") // => false
 * @example isAncestor("/a/b", "/a") // => false
 */
function isAncestor(basePath: string, targetPath: string) {
  const relativePath = path.relative(basePath, targetPath);
  // Ensure target is within base and on the same filesystem root
  return !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

export default {
  isAncestor,
};
