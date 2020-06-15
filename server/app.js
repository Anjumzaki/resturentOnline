var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const Company = require("./models/Company");
const Store = require("./models/Store");
const Product = require("./models/Product");
const Order = require("./models/Orders");
const Category = require("./models/Category");
const SubCategory = require("./models/SubCategory");
const Favourite = require("./models/Favourite");
const Location = require("./models/Location");
const Restaurent = require("./models/Restaurent");
const InviteCode = require("./models/InviteCode");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require("multer"); 
const fs = require('fs');
const axios = require('axios');
var app = express();
const users = require('./routes/auth');
const creds = require('./config/config');
const config = require('config');
var nodemailer = require('nodemailer');
const Email =require('email-templates')
var favicon = require('serve-favicon')
var ejs = require("ejs");
const client = require('twilio')(creds.SID, creds.TOKEN);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


var cors = require('cors');
app.use(cors());
//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '1000kb' }));

//DB config
const db = require("./config/keys").mongoURI;
//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use('/api/users', users);

//post store
app.post('/add/restaurent', async (req, res) => {

  let restaurent = new Restaurent({
    name:  req.body.name,
    category: req.body.category,
    phoneNumber: req.body.phoneNumber,
    stempPrice: req.body.stempPrice,
    inviteCode: req.body.inviteCode,
    description: req.body.description,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng
  });

  restaurent.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'restaurent not post',
        restaurent,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'restaurent post',
        restaurent,
      })
    }
  });

});

//get inviteCode
app.get('/get/inviteCode/:code', (req, res) => {

  InviteCode.findOne({inviteCode: req.params.code})
  .then(cod => {
    res.json(cod);
  })
  .catch(err => res.status(404).json(err));
}

);

//get all stores
app.get('/get/restaurent/', (req, res) => {

  Restaurent.find({})
  .then(restaurent => {
    res.json(restaurent);
  })
  .catch(err => res.status(404).json(err));
}

);

//post store
app.post('/add/store', async (req, res) => {
  console.log(req.body)
  var storeCount =0 
  Store.find({})
  .then(stores => {
    storeCount = stores.length
  })
  .catch(err => res.status(404).json(err));


  let store = new Store({
      storeName: req.body.storeName,
      ownerName: req.body.ownerName,
      emailAddress: req.body.emailAddress,
      companyName: req.body.companyName,
      companyId: req.body.companyId,
      phoneNumber: req.body.phoneNumber,
      storeAddress: req.body.storeAddress,
      city: req.body.city,
      county: req.body.county,
      zipCode: req.body.zipCode,
      userName: req.body.userName,
      c_info_: req.body.c_info_,
      lat: req.body.lat,
      lng: req.body.lng,
      password: req.body.password,
      tax: req.body.tax,
      aboutStore: req.body.aboutStore,
      isActive: true,
      storeTimings: req.body.storeTimings,
      storeId: storeCount+1,
      orderNum: "1"
  });

  store.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'store not post',
        store,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'store post',
        store,
      })
    }
  });

});

//get all stores
app.get('/get/stores/', (req, res) => {

  Store.find({isActive: true})
  .then(stores => {
    res.json(stores);
  })
  .catch(err => res.status(404).json(err));
}

);

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 3958.8; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

//get all stores by location
app.get('/get/stores/:lat/:lng', (req, res) => {
  // /:lng/:lat
  Store.find({isActive: true})
  .then(stores => {

    var lat = req.params.lat
    var lng = req.params.lng

    var filteredStores=[]
    for(var i=0; i<stores.length; i++){
        lat1 = stores[i].lat
        lng1 = stores[i].lng


        console.log('JBJFSBDF',i,lat,lng,lat1,lng1, getDistanceFromLatLonInKm(lat,lng,lat1,lng1))
        if(getDistanceFromLatLonInKm(lat,lng,lat1,lng1) < 500000){
          filteredStores.push(stores[i])
        }
    }
    console.log(filteredStores)
    res.json(filteredStores);
  })
  .catch(err => res.status(404).json(err));
}

);



//get all stores
app.get('/check/user/:uName', (req, res) => {

  Store.findOne({c_info_ : { $elemMatch: { c_uName_: req.params.uName } } })
  .then(stores => {
    res.json(stores);
  })
  .catch(err => res.status(404).json(err));
}

);

//get all blocked stores
app.get('/get/blocked/stores/', (req, res) => {

  Store.find({isActive: false})
  .then(stores => {
    res.json(stores);
  })
  .catch(err => res.status(404).json(err));
}

);


//get store by id
app.get('/get/store/:id', (req, res) => {

  Store.findOne({ _id: req.params.id })
  .then(store => {
    console.log(store)
    res.json(store);
  })
  .catch(err => res.status(404).json(err));
}

);

//edit store by id
app.put("/edit/store/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Store.updateOne({ _id: req.params.id }, {
    $set: {
      storeName: req.body.storeName,
      ownerName: req.body.ownerName,
      emailAddress: req.body.emailAddress,
      companyName: req.body.companyName,
      companyId: req.body.companyId,
      phoneNumber: req.body.phoneNumber,
      storeAddress: req.body.storeAddress,
      city: req.body.city,
      county: req.body.county,
      zipCode: req.body.zipCode,
      userName: req.body.userName,
      password: req.body.password,
      aboutStore: req.body.aboutStore,
      tax: req.body.tax,
      isActive: true,
      lat: req.body.lat,
      lng: req.body.lng,
      storeTimings: req.body.storeTimings,
      messageFromStore: req.body.messageFromStore,
      orderCancellationPolicy: req.body.orderCancellationPolicy,
      termsAndCondition: req.body.termsAndCondition
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'store updated'
    })
  });
});

//edit store by id
app.put("/add/user/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Store.updateOne({ _id: req.params.id }, {
    $set: {
      c_info_: req.body.c_info_,
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'store updated'
    })
  });
});

