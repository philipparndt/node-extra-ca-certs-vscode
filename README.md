# node-extra-ca-certs-vscode

Make the environment variabe NODE_EXTRA_CA_CERTS available to VS Code extensions.

## Feature

This extension will enable the environment variable `NODE_EXTRA_CA_CERTS` for all VS Code extensions. So that all extensions can use the certificates installed in the system.

It replaces `tls.createSecureContext` function with a custom function that load all certs from Keychain Access to the tls context. So self-signed certificates installed in the Keychain can be available to all VS Code extensions.

## Installation

Install from [here](add link) or open VSCode,
hit `Ctrl+Shift+X` (Extensions pane),
search for `node-extra-ca-certs-vscode` and press `Install`.

## Caveats

- After installing, a restart is required for the changes to take effect.

## Credits

- [win-ca](https://github.com/ukoloff/win-ca)
- [mac-ca](https://github.com/jfromaniello/mac-ca)
- [mac-ca-vscode](https://github.com/linhmtran168/mac-ca-vscode)
