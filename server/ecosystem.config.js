module.exports = {
  apps : [{
    name: "appp",
    script: "./server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}