//edit store by id
app.put("/edit/store/orderNum/:id/:oId", async (req, res) => {
  console.log("m", req.params.tId)
  Store.updateOne({ _id: req.params.id }, {
    $set: {
      orderNum: req.params.oId,
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'store updated'
    })
  });
});


//delete store by id
app.put('/block/store/:id',(req, res) => {
  Store.updateOne({ _id: req.params.id }, {
    $set: {
      isActive: false
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'store updated'
    })
  });
}
);

//delete store by id
app.put('/unblock/store/:id',(req, res) => {
  Store.updateOne({ _id: req.params.id }, {
    $set: {
      isActive: true
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'store updated'
    })
  });
}
);


//post store
app.post('/add/company', async (req, res) => {
  console.log(req.body)
  let company = new Company({
    companyName: req.body.companyName,
    ownerName: req.body.ownerName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    aboutCompany: req.body.aboutCompany
  });

  company.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'company not post',
        company,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'company post',
        company,
      })
    }
  });

});


//edit store by id
app.put("/edit/company/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Company.updateOne({ _id: req.params.id }, {
    $set: {
      companyName: req.body.companyName,
    ownerName: req.body.ownerName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    aboutCompany: req.body.aboutCompany
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'company updated'
    })
  });
});


//get all companies
app.get('/get/companies/', (req, res) => {

  Company.find()
  .then(company => {
    res.json(company);
  })
  .catch(err => res.status(404).json(err));
}

);

//get store by id
app.get('/get/company/:id', (req, res) => {

  Company.findOne({ _id: req.params.id })
  .then(company => {
    res.json(company);
  })
  .catch(err => res.status(404).json(err));
}

);





//get all stores
app.get('/get/stores/stats', (req, res) => {

  Store.find({ })
  .then(stores => {
    console.log(stores.length)
    var active =0;
    
    for(var i=0; i<stores.length; i++){
        if(stores[i].isActive){
          active++
        }
    }
    var stats={}
    console.log("as",active, stores.length)
    console.log("sa",stats)
    stats= {
      total: stores.length,
      active: active,
      blocked: stores.length - active
    }
    console.log("sa1",stats)
   
    res.json(stats);
  })
  .catch(err => res.status(404).json(err));
}

);


//get all stores
app.get('/get/orders/stats/:id', (req, res) => {

  Order.find({storeId: req.params.id})
  .then(orders => {
    console.log(orders.length)
    var totalOrders =orders.length;
    var newOrders =0;
    var inPrepOrders=0;
    var readyOrders=0;
    var pickedOrders=0;
    var totalRevenue=0;
    
    for(var i=0; i<orders.length; i++){
        if(orders[i].isAccepted === false && orders[i].isRejected === false){
          newOrders++
        }else if(orders[i].isAccepted === true && orders[i].isPicked === true){
          pickedOrders++
          totalRevenue+=parseFloat(orders[i].totalAmount)
        }else if(orders[i].isAccepted === true && orders[i].isInPreparation === true){
          inPrepOrders++
        }else if(orders[i].isAccepted === true && orders[i].isReady === true){
          readyOrders++
        }
    }
    var stats={}

    stats= {
      totalOrders: totalOrders,
      newOrders: newOrders,
      inPrepOrders: inPrepOrders,
      readyOrders: readyOrders,
      pickedOrders: pickedOrders,
      totalRevenue: totalRevenue
    }
    console.log("sa1",stats)
   
    res.json(stats);
  })
  .catch(err => res.status(404).json(err));
}

);


