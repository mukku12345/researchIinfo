const db = require("../model");
const User = db.tables.User;


exports.registration = async (req, res) => {
  try {
    const { firstName, lastName, email, country, state, city, gender, dob } = req.query;

    // Regular expressions for validation
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validNameRegex = /^[A-Za-z]+$/;

    // Validate email
    if (!email.match(validEmailRegex)) {
      return res.status(400).json({
        message: "Invalid Email Id",
      });
    }

    // Validate first name and last name
    if (!firstName.match(validNameRegex) || !lastName.match(validNameRegex)) {
      return res.status(400).json({
        message: "Firstname and Lastname should be only alphabets",
      });
    }

    // Function to calculate age
    function calculateAge(dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    }

    // Calculate age based on date of birth
    const age = calculateAge(dob);

    // Create a new user instance and save to the database
    if (age < 14 || age > 99) {
      return res.status(400).json({
        message: "Age must be between 14 and 99 years",
      });
    }


    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(409).send({
            message: 'This user is already in use!',
        });
    } else {

    const user = new User({ firstName, lastName, email, country, state, city, gender, dob, age });
    await user.save();

    res.status(201).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message :error.message});
  }
};

  
exports.getuserList =  async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};