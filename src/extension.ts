function initialize() {
  if (!process.env.NODE_EXTRA_CA_CERTS) {
    console.log('ENV "NODE_EXTRA_CA_CERTS" is undefined or empty. Skipping activation.');
    return;
  }
  
  const fs = require('fs');
  const path = require('path');
  const extraCerts = process.env.NODE_EXTRA_CA_CERTS.split(path.delimiter);
  const certs = extraCerts.map((cert: string) => fs.readFileSync(cert).toString()).join('\n');
  const splitPattern = /(?=-----BEGIN\sCERTIFICATE-----)/g;

  const allTrusted = certs.split(splitPattern);
  const tls = require('tls');
  const origCreateSecureContext = tls.createSecureContext;
  tls.createSecureContext = (options: any) => {
    const ctx = origCreateSecureContext(options);
    allTrusted.filter(duplicated).forEach((cert: string) => {
      ctx.context.addCACert(cert.trim());
    });
    return ctx;
  };
}

function duplicated(cert: string, index: number, arr: string[]) {
  return arr.indexOf(cert) === index;
}

initialize();

export function activate() {
  console.log('Activating "node-extra-ca-certs-vscode"');
}

export function deactivate() {}