//get yearly report
app.get('/get/yearly/report/:id', (req, res) => {

  Order.find({storeId: req.params.id, isPicked: true})
  .then(orders => {
    // console.log("HITTTTTTTTTT",orders)
    // var totalOrders =orders.length;
   //  console.log(orders)
    var report=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    var ordersReport=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    var rushHours=[0,0,0,0]
    var guestReturn=[0,0]
    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+'-'+mm+'-'+yyyy;
    // console.log(today);
      var todaysSales =0
      var yearlySales =0

      var totalProducts= []
      var totalQuantity=[]
      var totalUsers=[]

      for(var i=0; i<orders.length; i++){
        // console.log("p",orders[i].products)
        for(var j=0; j< orders[i].products.length; j++){
          // console.log("i",orders[i].products[j].product.productName)
          totalProducts.push(orders[i].products[j].product.productName)
          totalQuantity.push(orders[i].products[j].quantity)
        }
        if(orders[i].userId !== undefined){
          totalUsers.push(orders[i].userId)
        }

        if(orders[i].orderDate === today){
          todaysSales+=parseFloat(orders[i].totalAmount)
        }

        var tim = orders[i].orderTime.split(":")

        if((tim[0] === "8" || tim[0] === "9" || tim[0] === "10" || tim[0] === "11") && orders[i].orderTime.substring(0,10).includes("AM")){
           var temp = rushHours[0]
                temp++
                rushHours[0] = temp
            }else if((tim[0] === "12") && orders[i].orderTime.substring(0,10).includes("AM")){
              var temp = rushHours[1]
              temp++
              rushHours[1] = temp
          }else if((tim[0] === "1" || tim[0] === "2" || tim[0] === "3") && orders[i].orderTime.substring(0,10).includes("PM")){
              var temp = rushHours[1]
              temp++
              rushHours[1] = temp
          }else if((tim[0] === "4" || tim[0] === "5" || tim[0] === "6"|| tim[0] === "7") && orders[i].orderTime.substring(0,10).includes("PM")){
            var temp = rushHours[2]
            temp++
            rushHours[2] = temp
          }else if((tim[0] === "8" || tim[0] === "9" || tim[0] === "10"|| tim[0] === "11") && orders[i].orderTime.substring(0,10).includes("PM")){
            var temp = rushHours[3]
            temp++
            rushHours[3] = temp
          }

          console.log("orders[i].isGuestorders[i].isGuest", orders[i].isGuest)
          if(orders[i].isGuest){
            var temp = guestReturn[0]
            temp++
            guestReturn[0] = temp
          }else{
            var temp = guestReturn[1]
            temp++
            guestReturn[1] = temp
          }

          console.log("asdasdasdasdasd",guestReturn)
        var res1 = orders[i].orderDate.split("-");
        var month = res1[1]
        // console.log("smonth", month,res1[2], orders[i].totalAmount)
           var cy = new Date().getFullYear()
          if(parseInt(res1[2]) === cy){
            yearlySales+=parseFloat(orders[i].totalAmount)
          }


          if(month === "01" && parseInt(res1[2]) === cy){
            var temp = report[0]
            temp+=parseFloat(orders[i].totalAmount)
            report[0] = temp

            var temp1= ordersReport[0]
            temp1++
            ordersReport[0] = temp1
          }else if(month === "02" && parseInt(res1[2]) === cy){
           var temp = report[1]
            temp+=parseFloat(orders[i].totalAmount)
            report[1] = temp
            var temp1= ordersReport[1]
            temp1++
            ordersReport[1] = temp1
          }else if(month === "03" && parseInt(res1[2]) === cy){
            var temp = report[2]
             temp+=parseFloat(orders[i].totalAmount)
             report[2] = temp

             var temp1= ordersReport[2]
            temp1++
            ordersReport[2] = temp1
           }else if(month === "04" && parseInt(res1[2]) === cy){
            var temp = report[3]
             temp+=parseFloat(orders[i].totalAmount)
             report[3] = temp

             var temp1= ordersReport[3]
            temp1++
            ordersReport[3] = temp1
           }else if(month === "05" && parseInt(res1[2]) === cy){
            var temp = report[4]
             temp+=parseFloat(orders[i].totalAmount)
             report[4] = temp

             var temp1= ordersReport[4]
            temp1++
            ordersReport[4] = temp1
           }else if(month === "06" && parseInt(res1[2]) === cy){
            var temp = report[5]
             temp+=parseFloat(orders[i].totalAmount)
             report[5] = temp

             var temp1= ordersReport[5]
            temp1++
            ordersReport[5] = temp1
           }else if(month === "07" && parseInt(res1[2]) === cy){
            var temp = report[6]
             temp+=parseFloat(orders[i].totalAmount)
             report[6] = temp

             var temp1= ordersReport[6]
            temp1++
            ordersReport[6] = temp1
           }else if(month === "08" && parseInt(res1[2]) === cy){
            var temp = report[7]
             temp+=parseFloat(orders[i].totalAmount)
             report[7] = temp

             var temp1= ordersReport[7]
            temp1++
            ordordersReporters[7] = temp1
           }else if(month === "09" && parseInt(res1[2]) === cy){
            var temp = report[8]
             temp+=parseFloat(orders[i].totalAmount)
             report[8] = temp

             var temp1= ordersReport[8]
            temp1++
            ordersReport[8] = temp1
           }else if(month === "10" && parseInt(res1[2]) === cy){
            var temp = report[9]
             temp+=parseFloat(orders[i].totalAmount)
             report[9] = temp

             var temp1= ordersReport[9]
            temp1++
            ordersReport[9] = temp1
           }else if(month === "11" && parseInt(res1[2]) === cy){
            var temp = report[10]
             temp+=parseFloat(orders[i].totalAmount)
             report[10] = temp

             var temp1= ordersReport[10]
            temp1++
            ordersReport[10] = temp1
           }else if(month === "12" && parseInt(res1[2]) === cy){
            var temp = report[11]
             temp+=parseFloat(orders[i].totalAmount)
             report[11] = temp

             var temp1= ordersReport[11]
            temp1++
            ordersReport[11] = temp1
           }
      }

      // console.log("totalProducts",totalProducts, totalQuantity)

      var uniqueArray = totalProducts.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      })
      var ccd=[]

      console.log("TOTAL USERS",totalUsers)
      var uniqueUsers= totalUsers.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      })
      console.log("unique user",uniqueUsers)
    // console.log("unique",uniqueArray, totalProducts)
  

    var userNames= []
    var userEmails= []
    var userAmount= []
    for(var i=0; i<uniqueUsers.length; i++){
       var name=0
       var email=0
       var amount=0
        for(var j=0; j<orders.length; j++){

            if(orders[j].userId === uniqueUsers[i]){
              amount+=parseInt(orders[j].totalAmount)
              name= orders[j].name
              email= orders[j].email
            }
        }
        userNames.push(
          name
        )
        userEmails.push(
          email
        )
        userAmount.push(
          amount
        )
    }


      var  totPro =[]
      var names= []
      var quantity= []
      for(var i=0; i<uniqueArray.length; i++){
         var count=0
          for(var j=0; j<totalProducts.length; j++){

              if(totalProducts[j] === uniqueArray[i]){
                count+=parseInt(totalQuantity[j])
              }
          }
          names.push(
            uniqueArray[i]
          )
          quantity.push(
            count
          )
      }
      console.log("best user", userAmount,userEmails,userNames)

      // console.log("tot",totPro)
      // console.log("sd",
      // {
      //   yearlySalesReport: report,
      //   totalTrasactions: orders.length,
      //   todaysSale: todaysSales,
      //   yearlySales: yearlySales,
      //   avgSales: yearlySales/mm,
      //   totalProducts: {
      //     names: names,
      //     quantity: quantity,
      //     colorLength: quantity.length
      //   }
      // }
      // )
    res.json({
      yearlySalesReport: report,
      ordersReport: ordersReport,
      rushHours: rushHours,
      guestReturn: guestReturn,
      totalTrasactions: orders.length,
      todaysSale: todaysSales,
      yearlySales: yearlySales,
      avgSales: yearlySales/mm,
      totalProducts: {
        names: names,
        quantity: quantity,
        colorLength: quantity.length
      },
      bestUsers: {
        names: userNames,
        emails: userEmails,
        amounts: userAmount
      }
    });
  })
  .catch(err => res.status(404).json(err));
}

);

