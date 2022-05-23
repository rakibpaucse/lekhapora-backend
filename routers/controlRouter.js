const studentRoute = require('./studentRoute')
const teacherRoute = require('./teacherRoute')

const routes = [
    {
        path : '/student',
        handler : studentRoute
    },
    {
        path : '/teacher',
        handler : teacherRoute
    },
    {
        path: '/',
        handler : (req , res) => { 
            res.json({ msg: 'All Good...'})
        }
    }
]

module.exports = app => {
    routes.forEach( route => {
        if(route.path === '/'){
            app.get(route.path , route.handler)
        }else{
            app.use(route.path , route.handler)
        }
    })
}