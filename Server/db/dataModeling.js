const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    username:String,
    password:String,
    posts:[{type: mongoose.Schema.Types.ObjectId, ref:'Image'}],
    following:[{type: mongoose.Schema.Types.ObjectId, ref:'AllUsers'}]
})
const allUsersSchema=new mongoose.Schema({
    username:String
})
const imgSchema=new mongoose.Schema({
    image:String,
    description:String
})
const profileImageSchema=new mongoose.Schema({
    username:String,
    image:{type:String, default:'default.png'}
})
const publicPostsSchema=new mongoose.Schema({
    username:String,
    fullName:String,
    profileImage:String,
    image:String,
    description:String,
    likedBy:[{type: mongoose.Schema.Types.ObjectId, ref:'AllUsers'}],
    noOfLikes:{type:Number, default:0},
    comments:[{comment:String, username:{type: mongoose.Schema.Types.ObjectId, ref:'AllUsers'}}]
})

const Image=mongoose.model('Image', imgSchema)
const User=mongoose.model('User', userSchema)
const ProfileImage=mongoose.model('ProfileImage', profileImageSchema)
const Posts=mongoose.model('Posts', publicPostsSchema)
const AllUsers=mongoose.model('AllUsers', allUsersSchema)

module.exports={User, Image, ProfileImage, Posts, AllUsers}