app.get('/get/orders/today/:id/:date', (req, res) => {
  console.log("HITTT", req.params)
  Order.find({storeId: req.params.id})
  .then(orders => {
    const timestamp = require('time-stamp');

    var todaysDate = timestamp('DD-MM-YYYY')
    console.log("date",todaysDate)
    console.log(orders.length)
  
    var todaysOrders =[]
    for(var i=0; i<orders.length; i++){
        console.log("d",i,orders[i].orderDate, req.params.date)

        if(orders[i].orderDate === req.params.date){
          todaysOrders.push(orders[i])
        }
    }
    
    console.log("sa1",todaysOrders.length)
   
    res.json(todaysOrders);
  })
  .catch(err => res.status(404).json(err));
}

);


//get all products of store Id
app.get('/get/order/bynumber/:oId', (req, res) => {

  Order.findOne({orderNumber: req.params.oId })
  .then(order => {
    console.log(order)
    res.json(order);
  })
  .catch(err => res.status(404).json(err));
}

);


//get all products of store Id
app.get('/get/user/:email', (req, res) => {

  User.findOne({email: req.params.email })
  .then(user => {
    console.log(user)
    res.json(user);
  })
  .catch(err => res.status(404).json(err));
}
);

//get all products of store Id
app.get('/get/user/byId/:id', (req, res) => {

  User.findOne({_id: req.params.id })
  .then(user => {
    console.log(user)
    res.json(user);
  })
  .catch(err => res.status(404).json(err));
}
);

//get all products of store Id
app.get('/get/user/number/:mobile', (req, res) => {

  User.findOne({mobile: req.params.mobile })
  .then(user => {
    console.log(user)
    res.json(user);
  })
  .catch(err => res.status(404).json(err));
}

);


app.put('/get/orders/isrejected/:id', (req, res) => {
  console.log("HITTT", req.params)
  Order.findOne({_id: req.params.id})
  .then(orders => {
   var stat= false
    if(orders.isRejected === true){
      stat= true
    }
    res.json(stat);
  })
  .catch(err => res.status(404).json(err));
}

);


//post store
app.post('/add/product', async (req, res) => {
  console.log(req.body)
  let product = new Product({
        storeId: req.body.storeId,
        productName: req.body.productName,
        productType: req.body.productType,
        price: req.body.price,
        discount: req.body.discount,
        productDescription: req.body.productDescription,
        specialInstruction: req.body.specialInstruction,
        servingSize: req.body.servingSize,
        servingPerContainer: req.body.servingPerContainer,
        calories: req.body.calories,
        fatInGm: req.body.fatInGm,
        saturatedFatInGm: req.body.saturatedFatInGm,
        polyunsaturatedFatInGm: req.body.polyunsaturatedFatInGm,
        monounsaturatedFatInGm: req.body.monounsaturatedFatInGm,
        transFatInGm: req.body.transFatInGm,
        protienInGm: req.body.protienInGm,
        cholesterol: req.body.cholesterol,
        sodium: req.body.sodium,
        potassium: req.body.potassium,
        totalCarbs: req.body.totalCarbs,
        dietaryFiber: req.body.dietaryFiber,
        sugar: req.body.sugar,
        noOfImages: req.body.noOfImages,
        disclaimer: req.body.disclaimer,
        isFeatured: req.body.isFeatured,
        featuredQuantity: req.body.featuredQuantity,
        featuredPrice: req.body.featuredPrice,
        featuredSaving: req.body.featuredSaving,
        featuredDetails: req.body.featuredDetails,
        featuredUnit: req.body.featuredUnit,
        isFeatured: false,
        isOutOfStock: false
  });

  product.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'product not post',
        product,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'product post',
        product,
      })
    }
  });

});



//get all products of store Id
app.get('/get/all/products/:sId', (req, res) => {

  Product.find({storeId: req.params.sId })
  .then(products => {
    console.log(products)
    res.json(products);
  })
  .catch(err => res.status(404).json(err));
}

);

//get all featured products of store Id
app.get('/get/all/featured/products/:sId', (req, res) => {

  Product.find({storeId: req.params.sId, isFeatured: true })
  .then(products => {
    console.log(products)
    res.json(products);
  })
  .catch(err => res.status(404).json(err));
}

);


//get product by id
app.get('/get/product/:id', (req, res) => {

  Product.findOne({ _id: req.params.id })
  .then(store => {
    res.json(store);
  })
  .catch(err => res.status(404).json(err));
}

);

//get product by id
app.get('/get/product/quantity/:name', (req, res) => {
    console.log(req.params.name)
  Product.findOne({ productName: req.params.name })
  .then(store => {
    console.log("store",store)
    res.json(store.quantity);
  })
  .catch(err => res.status(404).json(err));
}

);


