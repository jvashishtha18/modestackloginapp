
// import mongoose
const mongoose=require('mongoose');

const GeoSchema=new mongoose.Schema({
    lat: String,
    lng: String

})

const AddressSchema=new mongoose.Schema({
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo:[GeoSchema]
});
const CompanySchema=new mongoose.Schema({
    name: String,
    catchPhrase: String,
    bs:String,
     })
// create model schema object
const UserSchema=new mongoose.Schema({
    name:String ,
    uname:String,
    password: String, 
    email: String,
    // pswd:String,
    address:[AddressSchema],
    phone: String,
    website: String,
    company:[CompanySchema]
});









// map to signup model 
mongoose.model('address', AddressSchema,"address");
mongoose.model('geo', GeoSchema,"geo");
mongoose.model('company', CompanySchema,"company");

const UserModel =mongoose.model('subscribers',UserSchema);

// export the model
module.exports=UserModel;