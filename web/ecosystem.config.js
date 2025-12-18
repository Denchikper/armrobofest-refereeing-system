// ecosystem.config.js
export default {
  apps: [{
    name: 'robofest-web',
    script: '/usr/bin/node', // или который node
    args: [
      'node_modules/vite/bin/vite.js',
      'dev'
    ],
    cwd: '/home/aduser/armrobofest-refereeing-systerm/web',
    instances: 1,
    autorestart: true,
    watch: false,
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}