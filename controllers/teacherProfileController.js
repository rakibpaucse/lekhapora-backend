
const {dataBaseConnection} = require('../database');

exports.getProfileController = (req , res , next ) => {

    let id_number = req.query.id_number

    dataBaseConnection.query(`SELECT 
                                    teacher_profiles.id,profile_type,profile_id,name,email,contact_number,
                                    total_taken_courses,no_of_classes,position, batch_teacher,age , gender 
                                    FROM teacher_profiles INNER JOIN users ON (users.profile_id = teacher_profiles.id) 
                                WHERE id_number =?`, [id_number], 
    (error, results, fields)=> {
       if(error){
        return res.status(403).send({msg:'Somthing Wrong Happened!'})
       }else{ 
           return res.status(200).send({profile : results[0]}) 
        }
    })

}


exports.getdashboardController = (req , res , next ) => {

    let id_number = req.query.id_number

       dataBaseConnection.query(`SELECT 
                                        courses.id AS course_id,name, code, number_of_student, credit, teacher_id, 
                                        teacher_default_pic FROM courses INNER JOIN users 
                                        ON (users.profile_id = courses.teacher_id) 
                                    WHERE id_number = ?`, [id_number], 
        (error, results, fields)=> {
        if(error){
            console.log(error);
        return res.status(403).send({msg:error})
        }else{ 
            let courses = results 
        return res.status(200).send({teacher_courses : courses}) 
        }
        })

}

exports.getEventController = (req , res , next ) => { 
    
    dataBaseConnection.query(`SELECT id, title, body, date FROM events`, (error , results , fields) => {
        if(error){
            return res.status(403).send({msg:'something unwanted happned!'})
        }else{

            return res.status(200).send({events : Object.values(results) }) 
        }
    })
}


exports.getNotificationController = (req , res , next ) => { 
    
    dataBaseConnection.query(`SELECT 
                                    notifications.id, course_id, title, body, date ,
                                    courses.name , courses.teacher_default_pic FROM notifications 
                                    INNER JOIN courses ON (notifications.course_id = courses.id)`, 
                                (error , results , fields) => {
        if(error){
            return res.status(403).send({msg:'something unwanted happned!'})
        }else{

            let arr = Object.values(results)

            // let course_ids = []
            // arr.forEach(ar => { course_ids.push(ar.course_id) })
            // // let abc = arr.filter()

            let course_ids ={};

            arr.forEach(element => {
              var makeKey = element.course_id;
               if(!course_ids[makeKey]) {
                course_ids[makeKey] = [];
               }
          
               course_ids[makeKey].push({
                id: element.id,
                course_id: element.course_id,
                title: element.title,
                body: element.body,
                date: element.date,
                teacherPic:element.teacher_default_pic,
                courseName:element.name
              });
             });


            return res.status(200).send({notifications : Object.values(course_ids) }) 
        }
    })
}



// get students

exports.getallCoursesController = (req , res , next ) => { 
    
    dataBaseConnection.query(`SELECT id , name, email, cgpa, batch FROM student_profiles`, (error , results , fields) => {
        if(error){
            return res.status(403).send({msg:'something unwanted happned!'})
        }else{

            return res.status(200).send({students : Object.values(results) }) 
        }
    })
}