//edit product by id
app.put("/edit/product/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Product.updateOne({ _id: req.params.id }, {
    $set: {
      storeId: req.body.storeId,
      productName: req.body.productName,
      productType: req.body.productType,
      price: req.body.price,
      discount: req.body.discount,
      productDescription: req.body.productDescription,
      specialInstruction: req.body.specialInstruction,
      servingSize: req.body.servingSize,
      servingPerContainer: req.body.servingPerContainer,
      calories: req.body.calories,
      fatInGm: req.body.fatInGm,
      saturatedFatInGm: req.body.saturatedFatInGm,
      polyunsaturatedFatInGm: req.body.polyunsaturatedFatInGm,
      monounsaturatedFatInGm: req.body.monounsaturatedFatInGm,
      transFatInGm: req.body.transFatInGm,
      protienInGm: req.body.protienInGm,
      cholesterol: req.body.cholesterol,
      sodium: req.body.sodium,
      potassium: req.body.potassium,
      totalCarbs: req.body.totalCarbs,
      dietaryFiber: req.body.dietaryFiber,
      sugar: req.body.sugar,
      disclaimer: req.body.disclaimer,
      isFeatured: req.body.isFeatured,
      featuredQuantity: req.body.featuredQuantity,
      featuredPrice: req.body.featuredPrice,
      featuredSaving: req.body.featuredSaving,
      featuredDetails: req.body.featuredDetails,
      featuredUnit: req.body.featuredUnit,
      isFeatured: req.body.isFeatured,
      isOutOfStock: req.body.isOutOfStock,
      outOfStockDate: req.body.outOfStockDate 

    }
  }, { upsert: true }, function (err, product) {
    res.status(200).send({
      success: 'true',
      message: 'product updated',
      product: product
    })
  });
});


//edit store by id in inventory
app.put("/edit/inventory/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Product.updateOne({ _id: req.params.id }, {
    $set: {
      quantity: req.body.quantity,
      expDate: req.body.expDate
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'product updated'
    })
  });
});

//edit store by id in inventory
app.put("/edit/favourites/:id", async (req, res) => {
  console.log("m", req.body)
  Product.updateOne({ _id: req.params.id }, {
    $set: {
      favourites: req.body.favourites,
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'favourite updated'
    })
  });
});



//edit store by id in inventory
app.put("/add/featured/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Product.updateOne({ _id: req.params.id }, {
    $set: {
      discount: req.body.discount,
      featuredDetails: req.body.featuredDetails,
      isFeatured: req.body.isFeatured,
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'product updated as featured'
    })
  });
});


//edit store by id in inventory
app.put("/delete/featured/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Product.updateOne({ _id: req.params.id }, {
    $set: {
      isFeatured: false,
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'product updated as featured'
    })
  });
});


//edit store by id in inventory
app.put("/add/outOfStock/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Product.updateOne({ _id: req.params.id }, {
    $set: {
      isOutOfStock: req.body.isOutOfStock,
      outOfStockDate: req.body.outOfStockDate,
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'product updated as out of stock'
    })
  });
});



//edit store by id in inventory
app.put("/edit/product/quantity/:id", (req, res) => {
  console.log("mSGHJGGJjSGHJGGJjSGHJGGJjSGHJGGJj", req.body, req.params)
  for(var i=0; i<req.body.products.length; i++){
    console.log("SGHJGGJj",parseInt(req.body.products[0].quantity) ,parseInt(req.body.products[0].reqQuantity))
    Product.updateOne({ productName: req.body.products[i].name }, {
      $set: {
        quantity: parseInt(req.body.products[i].quantity) - parseInt(req.body.products[i].reqQuantity)
        }
    }, { upsert: true }, function (err, user) {
     
    });
  }
  res.status(200).send({
    success: 'true',
    message: 'product  quantity updated'
  })
  
});

//delete product by id
app.delete('/delete/product/:id',(req, res) => {
  Product.findOne({ _id: req.params.id }).then(store => {
    store.remove().then(() => res.json({ success: true, message: "store deleted" }));
  });
}
);


//post order
app.post('/add/order', async (req, res) => {
  console.log(req.body)
  let order = new Order({
    storeId: req.body.storeId,
    products: req.body.products,
    totalAmount:req.body.totalAmount,
    tax: req.body.tax,
    orderNumber: req.body.orderNumber,
    storeName: req.body.storeName,
    storeAddress: req.body.storeAddress,
    storePhone: req.body.storePhone,
    userId: req.body.userId,
    name:req.body.name,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone:req.body.phone,
    email: req.body.email,
    address: req.body.address,
    orderTime: req.body.orderTime,
    orderDate: req.body.orderDate,
    postDate: req.body.postDate,
    postTime: req.body.postTime,
    orderTimeZone: req.body.orderTimeZone,
    isGuest: req.body.isGuest,    
    isReady: false,
    isAccepted: false,
    isRejected: false,
    isSomeOneElse: req.body.isSomeOneElse,
    someoneElseFirstName: req.body.someoneElseFirstName,
    someoneElseLastName: req.body.someoneElseLastName,
    someoneElseEmail: req.body.someoneElseEmail,
    someoneElseEmail: req.body.someoneElseEmail,
    someoneElseEmail: req.body.someoneElseEmail

  });

  order.save(function (err,order1) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'order not post',
        order1,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'order post',
        order1,
      })
    }
  });

});


//get all order of store Id
app.get('/get/all/orders/:sId', (req, res) => {

  Order.find({storeId: req.params.sId, isAccepted: false, isRejected: false })
  .then(orders => {
    console.log(orders)
    res.json(orders);
  })
  .catch(err => res.status(404).json(err));
}

);

//get all preparration state order of store Id
app.get('/get/all/preparation/orders/:sId', (req, res) => {

  Order.find({storeId: req.params.sId, isAccepted: true, isInPreparation: true })
  .then(orders => {
    console.log(orders)
    res.json(orders);
  })
  .catch(err => res.status(404).json(err));
}

);


//get all ready state order of store Id
app.get('/get/all/ready/orders/:sId', (req, res) => {

  Order.find({storeId: req.params.sId, isAccepted: true, isInPreparation: false ,isReady: true })
  .then(orders => {
    console.log(orders)
    res.json(orders);
  })
  .catch(err => res.status(404).json(err));
}

);

//get all picked state order of store Id
app.get('/get/all/picked/orders/:sId', (req, res) => {

  Order.find({storeId: req.params.sId, isAccepted: true, isInPreparation: false ,isReady: false, isPicked: true })
  .then(orders => {
    console.log(orders)
    res.json(orders);
  })
  .catch(err => res.status(404).json(err));
}

);

