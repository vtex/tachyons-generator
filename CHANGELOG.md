# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- `outlineColor` token that defines a global outline color. via the wildcard `*` selector.

## [1.4.0] - 2020-03-23
### Added
- Create `stylesheetType` options to `generate` function, allowing to generate stylesheets for known devices types. For now they are: `large`, `small`, `notsmall` and `xlarge`. `common` is also accepted to generate stylesheet with no media queries and size suuffixes on tokens.

## [1.3.0] - 2019-08-01

### Changed

- Remove all comments when minifying, as an attempt of fixing an issue with MIME type of CSS files (https://stackoverflow.com/questions/48248832/stylesheet-not-loaded-because-of-mime-type/48270432#48270432).

## [1.2.1] - 2019-06-11

### Fix

- Default print class identifier to `print`.

## [1.2.0] - 2019-06-11

### Added

- Add `generatePrint()` to generate a stylesheet to modify printing page styles.

## [1.1.0] - 2019-03-13

### Added

- Add sticky position token.

## [1.0.0] - 2018-12-21

### Removed

- Remove Fabriga as default font family.
