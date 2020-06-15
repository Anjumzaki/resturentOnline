const  User  = require('../models/User');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config');

router.post('/signup', async (req, res) => {
    console.log(req.body)
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(200).send('User already exists!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            // name: req.body.firstName, 
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            type: req.body.type
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.status(200).send(user);
    }
});


router.post('/signin', async (req, res) => {
    console.log(req.body)
    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
        return res.status(200).send('Email does not exist.');
    }
 
    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        console.log("wrog pass")
        return res.status(200).send('Incorrect password.');
    }
 
    const token = jwt.sign({ _id: user._id }, "THENODEPRIVATEKEYWITHJWTAUTH__3");
    res.send({token: token, user: user});
});

router.put('/reset/password/:old/:new/:email', async (req, res) => {
    console.log("called")
    //  Now find the user by their email address
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
        return res.status(200).send('Email does not exist.');
    }
    console.log("user",user,req.params.old, user.password)

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.params.old, user.password);
    console.log("validPassword",validPassword)
    if (validPassword) {

        const salt = await bcrypt.genSalt(10);
        var pas = await bcrypt.hash(req.params.new, salt);
        
        User.updateOne({ email: req.params.email }, {
            $set: {
              password: pas
            }
          }, { upsert: true }, function (err, user) {
            res.status(200).send({
              success: 'true',
              message: 'pass updated'
            })
          });
    }else{
        res.status(200).send({
            success: 'false',
            message: 'pass updated'
          })
    }
 
    // const token = jwt.sign({ _id: user._id }, "THENODEPRIVATEKEYWITHJWTAUTH__3");
    // res.send({token: token, user: user});
});


router.post('/guest/register', async (req, res) => {
    console.log(req.body)
    // Check if this user already exisits
    let user = await User.findOne({ guestId: req.body.guestId });
    if (user) {
        return res.status(200).send({token: "guest", user: user});
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            isGuest: req.body.isGuest,
            guestId: req.body.guestId,
            type: "Customer",
            creationDate: new Date(),
            isGuestVerified: false
        });

        await user.save();
        res.send({token: "guest", user: user});
    }
});

router.put('/guest/edit/:id', async (req, res) => {
    console.log("m", req.params.id)
    User.updateOne({ _id: req.params.id }, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        isGuestVerified: req.body.isGuestVerified
        }
    }, { upsert: true }, function (err, user) {
      res.status(200).send({
        success: 'true',
        message: 'user updated'
      })
    });
    
});

router.put('/guest/edit/verified/:id', async (req, res) => {
    console.log("m", req.params.id)
    User.updateOne({ _id: req.params.id }, {
      $set: {
        isGuestVerified: req.body.isGuestVerified
        }
    }, { upsert: true }, function (err, user) {
      res.status(200).send({
        success: 'true',
        message: 'user updated'
      })
    });
    
});


router.post('/employee/signup', async (req, res) => {
    console.log(req.body)
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(200).send('User already exists!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            zipCode: req.body.zipCode,
            password: req.body.password,
            isGuest: req.body.isGuest,
            guestId: req.body.guestId,
            type: req.body.type,
            creationDate: new Date()
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.send(user);
    }
});


 
module.exports = router;