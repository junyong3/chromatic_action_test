export const ServerProxyInfo = (env: any) => {
  return {
    '/iam': {
      target: env.VITE_API_URL,
      changeOrigin: true,
    },
    '/admin/user': {
      target: env.VITE_COMMERCE_MEMBER_URL,
      changeOrigin: true,
    },
    '^/admin/payment/.*': {
      target: env.VITE_PAYMENT_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/admin\/payment/, 'admin'),
    },
    '/admin': {
      target: env.VITE_CS_URL,
      changeOrigin: true,
    },
  }
}
