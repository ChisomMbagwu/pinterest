const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, age, phoneNumber } = req.body;
        const existEmail = await userModel.findOne({ email: email.toLowerCase() });
        const existPhoneNumber = await userModel.findOne({ phoneNumber: phoneNumber });

        if (existEmail || existPhoneNumber) {
            return res.status(400).json({
                message: `User already exists`
            })
        };

        const saltRound = await bcrypt.genSalt(10); //GENSALT IS THE LEVEL OF SECURITY YOU WANT TO ADD TO THE password//
        const hashPassword = await bcrypt.hash(password, saltRound); //WE'RE USING THE SALT ROUND TO HASH THE PASSWORD//

        const user = new userModel({
            fullName,
            email,
            password: hashPassword,
            age,
            phoneNumber
        });

        await user.save()

        res.status(201).json({
            message: "User registered successfully",
            data: user
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: `Internal server error`,
            error: error.message
        })
    }
};
exports.getOneUser = async (req,res) => {
  try {
    const id = req.params.id
    const user = await userModel.findById(id)
    if(!user){
      return res.status(404).json({
        statusCode:false,
        statusText:'not found',
        message:'No user found'
      });
    };
    res.status(200).json({
      statusCode:true,
      statusText:'Ok',
      message:'User below',
      data:user
    })
  } catch (error) {
    res.status(500).json({
      statusCode:false,
      statusText:'Internal server error',
      message:'Error getting user'+error.message
    })
  }
}