//get one order of store Id and order Id
app.get('/get/one/order/:sId/:oId', (req, res) => {

  Order.findOne({storeId: req.params.sId, _id: req.params.oId })
  .then(order => {
    console.log(order)
    res.json(order);
  })
  .catch(err => res.status(404).json(err));
}

);

//get one order of store Id and order Id
app.get('/get/my/orders/:uId', (req, res) => {
    console.log("hiy",req.params)
  Order.find({userId: req.params.uId })
  .then(order => {
    console.log(order)
    res.json(order);
  })
  .catch(err => res.status(404).json(err));
}

);


//edit order state by id
app.put("/edit/order/accept/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Order.updateOne({ _id: req.params.id }, {
    $set: {
        isAccepted: true,
        isInPreparation: true
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'order updated'
    })
  });
});

//edit order state by id
app.put("/edit/order/reject/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Order.updateOne({ _id: req.params.id }, {
    $set: {
        isRejected: true,
        isAccepted: false
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'order updated'
    })
  });
});

//edit order state by id
app.put("npm :id", async (req, res) => {
  console.log("m", req.params.tId)
  Order.updateOne({ _id: req.params.id }, {
    $set: {
        isRejected: true
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'order updated'
    })
  });
});


//edit order state by id
app.put("/edit/order/ready/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Order.updateOne({ _id: req.params.id }, {
    $set: {
        isReady: true,
        isInPreparation: false
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'order updated'
    })
  });
});

//edit picked order state by id
app.put("/edit/order/picked/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Order.updateOne({ _id: req.params.id }, {
    $set: {
        isReady: false,
        isPicked: true
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'order updated'
    })
  });
});

//Login to store
app.get('/login/:email/:password', async (req, res) => {
  console.log(req.params)
  // Store.findOne({ userName: req.params.email })

       //  Now find the user by their email address
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
        return res.status(200).send('Email does not exist.');
    }
 
    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.params.password, user.password);
    if (!validPassword) {
        return res.status(200).send('Incorrect password.');
    }
 
    // const token = jwt.sign({ _id: user._id }, "THENODEPRIVATEKEYWITHJWTAUTH__3");
    // res.send({token: token, user: user});

          Store.findOne({ c_info_: { $elemMatch: { c_uName_: req.params.email } } })
                    
                    .then(store => {

                      // console.log(store.c_info_)
                      // var isMatched=false
                      // for(var i=0; i<store.c_info_.length; i++){
                      //   console.log("asdsds",i, store.c_info_[i].c_passWd_, req.params.password )
                      //     if(req.params.password === store.c_info_[i].c_passWd_){
                      //         isMatched= true
                      //     }
                      // }
                      // console.log("isMatched",isMatched)
                      // if(isMatched){
                        if(!store.isActive){
                          var msg="Store is currently blocked, contact out admin department."
                          res.json(msg);
                        }else{
                          res.json(store);
                        }
                      // }else{
                      //   var msg="Sorry, Login credentials are incorrect."
                      //   res.json(msg);

                      // }
                      // console.log(store)
                    })
                    .catch(err => res.json(err));
                  
                  


});


//post category
app.post('/add/location', async (req, res) => {
  console.log(req.body)
  let location = new Location({
    refId: req.body.refId,
    type: req.body.type,
    address1: req.body.address1,
    address2: req.body.address2,
    city:req.body.city,
    country:req.body.country,
    zipCode:req.body.zipCode,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  location.save(function (err,resp) {
    console.log(resp)
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'location not post',
        location,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'location post',
        location,
      })
    }
  });

});


//post category
app.post('/add/category', async (req, res) => {
  console.log(req.body)
  let category = new Category({
    category: req.body.category
  });

  category.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'category not post',
        category,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'category post',
        category,
      })
    }
  });

});

//get all categories
app.get('/get/location/:id', (req, res) => {

  Location.find({refId: req.params.id, type: "Customer"})
  .then(location => {
    console.log(location)
    res.json(location);
  })
  .catch(err => res.status(404).json(err));
}

);


//delete location by id
app.delete('/delete/location/:id',(req, res) => {
  console.log("sdS",req.params.id)
  Location.findOne({ refId: req.params.id, type: "Customer" }).then(lc => {
    lc.remove().then(() => res.json({ success: true, message: "location deleted" }));
  });
}
);

//get all categories
app.get('/get/location/company/:id', (req, res) => {

  Location.find({refId: req.params.id, type: "Company"})
  .then(location => {
    console.log(location)
    res.json(location);
  })
  .catch(err => res.status(404).json(err));
}

);

//get all categories
app.get('/get/location/store/:id', (req, res) => {
  Location.find({refId: req.params.id, type: "Store"})
  .then(location => {
    console.log(location)
    res.json(location);
  })
  .catch(err => res.status(404).json(err));
}
);

//edit categpory by id
app.put("/edit/location/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Location.updateOne({ _id: req.params.id }, {
    $set: {
      address1: req.body.address1,
      address2: req.body.address2,
      city:req.body.city,
      country:req.body.country,
      zipCode:req.body.zipCode
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'location updated'
    })
  });
});




//get all categories
app.get('/get/all/categories', (req, res) => {

  Category.find()
  .then(category => {
    console.log(category)
    res.json(category);
  })
  .catch(err => res.status(404).json(err));
}

);


//get all order of store Id
app.get('/get/category/:id', (req, res) => {

  Category.findOne({_id: req.params.id})
  .then(category => {
    console.log(category)
    res.json(category);
  })
  .catch(err => res.status(404).json(err));
}

);


//edit categpory by id
app.put("/edit/category/:id", async (req, res) => {
  console.log("m", req.params.tId)
  Category.updateOne({ _id: req.params.id }, {
    $set: {
      category: req.body.category

    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'category updated'
    })
  });
});

