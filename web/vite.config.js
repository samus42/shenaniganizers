import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
import fs from 'fs'

const SSL_CRT_FILE = '../../../local-cert-generator/server.crt'
const SSL_KEY_FILE = '../../../local-cert-generator/server.key'

const httpsOptions = {
    key: fs.readFileSync(SSL_KEY_FILE),
    cert: fs.readFileSync(SSL_CRT_FILE)
}

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        https: httpsOptions
    },
    preview: {
        port: 3000,
        https: httpsOptions
    },
    build: {
        manifest: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash', 'omit-deep-lodash'],
                    react: ['react'],
                    graphql: ['graphql', '@apollo/client'],
                    material: [
                        '@emotion/react',
                        '@emotion/styled',
                        '@mui/material',
                        '@mui/icons-material'
                    ],
                    materialExtras: ['@mui/lab', '@mui/x-date-pickers']
                }
            }
        }
    }
})
