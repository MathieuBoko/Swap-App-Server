# Swap App Server December 15th 2023 Update
Client: Swap App 'https://github.com/MathDevWeb/swap-app'

- Added '/allFormData' endpoint > fetch 'Date' of rows with data available
- Added '/deleteOutdatedRows'   > delete rows with 'Date' outdated once a day || 16.12.2023 > as server.js doesn't run 24h, replaced with Cron job at Database level
