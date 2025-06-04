import mongoose , {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    userName : {
        type : String,
        required:[true,"username is required!"],
        unique:true,
        trim:true,
        lowercase:true,
        index : true
    },
    email : {
        type : String,
        required:[true,"email is required!"],
        unique:true,
        trim:true,
        lowercase:true,
    },
    fullName : {
        type : String,
        required:[true,"Fullname is required!"],
        index:true
    },
    avatar : {
        type : String, // a url from cludinary is kept in this field
        required :[true,"You must add an avatar of yours!"]
    },
    coverImage :{
        type : String
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    pswd : {
        type: String,
        required: true
    },
    refreshToken : {
        type:String
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified("pswd")) return next()// if isModified is not checked then whenver u save after doing something password will get encrypted again which is expensive 
    this.pswd= await bcrypt.hash(this.pswd,8)
    return next()
});
// the user here gives his original string pswd whereas in databse encrypted form of it is stored
// Therefore we use bcrypt.compare function to verify password
userSchema.methods.checkPswd = async function(password){
    return await bcrypt.compare(password, this.pswd);
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id : this._id,
            userName:this.userName,
            fullName:this.fullName,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
        
    )
}
export const User = mongoose.model('User',userSchema);