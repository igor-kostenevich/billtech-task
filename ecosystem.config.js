module.exports = {
  apps: [
    {
      name: 'billtech-task',
      script: './.output/server/index.mjs',
      exec_mode: 'fork',
      instances: 1,
      env: {
        PORT: 3002
      }
    }
  ]
}
