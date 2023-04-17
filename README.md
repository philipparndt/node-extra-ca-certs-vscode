# node-extra-ca-certs-vscode

Make the environment variabe `NODE_EXTRA_CA_CERTS` available to VS Code extensions.

## Feature

This extension will enable the environment variable `NODE_EXTRA_CA_CERTS` for all VS Code extensions. So that all extensions can use the certificates defined in this environment variable.

It replaces `tls.createSecureContext` function with a custom function that load all certs from a file defined in the environment variable to the tls context.

See:
https://nodejs.org/api/cli.html#node_extra_ca_certsfile

There is no platform dependency for this extension. It will work on all platforms.
The idea is that you might have done the setup already in case you are a NodeJS developer.

## Installation

- Install from [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=pharndt.node-extra-ca-certs-vscode) 
- Or open VSCode, hit `Ctrl+Shift+X` (Extensions pane), search for `node-extra-ca-certs-vscode` and press `Install`.

Set the environment variable `NODE_EXTRA_CA_CERTS` to the path of the file containing the certificates.
Example: `export NODE_EXTRA_CA_CERTS=/path/to/certs.pem`

## Caveats

After installing, a restart is required for the changes to take effect.

## Credits

- [win-ca](https://github.com/ukoloff/win-ca)
- [mac-ca](https://github.com/jfromaniello/mac-ca)
- [mac-ca-vscode](https://github.com/linhmtran168/mac-ca-vscode)
