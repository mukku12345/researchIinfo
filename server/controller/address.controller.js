const db = require("../model");
const Address = db.address.Address;

exports.postAddress = async (req, res) => {
    try {
      const {country,state,city} = req.body;
      const user = new Address({country ,state,city});
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message : error.message});

    }
  };
  

  exports.getCountry = async (req, res) => {
    try {
      const countries = await Address.find({}, 'country');
      res.json(countries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message : error.message});
    }
  };
  
  // Get states of a country
  exports.getStates = async (req, res) => {
    const countryName = req.query.countryName;
    try {
      const country = await Address.findOne({ country: countryName },'state');
      res.json(country.state);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message : error.message});

    }
  };
  
  // Get cities of a state
  exports.getCities =  async (req, res) => {
    const countryName = req.query.countryName;
    const stateName = req.query.stateName;
    try {
      const country = await Address.findOne({ country: countryName, 'state.name': stateName }, 'state.$');
      console.log("country",country)
      const state = country.state.find(s => s.name === stateName);
      res.json(country);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message : error.message});

    }
  };