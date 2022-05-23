const router = require('express').Router()

const { isUnauth } = require('../middlewares/authMiddleWare')

const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController')

const {getProfileController,
    getdashboardController,
    getEventController,
    getNotificationController,
    getallCoursesController
} = require('../controllers/teacherProfileController')


const { 
    getPostController ,
    getAssigmentsController ,
    getExamController,
    getLectureController,
    getNotificationControllerr
} = require('../controllers/courseController')

// auth Routes

router.get('/signup'  , signupGetController)
router.post('/signup'  , signupPostController)
router.post('/login'   , loginPostController)
router.get('/logout' , logoutController)


// profile Routes 

router.get('/getProfile' , getProfileController)
router.get('/dashboard' ,  getdashboardController)
router.get('/events',isUnauth ,  getEventController)
router.get('/notification',isUnauth ,  getNotificationController)
router.get('/allCourses',isUnauth ,  getallCoursesController)


// courses
router.get('/course/:courseId/post' , isUnauth , getPostController)
router.get('/course/:courseId/assignments' , isUnauth , getAssigmentsController)
router.get('/course/:courseId/exam' , isUnauth , getExamController)
router.get('/course/:courseId/lecture' , isUnauth , getLectureController)
router.get('/course/:courseId/notification' , isUnauth , getNotificationControllerr)


module.exports = router