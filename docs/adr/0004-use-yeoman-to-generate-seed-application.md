# 0004. Use Yeoman to generate seed application

Date: 11.1.2017

## Status

Accepted

## Context

Current version of FAST is well built but cumbersome to start a new project on. Current `npm run init` command works by deleting some subdirs (e.g. `.git`) and efectively cloning whole project.
While the FAST codebase is almost done, we feel it is same to convert it to [Yeoman](http://yeoman.io) script.

## Decision

Use Yeoman to generate seed applications for developers.

## Consequences
Next version will use [Yeoman](http://yeoman.io) as scaffolding tool.