//delete product by id
app.delete('/delete/category/:id',(req, res) => {
  Category.findOne({ _id: req.params.id }).then(category => {
    category.remove().then(() => res.json({ success: true, message: "category deleted" }));
  });
}
);


//post category
app.post('/add/subCategory', async (req, res) => {
  console.log(req.body)
  let category = new SubCategory({
    superCategory: req.body.superCategory,
    subCategory: req.body.subCategory,
    storeId: req.body.storeId
  });

  category.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'category not post',
        category,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'category post',
        category,
      })
    }
  });

});


//get all categories
app.get('/get/all/subCategories', (req, res) => {

  SubCategory.find()
  .then(category => {
    console.log(category)
    res.json(category);
  })
  .catch(err => res.status(404).json(err));
}

);


//get all order of store Id
app.get('/get/subCategory/:id', (req, res) => {

  SubCategory.findOne({_id: req.params.id})
  .then(category => {
    console.log(category)
    res.json(category);
  })
  .catch(err => res.status(404).json(err));
}

);


//edit categpory by id
app.put("/edit/subCategory/:id", async (req, res) => {
  console.log("m", req.params.tId)
  SubCategory.updateOne({ _id: req.params.id }, {
    $set: {
      subCategory: req.body.subCategory,
      superCategory: req.body.superCategory
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'category updated'
    })
  });
});

//delete product by id
app.delete('/delete/subCategory/:id',(req, res) => {
  SubCategory.findOne({ _id: req.params.id }).then(category => {
    category.remove().then(() => res.json({ success: true, message: "category deleted" }));
  });
}
);


//post favourite
app.post('/add/favourite', async (req, res) => {
  console.log(req.body)
  let favourite = new Favourite({
    storeName: req.body.storeName,
    userId: req.body.userId,
    product: req.body.product
  });

  favourite.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'favourite not post',
        favourite,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'favourite post',
        favourite,
      })
    }
  });

});



//get all favourites
app.get('/get/all/favourites/:id', (req, res) => {

  Favourite.find({userId: req.params.id})
  .then(fav => {
    console.log(fav)
    res.json(fav);
  })
  .catch(err => res.status(404).json(err));
}

);

//delete favourite by id
app.delete('/delete/favourite/:uid/:pid',(req, res) => {
  Favourite.findOne({ userId: req.params.uid, "product._id": req.params.pid }).then(favourite => {
    favourite.remove().then(() => res.json({ success: true, message: "favourite deleted" }));
  });
}
);



//post user
app.get('/api/email/verification/:email/:num', async (req, res) => {
  console.log(req.body)


  var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  }
  
  var transporter = nodemailer.createTransport(transport)

ejs.renderFile("./view/VerifyEmail.ejs",  { email:  Buffer.from(req.params.email).toString('base64'), num: req.params.num }, function (err, data) {
  if (err) {
      console.log(err);
  } else {
      var mainOptions = {
          from: 'The Node',
          to: req.params.email,
          // to: "shahacademy333@gmail.com",
          subject: 'The Node Email Verification',
          html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
              console.log(err);
          } else {
              console.log('Message sent: ' + info.response);
          }
      });
  }
  
  });
  return res.send("USER email done")
 
});


//post user
app.get('/api/number/verification/:number1/:num', async (req, res) => {
  console.log("HIT", req.params)

  client.messages
  .create({
     body: ' Hi User, Thanks for your interest in joining The Node! To complete your registration please Enter Code: '+req.params.num+' in your mobile.',
     from: '+12055707812',
     to: req.params.number1
   })
  .then(message => {
    console.log("messgae",message)
    res.send(message.sid)
  })
  .catch(err => console.log("errr",err));
});



app.get('/api/forgot/password/:email', async (req, res) => {
  console.log(req.body)

  var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  }
  
  var transporter = nodemailer.createTransport(transport)

ejs.renderFile("./view/ForgotPass.ejs",  { email:  Buffer.from(req.params.email).toString('base64') }, function (err, data) {
  if (err) {
      console.log(err);
  } else {
      var mainOptions = {
          from: 'The Node',
          to: req.params.email,
          subject: 'The Node Forgot Password',
          html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
              console.log(err);
          } else {
              console.log('Message sent: ' + info.response);
          }
      });
  }
  
  });
  return res.send("USER email done")
 
});


app.put("/api/change/password/:email", async (req, res) => {
  console.log(req.body)

  const salt = await bcrypt.genSalt(10);
  var password = await bcrypt.hash(req.body.password, salt);

  User.updateOne({
    email: req.params.email
  }, {
    $set: {
      password: password
    }
  }, {
    upsert: true
  }, function (err, user) {
    if(err){
      res.status(200).send({
        success: 'false',
        message: 'user verified'
      })
    }else{
      res.status(200).send({
        success: 'true',
        message: 'user verified'
      })
    }
    
  });
});



app.post('/api/contactus/:id', async (req, res) => {
  console.log(req.body, req.params)

  var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  }
  
  var transporter = nodemailer.createTransport(transport)

ejs.renderFile("./view/ContactUs.ejs",  { name: req.body.name, message: req.body.message, email: req.body.email }, function (err, data) {
  if (err) {
      console.log(err);
  } else {
      var mainOptions = {
          from: req.body.email,
          to: "thenodeteam@gmail.com",
          subject: req.body.subject,
          html: data
      };
      transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
              console.log(err);
          } else {
              console.log('Message sent: ' + info.response);
          }
      });
  }
  
  });
  return res.send("success")
 
});



// app.put("/add/picId/:id/:fn", async (req, res) => {
//   console.log("m", req.params.tId)
//   Blog.updateOne({ _id: req.params.id }, {
//     $set: {
//       picId: req.params.fn
//     }
//   }, { upsert: true }, function (err, user) {
//     res.status(200).send({
//       success: 'true',
//       message: 'blog updated'
//     })
//   });
// });

