#!/bin/bash
set -e

VALID_PACKAGES="i18n ui tooling"

usage() {
  echo "Usage: pnpm release <package> <bump> [<package> <bump> ...]"
  echo "  package: $VALID_PACKAGES"
  echo "  bump:    major | minor | patch"
}

validate_package() {
  local package=$1
  case " $VALID_PACKAGES " in
    *" $package "*) return 0 ;;
    *)
      echo "Unknown package '$package'. Valid packages: $VALID_PACKAGES"
      return 1
      ;;
  esac
}

validate_bump() {
  local package=$1 bump=$2
  case $bump in
    major|minor|patch) return 0 ;;
    *)
      echo "Invalid bump type '$bump' for '$package'. Use: major, minor, patch"
      return 1
      ;;
  esac
}

validate_git_clean() {
  local package=$1
  local dirty
  dirty=$(git status --porcelain "packages/$package")
  if [ -n "$dirty" ]; then
    echo "Uncommitted changes in packages/$package — commit or stash them before releasing"
    return 1
  fi
}

validate_all() {
  local args=("$@")
  local i=0
  while [ $i -lt ${#args[@]} ]; do
    local package=${args[$i]} bump=${args[$((i+1))]}
    i=$((i+2))
    validate_package "$package" || return 1
    validate_bump "$package" "$bump" || return 1
    validate_git_clean "$package" || return 1
  done
}

release_package() {
  local package=$1 bump=$2
  echo "→ releasing @max13h/$package ($bump)"
  pnpm --filter "@max13h/$package" exec npm version "$bump" --no-git-tag-version
  pnpm --filter "@max13h/$package" run build
  pnpm --filter "@max13h/$package" publish --access public
}

release_all() {
  local args=("$@")
  local i=0
  while [ $i -lt ${#args[@]} ]; do
    release_package "${args[$i]}" "${args[$((i+1))]}"
    i=$((i+2))
  done
}

main() {
  if [ $# -eq 0 ] || [ $(( $# % 2 )) -ne 0 ]; then
    usage
    exit 1
  fi

  validate_all "$@"
  release_all "$@"
}

main "$@"
