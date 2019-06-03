const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now
    },
    visited: [String]
});

const User = mongoose.model('User', UserSchema); // 모델을 만들고.. 그 모델의 이름의 복수형으로 collection을 만든다 자동으로.. 
module.exports = User;
/* schema -> 문서 -> collection -> db
We want to export this 
we'll just put this in a variable 



//Users.findOneAndUpdate({ name: 'zerocho' }, { name: 'babo' }, { multi: true, new: true }) 
// 예시 multi(여러 개 동시 업데이트), new(결과로 변경된 문서 반환) 등이 자주 쓰입니다.

we want to create a model from our schema 
so we pass in the model name which is 'User' && UserSchema
then export it
*/