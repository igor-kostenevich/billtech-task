module.exports = {
  apps: [
    {
      name: 'billtech-task',
      script: '.output/server/index.mjs',
      interpreter: 'node',
      env: {
        PORT: 3002
      }
    }
  ]
}