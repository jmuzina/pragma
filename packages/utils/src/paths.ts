import path from "node:path";

/**
 * Normalize the given path. Removes trailing slashes, normalizes backslashes to forward slashes, and trims whitespace.
 * @param p The path to normalize.
 * @returns The normalized path.
 */
function normalizePath(p: string): string {
  if (!p) return "";
  // Special case for root path
  if (p === "/") return p;

  return path
    .normalize(p.trim())
    .replace(/\\/g, "/") // Normalize backslashes to forward slashes
    .replace(/\/$/, ""); // Remove trailing slashes
}

/**
 * Determines whether a given path is an ancestor of another path.
 * @param ancestor The potential ancestor path.
 * @param descendant The path to check if it is a descendant of `ancestor`.
 * @returns `true` if `descendant` is a descendant of `ancestor`, otherwise `false`.
 */
export function isAncestor(ancestor: string, descendant: string): boolean {
  if (!ancestor || !descendant) return false;

  const ancestorNorm = normalizePath(ancestor);
  const descendantNorm = normalizePath(descendant);

  // Identical paths are not ancestors
  if (ancestorNorm === descendantNorm) return false;

  // If ancestorPath is the root, it should always be considered an ancestor of any valid descendant
  if (ancestorNorm === "/") return true;

  const relativePath = path.relative(ancestorNorm, descendantNorm);

  // Ensure descendantPath is within ancestorPath and on the same filesystem root
  return !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

/**
 * Determines whether a given path is a descendant of another path.
 * @param descendant The potential descendant path.
 * @param ancestor The path to check if it is an ancestor of `descendant`.
 * @returns `true` if `descendant` is a descendant of `ancestor`, otherwise `false`.
 */
export function isDescendant(descendant: string, ancestor: string): boolean {
  return isAncestor(ancestor, descendant);
}

export default {
  isAncestor,
  isDescendant,
};
