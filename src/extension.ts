import { SecureContext, SecureContextOptions } from "tls"

const NODE_EXTRA_CA_CERTS = "NODE_EXTRA_CA_CERTS"

const loadCerts = async (extraCertsEnv: string) => {
    const fs = await import("fs")
    const path = await import("path")
    const extraCerts = extraCertsEnv.split(path.delimiter)
    const certs = extraCerts.map((cert: string) => fs.readFileSync(cert).toString()).join("\n")
    const splitPattern = /(?=-----BEGIN\sCERTIFICATE-----)/g
    return new Set(certs
        .split(splitPattern)
        .map((cert: string) => cert.trim()))
}

let originalContextProvider: (options?: SecureContextOptions | undefined) => SecureContext

const initialize = async () => {
    const extraCertsEnv = process.env[NODE_EXTRA_CA_CERTS]
    if (!extraCertsEnv) {
        console.log(`ENV '${NODE_EXTRA_CA_CERTS}' is undefined or empty. Skipping activation.`)
        return
    }

    const allTrusted = await loadCerts(extraCertsEnv)
    const tls = await import("tls")
    originalContextProvider = tls.createSecureContext
    tls.createSecureContext = (options: any) => {
        const ctx = originalContextProvider(options)
        for (const cert of allTrusted) {
            ctx.context.addCACert(cert)
        }
        return ctx
    }
}

const PLUGIN_NAME = "node-extra-ca-certs-vscode"

export async function activate () {
    console.log(`Activating '${PLUGIN_NAME}'`)
    await initialize()
}

export async function deactivate () {
    console.log(`Deactivating '${PLUGIN_NAME}'`)
    const tls = await import("tls")
    tls.createSecureContext = originalContextProvider
}