// app.get('/hello', (req, res) => {
//   res.json("Hello Aijaz");
// }
// );
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());


// //delete blog by id
// app.delete('/delete/blog/:id',(req, res) => {
  
//   Blog.findOne({ _id: req.params.id }).then(blog => {
//     blog.remove().then(() => res.json({ success: true, message: "blog deleted" }));
//   });
// }
// );


// app.get('/get/oneblog/:id', (req, res) => {

//   Blog.findOne({ _id: req.params.id })
//   .then(blog => {
//     res.json(blog);
//   })
//   .catch(err => res.status(404).json(err));
// }

// );

// //edit register player slot partnerId
// app.put("/edit/blog/:id", async(req,res) =>{
//   console.log("sadddddd",req.params)
//   Blog.updateOne({_id: req.params.id}, { 
//         $set: { 
//           title: req.body.title,
//           description: req.body.description,
//           feature: req.body.feature,
//           time: req.body.time,
//           blogImage: req.body.imageLink
//         }
//   }, {upsert:true}, function (err, user) {
//             res.status(200).send({
//                 success: 'true',
//                 message: 'player edit done'
//             })
//     });
// })

// //get all msgs  
// app.get("/get/messages", async (req, res) => {
//   console.log("call")
//   var result = await Message.find().exec();
//   res.status(200).send({
//     success: 'true',
//     message: 'msg get Success',
//     result
//   })
// });

// //get all blogs  
// app.get("/get/blogs", async (req, res) => {
//   console.log("call")
//   var result = await Blog.find().exec();
//   res.status(200).send({
//     success: 'true',
//     message: 'blog get Success',
//     result
//   })
// });

// //get all videos  
// app.get("/get/videos", async (req, res) => {
//   console.log("call")
//   var result = await Video.find().exec();
//   res.status(200).send({
//     success: 'true',
//     message: 'videos get Success',
//     result
//   })
// });


// // Register Proccess
// app.post('/register', function (req, res) {
//   console.log(req.body)

//   User.findOne({ userName: req.body.userName })
//     .then(response => {
//       console.log("check user", response)
//       // res.send(response)

//       if (response === null) {
//         let newUser = new User({
//           userName: req.body.userName,
//           email: req.body.email,
//           mobile: req.body.mobile,
//           password: req.body.password
//         });

//         bcrypt.genSalt(10, function (err, salt) {
//           bcrypt.hash(newUser.password, salt, function (err, hash) {
//             if (err) {
//               console.log(err);
//             }
//             newUser.password = hash;
//             newUser.save(function (err) {
//               if (err) {
//                 console.log(err);
//                 return;
//               } else {
//                 res.send("registered")

//               }
//             });
//           });
//         });
//       } else {
//         res.send("exist")

//       }
//     })


// });

// // Login Process
// app.post('/login',
//   function (req, res) {
//     console.log("login req", req.body)

//     User.findOne({ userName: req.body.userName })
//       .then(response => {
//         console.log("resp1", response)

//         var pass = response.password;
//         console.log("pass", pass)

//         bcrypt.compare(req.body.password, response.password, function (err, isMatch) {
//           if (err) throw err;
//           if (isMatch) {
//             res.send("match")
//           } else {
//             res.send("wrong")
//           }
//         })

//       })
//       .catch(err => res.status(404).json(err));
//   }
// );



// //post msg
app.post('/contact', async (req, res) => {
  console.log(req.body)
  let msg = new ContactUs({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    message: req.body.message,
    subject: req.body.subject
  });

  msg.save(function (err) {
    if (err) {
      console.error(err);
      res.status(200).send({
        success: 'false',
        message: 'msg failed',
        msg,
      })
    } else {
      res.status(200).send({
        success: 'true',
        message: 'msg post',
        msg,
      })
    }
  });

});

// //post blog
// app.post('/post/blog', async (req, res) => {
//   console.log(req.body)
//   let blog = new Blog({
//     title: req.body.title,
//     description: req.body.description,
//     feature: req.body.feature,
//     time: req.body.time,
//     blogImage: req.body.imageLink
//   });
//   blog.save(function (err) {
//     if (err) {
//       console.error(err);
//       res.status(500).send({
//         success: 'false',
//         message: 'blog not post',
//         blog,
//       })
//     } else {
//       res.status(200).send({
//         success: 'true',
//         message: 'blog post',
//         blog,
//       })
//     }
//   });

// });

// //post video
// app.post('/post/video', async (req, res) => {
//   console.log(req.body)
//   let blog = new Video({
//     title: req.body.title,
//     description: req.body.description,
//     feature: req.body.feature,
//     time: req.body.time,
//     videoUrl:req.body.videoUrl,
//   });
//   blog.save(function (err) {
//     if (err) {
//       console.error(err);
//       res.status(500).send({
//         success: 'false',
//         message: 'blog not post',
//         blog,
//       })
//     } else {
//       res.status(200).send({
//         success: 'true',
//         message: 'blog post',
//         blog,
//       })
//     }
//   });

// });

//edit store by id
app.put("/edit/user/name/:id/:name", async (req, res) => {
  console.log("m", req.params)
  User.updateOne({ _id: req.params.id }, {
    $set: {
      firstName: req.params.name
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'name updated'
    })
  });
});


app.put("/edit/user/lastName/:id/:name", async (req, res) => {
  console.log("m", req.params)
  User.updateOne({ _id: req.params.id }, {
    $set: {
      lastName: req.params.name
    }
  }, { upsert: true }, function (err, user) {
    res.status(200).send({
      success: 'true',
      message: 'name updated'
    })
  });
});


// logout
app.get('/logout', function (req, res) {
  req.logout();
  // req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
