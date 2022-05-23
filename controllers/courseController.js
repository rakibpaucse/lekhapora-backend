
const {dataBaseConnection} = require('../database');

exports.getPostController = (req , res , next ) => {

    // console.log(req.baseUrl.slice(1,req.baseUrl.length));

    // userType  === 'student' ? 'student_courses' : 'teacher_courses'; 

    let sql = 'SELECT id, post_id, student_id, title, body FROM comments'
    let sql2 = 'SELECT posts.id , posts.created_at, course_id, title, body, user_id ,student_profiles.name , student_profiles.profile_picture FROM posts INNER JOIN student_profiles ON (student_profiles.id = posts.user_id) WHERE course_id = ? '

    dataBaseConnection.query( sql2, [req.params.courseId], 
                            (error, results, fields)=> {

                                if(error){
                                    console.log(error);
                                    return res.status(403).send({msg:'Somthing Wrong Happened!'})

                                   }else{ 
                                    
                                    // dataBaseConnection.query(`SELECT id, post_id, student_id, title, body FROM comments` , (error, resultsOfComments, fields) => {
                                    //     if(error){
                                    //         console.log(error)
                                    //         return res.status(403).send({msg:'Somthing Wrong Happened! double'})
                                    //     }else{

                                            // const comments = {}
                                            // let arr = Object.values(resultsOfComments)

                                            // arr.forEach(element => {
                                            //     var makeKey = element.post_id;
                                            //     if(!comments[makeKey]) { comments[makeKey] = []; }

                                            //     comments[makeKey].push({
                                            //         id: element.id,post_id: element.post_id,title: element.title,body: element.body,student_id: element.student_id });
                                            //             });

                                            //             results.map(post => { 
                                            //                 let postComments = Object.keys(comments).filter((cmnt , id) => console.log(Object.keys(comments)[id]  , '=',post.id))
                                            //                 // let postComments = Object.values(comments).filter(cmnt => cmnt.post_id === post.id)
                                            //                 console.log(postComments );
                                            //                 let index = results.findIndex(res => res.id === post.id)
                                            //                 results[index].comments = postComments
                                            //             })
                                                // let abc = 

                                            // console.log(typeof comments)
                                        // }
                                    // })
                                        
                                    results.forEach(element => { element.comments = [ {body:'', created_at:'', name:''} ] });

                                    console.log(results);

                                    return res.status(200).send({ posts : results}) 
                                    }
                            } )
}

exports.getAssigmentsController = (req , res , next ) => {

    dataBaseConnection.query(`SELECT id, name, deadline, term, mark , course_id FROM assignments WHERE course_id = ?`, [req.params.courseId], 
    (error, results, fields)=> {

        if(error){
            return res.status(403).send({msg:'Somthing Wrong Happened!'})

           }else{ console.log(req.params.courseId);
            return res.status(200).send({ assignments : results})
            }

    })
}

exports.getExamController = (req , res , next ) => {

    dataBaseConnection.query(`SELECT id, name, term, start_at FROM exams WHERE course_id = ?`, [req.params.courseId], 
    (error, results, fields)=> {

        if(error){
            return res.status(403).send({msg:'Somthing Wrong Happened!'})

           }else{
            return res.status(200).send({ exams : Object.values(results)})
            }

    })
}

exports.getLectureController = (req , res , next ) => {

    dataBaseConnection.query(`SELECT id, name, term, fileType , link FROM lectures WHERE course_id = ?`, [req.params.courseId], 
    (error, results, fields)=> {

        if(error){
            return res.status(403).send({msg:'Somthing Wrong Happened!'})

           }else{
            return res.status(200).send({ lectures : Object.values(results)})
            }

    })
} 


exports.getNotificationControllerr = (req , res , next ) => { 
    
    dataBaseConnection.query(`SELECT 
                                    notifications.id, course_id, title, body, date , notifications.created_at,
                                    courses.name , courses.teacher_default_pic FROM notifications 
                                    INNER JOIN courses ON (notifications.course_id = courses.id) WHERE course_id = ?`, [req.params.courseId],  
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

            // console.log(results)

            return res.status(200).send({notifications : results }) 
        }
    })
}