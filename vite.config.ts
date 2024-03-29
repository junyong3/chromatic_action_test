import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import { ServerProxyInfo } from './ServerProxyInfo'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react(), tsconfigPaths(), eslint(), svgr()],
    server: {
      // hmr: {
      //   overlay: false,
      // },
      host: true,
      proxy: {
        ...ServerProxyInfo(env),
      },
    },
  }
})
