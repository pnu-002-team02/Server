const express = require('express');
const router = express.Router();

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page  
router.get('/register', (req, res) => res.render('register')); //라우터를 타고 오면 view폴터에 ejs파일을 render

/**when we submit our registration form
 * it's gonna make a post request to / user / register
*/
//Register Handle "등록 버튼의 기능"
router.post('/register', (req, res) => {
    const { name, email, password, password2 }= req.body;
    let errors = [];
    // Check required fields
    if(!name || !email || !password || password2) {
        errors.push({msg: 'Please fill in all fields'});
    }
    //Check Password
    if(password !== password2) {
        errors.push({masg: 'Passwords Do not match'});
    }
    if(errors.length >0){
        res.render('rgister', { errors, name, email, password, password2}); //다시 렌더링, 이전 입력갑 전달. 
    } else {
        res.send('pass')
    }
    /*
    console.log(req.body)  //이 body는 rester.ejs페이지 에서 작성된 내용이 전달. 
    res.send('Register Handle done'); //client 에 작업 완료 알림 . */
})


module.exports = router;