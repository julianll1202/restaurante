const app = require('./app.js')
const { PORT } = require('./config/index.js')

function main () {
    app.default.listen(PORT)
    console.log(`Server listening on port ${PORT}`)
}
main()
