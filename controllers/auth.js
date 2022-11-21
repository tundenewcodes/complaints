const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

exports.signup = (req, res, next) => {



     const errors = validationResult(req)
     if (!errors.isEmpty()) {
       const error = new Error('Validation failed.')
       error.statusCode = 422
       error.data = errors.array()
       throw error
     }
     const email = req.body.email
     const fullname = req.body.fullname
     const password = req.body.password
     const confirm_password = req.body.confirm_password
     const department = req.body.department


     if (password !== confirm_password){
         const error = new Error(
           'password does not match'
         )
         error.statusCode = 401
         throw error
     }

 User.findOne({ email: email })
   .then((userDoc) => {
     if (userDoc) {

       req.flash(
         'error',
         'E-Mail exists already, please use a different email or signin.'
       )
       res.send({message:"email already exit"})
    //    return res.redirect('/signup')
     }

// if email doesnt exist
       bcrypt
         .hash(password, 12)
         .then((hashedPw) => {
           const user = new User({
             email: email,
             password: hashedPw,
             fullname: fullname,
             department: department,
             confirm_password: confirm_password,
           })
           return user.save()
         })
         .then((result) => {
           res
             .status(201)
             .json({ message: 'User created!', userId: result._id })
         })
         .catch((err) => {
           if (!err.statusCode) {
             err.statusCode = 500
           }
           next(err)
         })

   })
   .catch((err) => {
     console.log(err)
   })



};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecretsecret', { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString(), fullname:loadedUser.fullname, email:loadedUser.email, department:loadedUser.department });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.getUsername = async (req, res, next)=>{
  try{const user = await User.findOne(req.user)

    if(!user){
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
  
    res.status(200).json({fullname:user.fullname, email:user.email, department:user.department})}
    catch(err){
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
  }
}
exports.updateProfile = async (req, res, next)=>{
    const {fullname,department,email} = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error(
        'Validation failed, entered data is incorrect.'
      )
      error.statusCode = 422
      throw error
    }
try{
    const user = await User.findOne(req.user)


if (!department || typeof  department !== 'string'){
      const error = new Error(
        'please enter a vallid department'
      )
      error.statusCode = 422
      throw error
}

user.department = department




if (!fullname || typeof  fullname !== 'string'){
      const error = new Error(
        'please enter a vallid fullname.'
      )
      error.statusCode = 422
      throw error
}

user.fullname = fullname

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

if (!email || typeof  email !== 'string' || !email.match(emailRegex) ){
      const error = new Error(
        'please enter a vallid email.'
      )
      error.statusCode = 422
      throw error
}

user.email = email
const userData ={
    email, fullname, department
}
await user.save()
  res.status(200).json({ message: 'User updated!', user: userData })}

  catch(err){
     if (!err.statusCode) {
       err.statusCode = 500
     }
     next(err)
  }

}


exports.updatePassword = async (req, res, next) =>{
// const { oldPassword, newPassword } = req.body
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     const error = new Error(
//       'Validation failed, entered data is incorrect.'
//     )
//     error.statusCode = 422
//     throw error
//   }


//   try{
//    const user = await User.findOne(req.user)

//     if(!user){
//     console.log('you are not logged in')
//     }

//   const isValid = await bcrypt.compare(oldPassword, user.password);
//    if (!isValid ) {
//      const error = new Error('please enter  correct password')
//      error.statusCode = 422
//      throw error
//    }
//   if (!newPassword) {
//   const error = new Error(
//     'please enter new password'
//   )
//   error.statusCode = 422
//   throw error
//   }
//    user.password = newPassword
//    user.confirm_password = newPassword
//     await user.save()
//   res.status(200).json({ message: 'Password updated!', password: newPassword, confirm_password:newPassword })
//   }
//   catch(err){
//  if (!err.statusCode) {
//    err.statusCode = 500
//  }
//  next(err)
//   }

}

