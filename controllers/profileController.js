
const {dataBaseConnection} = require('../database');

exports.getProfileController = (req , res , next ) => {

    let id_number = req.query.id_number

    
    dataBaseConnection.query(`SELECT 
                                student_profiles.id,profile_type,profile_id,name,email,contact_number,sgpa,cgpa,
                                credit_earned,course_completed,batch,blood_group 
                                FROM student_profiles INNER JOIN users ON 
                                (users.profile_id = student_profiles.id) 
                            WHERE id_number = ?`, [id_number], 
    (error, results, fields)=> {
       if(error){
        return res.status(403).send({msg:'Somthing Wrong Happened!'})
       }else{ 
           return res.status(200).send({profile : results[0]}) 
        }
    })

}


exports.getdashboardController = (req , res , next ) => {
    let id_number = '777'
    // let id_number = req.body.id_number

       dataBaseConnection.query(`SELECT 
                                    course_id,name, code, number_of_student, credit, teacher_id, teacher_default_pic
                                    FROM courses INNER JOIN course_student ON (course_student.course_id = courses.id) 
                                    WHERE student_id = (SELECT profile_id FROM users 
                                WHERE id_number = ?)`, [id_number], 
        (error, results, fields)=> {
        if(error){
        return res.status(403).send({msg:error})
        }else{ 
            let courses = results 
        return res.status(200).send({student_courses : courses}) 
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