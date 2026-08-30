# Generic Figma Motion Sandbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a dependency-free, non-proprietary three-layer page for an isolated Figma repository round-trip.

**Architecture:** A static `index.html` and `styles.css` define the scene. A small Node HTTP server supports local and Figma Make preview, while Node's built-in test runner enforces the revision, geometry, accessibility, and zero-motion contract.

**Tech Stack:** HTML, CSS, Node.js built-ins, Figma Make configuration scripts

**Spec:** `PROJECT-BRIEF.md`

## Global constraints

- No external assets, dependencies, branding, animation, transitions, or interaction.
- Keep `main` local until commit and push receive separate approval.
- Do not enter Figma until a fresh Figma-write approval is granted.

### Task 1: Static three-layer scene

**Files:** `test/static-contract.test.mjs`, `index.html`, `styles.css`, `package.json`, `.gitignore`

- [x] Write source-contract tests for the revision marker, three named layers, fixed geometry, accessible stage, and absence of motion.
- [x] Run `node --test test/static-contract.test.mjs`; expect failure because `index.html` does not exist.
- [x] Add the minimal HTML and CSS.
- [x] Run `node --test test/static-contract.test.mjs`; expect all tests to pass.

### Task 2: Dependency-free preview

**Files:** `test/server.test.mjs`, `server.mjs`, `.figma/make/setup`, `.figma/make/install`, `.figma/make/dev`, `.figma/make/verify`, `.figma/make/env`

- [x] Write a server test that expects `/` and `/styles.css` to return the correct content types and missing paths to return 404.
- [x] Run `node --test test/server.test.mjs`; expect failure because `server.mjs` does not exist.
- [x] Add the minimal static server and Figma Make scripts for port 3000.
- [x] Run `npm test`; expect all tests to pass with no dependency installation.

### Task 3: Visual acceptance and handoff

**Files:** `CURRENT-STATE.md`, `.evidence/` (ignored)

- [x] Serve the page and inspect it in a real browser at a 1920 x 1080 content viewport.
- [x] Verify exact computed geometry and the revision marker; the browser lacked `document.getAnimations()`, so verify zero motion through a complete computed-style scan and source contract.
- [x] Capture one local screenshot and update `CURRENT-STATE.md` with results.
- [x] Inspect the complete diff and stop for separate commit and push approval.
