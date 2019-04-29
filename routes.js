const nextRoutes = require("next-routes")
const routes = (module.exports = nextRoutes())

routes.add("/", "index")
routes.add("/a", "index")
routes.add("/b", "index")
routes.add("/c", "index")
routes.add("/d", "index")
routes.add("/result", "result")