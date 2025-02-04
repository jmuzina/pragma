import { describe, it, expect } from 'vitest';
import {isAncestor, isDescendant} from "../src/paths";

describe('isAncestor', () => {
  it('should return true if the path is an ancestor of the descendant path', () => {
    expect(isAncestor('/a/b', '/a/b/c/d')).toBe(true);
  });

  it('should return false if the paths are identical', () => {
    expect(isAncestor('/a/b', '/a/b')).toBe(false);
  });

  it('should handle repeated slashes in the paths', () => {
    expect(isAncestor('/a///b/c', '/a/b/c/d')).toBe(true);
    expect(isAncestor('/a///b/c', '/a/b/c')).toBe(false);
    expect(isAncestor('/a///b///c/', '/a//b//c//')).toBe(false);
  });

  it('should return false if the ancestor path is not an ancestor of the descendant path', () => {
    expect(isAncestor('/a/b', '/a')).toBe(false);
  });

  it('should return false if the descendant path is outside the ancestor path', () => {
    expect(isAncestor('/a/b', '/a/c/d')).toBe(false);
  });

  it('should return false if the ancestor path is a parent of the descendant path but different filesystem roots', () => {
    expect(isAncestor('/a/b', 'C:/a/b/c/d')).toBe(false);
  });

  it('should return false if the descendant path is a relative path that goes above the ancestor path', () => {
    expect(isAncestor('/a/b', '/a/b/../../c/d')).toBe(false);
  });

  it('should return true for paths where the descendant is deeply nested within the ancestor path', () => {
    expect(isAncestor('/a/b', '/a/b/c/d/e')).toBe(true);
  });

  it('should return true if the ancestor path is the root and the descendant path is within it', () => {
    expect(isAncestor('/', '/a/b/c/d')).toBe(true);
  });

  it('should handle cases where the paths contain trailing slashes', () => {
    expect(isAncestor('/a/b/', '/a/b/c/d')).toBe(true);
    expect(isAncestor('/a/b', '/a/b/')).toBe(false);
  });

  it('should return false for null ancestor path', () => {
    expect(isAncestor(null, '/a/b/c/d')).toBe(false);
  });

  it('should return false for null descendant path', () => {
    expect(isAncestor('/a/b', null)).toBe(false);
  });

  it('should return false for both null paths', () => {
    expect(isAncestor(null, null)).toBe(false);
  });

  it('should return false for empty strings as paths', () => {
    expect(isAncestor('', '/a/b/c/d')).toBe(false);
    expect(isAncestor('/a/b', '')).toBe(false);
  });

  it('should return false if the ancestor path is just whitespace', () => {
    expect(isAncestor('   ', '/a/b/c/d')).toBe(false);
  });

  it('should return false if the descendant path is just whitespace', () => {
    expect(isAncestor('/a/b', '   ')).toBe(false);
  });

  it('should return false if both paths are just whitespace', () => {
    expect(isAncestor('   ', '   ')).toBe(false);
  });

  it('should return false if the ancestor path is a relative path', () => {
    expect(isAncestor('a/b', '/a/b/c/d')).toBe(false);
  });

  it('should return false if the descendant path is a relative path', () => {
    expect(isAncestor('/a/b', 'a/b/c/d')).toBe(false);
  });

  it('should return false if the ancestor path and descendant path are on different filesystem roots', () => {
    expect(isAncestor('/a/b', 'C:/a/b/c/d')).toBe(false);
    expect(isAncestor('C:/a/b', '/a/b/c/d')).toBe(false);
    expect(isAncestor('/mnt/volume1/a/b', '/mnt/volume2/a/b/c/d')).toBe(false);
    expect(isAncestor('/mnt/volume2/a/b', '/mnt/volume1/a/b/c/d')).toBe(false);
  });

  it('should return true of both paths are on the same filesystem root and all other conditions match', () => {
    expect(isAncestor('/mnt/volume1/a/b', '/mnt/volume1/a/b/c/d')).toBe(true);
  })

  it('should return true if both paths are relative paths and all other conditions match', () => {
    expect(isAncestor('a/b', 'a/b/c/d')).toBe(true);
  });
});

describe('isDescendant', () => {
  it('should return true if the descendant path is deeply nested within the ancestor path', () => {
    expect(isDescendant('/a/b/c/d/e', '/a/b')).toBe(true);
    expect(isDescendant('/a/b/c/d', '/a')).toBe(true);
  });

  it('should return false if the descendant path is identical to the ancestor path', () => {
    expect(isDescendant('/a/b', '/a/b')).toBe(false);
  });

  it('should return false if the descendant path is not within the ancestor path', () => {
    expect(isDescendant('/a/b/c/d', '/a/b')).toBe(true);
    expect(isDescendant('/a', '/a/b')).toBe(false);
  });

  it('should return true if the ancestor navigates up to a path shared by the descendant', () => {
    expect(isDescendant('/a/b/c/d/e', '/a/b/c/d/../../c')).toBe(true);
  });

  it('should return false if the ancestor navigates up to a path not shared by the descendant', () => {
    expect(isDescendant('/a/b/c/d/e', '/a/b/c/d/../../b')).toBe(false);
    expect(isDescendant('/a/b/c/d/e', '/a/b/c/d/../../../c')).toBe(false);
  });

  it('should return false if the descendant path is on a different filesystem root', () => {
    expect(isDescendant('C:/a/b/c/d', '/a/b')).toBe(false);
  });

  it('should return false if the descendant path is a relative path that goes above the ancestor path', () => {
    expect(isDescendant('/a/b/c/d', '/a/b/../../e')).toBe(false);
  });

  it('should return false if the descendant path is null or an empty string', () => {
    expect(isDescendant('/a/b', null)).toBe(false);
    expect(isDescendant('/a/b', '')).toBe(false);
  });

  it('should return false if the ancestor path is null or an empty string', () => {
    expect(isDescendant(null, '/a/b')).toBe(false);
    expect(isDescendant('', '/a/b')).toBe(false);
  });

  it('should return false for paths with only whitespace', () => {
    expect(isDescendant('   ', '/a/b')).toBe(false);
    expect(isDescendant('/a/b', '   ')).toBe(false);
  });

  it('should handle trailing slashes in paths', () => {
    expect(isDescendant('/a/b/c/d/', '/a/b/c')).toBe(true);
    expect(isDescendant('/a/b/', '/a/b')).toBe(false);
  });

  it('should return false for paths on different Unix filesystems', () => {
    expect(isDescendant('/mnt/volume1/a/b', '/mnt/volume2/a/b/c/d')).toBe(false);
    expect(isDescendant('/mnt/volume2/a/b', '/mnt/volume1/a/b/c/d')).toBe(false);
  });

  it('should return false if the descendant path and ancestor path are on different filesystem roots', () => {
    expect(isDescendant('/a/b', 'C:/a/b/c/d')).toBe(false);
    expect(isDescendant('C:/a/b', '/a/b/c/d')).toBe(false);
  });

  it('should return false if either path is invalid', () => {
    expect(isDescendant(null, '/a/b')).toBe(false);
    expect(isDescendant('/a/b', null)).toBe(false);
    expect(isDescendant('', '/a/b')).toBe(false);
    expect(isDescendant('/a/b', '')).toBe(false);
  });
});

