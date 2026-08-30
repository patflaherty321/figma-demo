# Generic Figma Motion Sandbox

## User result

A public, non-proprietary repository loads as a simple three-layer desktop-like scene so the center panel can receive one Figma Motion preset and be pushed back for verification.

## Static contract

- Fixed stage: 1920 x 1080.
- Layers: abstract backdrop, floating panel, and bottom dock.
- Revision marker: `fake-ui-static-v1`.
- Initial source has no animation, transition, interaction, external asset, brand, logo, product name, or proprietary UI.
- Runtime uses only browser-native HTML, CSS, and Node.js; there are no package dependencies.

## Approval boundaries

- Local implementation and validation are approved.
- Commit, push, Figma clone/write, and Figma-to-GitHub actions remain separate gates.
- All other repositories, source assets, and existing Figma drafts are out of scope.

## Acceptance

The static page renders at 1920 x 1080 with exact layer geometry and zero active animations. Later, after separate approval, Figma must clone the public repository and animate only the floating panel from 200 px below its resting position over 500 ms with ease-out.
