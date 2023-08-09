const express=require('express')
const {User, Image, ProfileImage, Posts, AllUsers}=require('../db/dataModeling')
const {jwtGenerate, jwtAuthenticate}=require('../middleware/auth')
const path=require('path')
const router=express.Router()
const {upload}=require('../middleware/upload')
const cors=require('cors')

router.use(express.static('public'))

router.get('/comments/:id', jwtAuthenticate, async (req, res)=>{
    const id=req.params.id
    const post=await Posts.findById(id)
    const comments=post.comments
    const allComments=[]
    for (let comment of comments){
        const ObjectId=comment.username
        const user=await ProfileImage.findById(ObjectId)
        allComments.push({username:user.username, profileImage:user.image, comment:comment.comment})
    }
    res.status(200).json(allComments)
})

router.post('/comment/:id', jwtAuthenticate, async (req, res)=>{
    const comment=req.body.comment
    const post=await Posts.findById(req.params.id)
    const user=await ProfileImage.findOne({username:req.user.username})
    post.comments.push({comment:comment, username:user})
    await post.save()
    res.status(200).json({message:'comment posted'})
})

router.get('/liked/:id', jwtAuthenticate, async (req, res)=>{
    const id=req.params.id
    const user=await Posts.findOne({_id:id}).populate('likedBy')
    const userLiked=user.likedBy.find(user=>user.username===req.user.username)
    if (userLiked){
        res.status(200).json({liked:true})
    }
    else{
        res.status(200).json({liked:false})
    }
})

router.post('/like/:id', jwtAuthenticate, async (req, res)=>{
    const id=req.params.id
    const user=await Posts.findOne({_id:id}).populate('likedBy')
    const userLiked=user.likedBy.find(user=>user.username===req.user.username)
    if (userLiked){
        let newLikedBy=[]
        user.likedBy.forEach((user)=>{
            if (userLiked!==user){
                newLikedBy.push(user)
            }
        })
        user.likedBy=newLikedBy
        user.save()
        user.noOfLikes-=1
        res.status(200).json({message:'like removed'})
    }
    else{
        const likedByUser=await AllUsers.findOne({username:req.user.username})
        user.noOfLikes+=1
        user.likedBy.push(likedByUser)
        await user.save()
        res.status(200).json({message:'liked'})
    }
})

router.get('/followers', jwtAuthenticate, async (req, res)=>{
    const user=await User.findOne({username:req.user.username}).populate('following')
    res.status(200).json(user.following)
})

router.delete('/unfollow/:username', jwtAuthenticate, async (req, res)=>{
    const username=req.params.username
    const user=await User.findOne({username:req.user.username}).populate('following')
    var newList=[]
    user.following.map((user)=>{
        if (user.username!==username){
            newList.push(user)
        }
    })
    user.following=newList
    await user.save()
    res.status(200).json({message:'unfollowed'})
})

router.post('/follow', jwtAuthenticate, async (req, res)=>{
    const username=req.headers.username
    const user=await AllUsers.findOne({username:username})
    const currentUser=await User.findOne({username:req.user.username})
    currentUser.following.push(user)
    await currentUser.save()
})

router.get('/getUser', jwtAuthenticate, async (req, res)=>{
    const user=await User.findOne({username:req.user.username})
    res.status(200).json(user)
})

router.delete('/deletePost', jwtAuthenticate, async (req, res)=>{
    const imageName=req.headers.image
    await Image.findOneAndDelete({image:imageName})
    res.status(200).json({message:'Post deleted'})
})

router.get('/profileImage/:username', jwtAuthenticate, async (req, res)=>{
    const username=req.params.username
    const image=await ProfileImage.findOne({username:username})
    if (!image){
        res.status(200).json({image:'default.png'})
    }
    else{
        res.json({image:image.image})
    }
})

router.get('/getPosts/:username', jwtAuthenticate, async (req, res)=>{
    const username=req.params.username
    const user=await User.findOne({username:username}) 
    const posts=await Image.find({_id:user.posts})
    res.status(200).json(posts)
})

router.get('/profileDetails/:user', jwtAuthenticate, async (req, res)=>{
    const username=req.params.user
    const user=await User.findOne({username:username})
    res.status(200).json(user)
})

router.get('/feedPosts', jwtAuthenticate, async (req, res)=>{
    const posts= await Posts.find({}).sort({_id:-1})
    const user = await User.findOne({username:req.user.username}).populate('following')
    
    const userFollow=user.following

    let allowedPost=[]
    posts.map((post)=>{
        userFollow.map((user)=>{
            if (user.username==post.username){
                allowedPost.push(post)
            }
        })
    })
    res.status(200).json(allowedPost)
})

router.get('/publicPosts', jwtAuthenticate, async (req, res)=>{
    const posts=await Posts.find({}).sort({_id:-1})
    res.status(200).json(posts)
})

router.post('/profileImage', jwtAuthenticate, upload.single('file'), async (req, res)=>{
    const user=await ProfileImage.findOne({username:req.user.username})
    if (user){
        user.image=req.file.filename
        await user.save()
    }
    else{
        const newUser=new ProfileImage({username:req.user.username, image:req.file.filename})
        await newUser.save()
    }
    res.status(200).json({image: req.file.filename, message:'Profile pic updated.'})
})

router.get('/profileImage', jwtAuthenticate, async (req, res)=>{
    const image=await ProfileImage.findOne({username:req.user.username})
    if (!image){
        res.json({image:'default.png'})
    }
    else{
        res.json({image:image.image})
    }
})

async function UpdateAllUsername(oldUsername, username){
    await ProfileImage.findOneAndUpdate({username: oldUsername}, {username:username})
    Posts.find({username:oldUsername}).then((records)=>{
        records.forEach((record)=>{
            record.username=username
        })
        return Promise.all(records.map(record=>record.save()))
    })
    await AllUsers.findOneAndUpdate({username:oldUsername}, {username:username})
}

router.put('/updateUser', jwtAuthenticate, async (req, res)=>{
    const {fullName, username, email}=req.body
    const user=await User.findOne({username:req.user.username})
    if (fullName!==''){
        user.fullName=fullName
    }
    if (username!==''){
        const oldUsername=user.username
        user.username=username
        UpdateAllUsername(oldUsername, username)
    }
    if (email!==''){
        user.email=email
    }
    await user.save()
    const token=jwtGenerate(user.username)
    res.status(201).json({message: 'User details updated', token:token})
})

router.get('/getPosts', jwtAuthenticate, async (req, res)=>{
    const user=await User.findOne({username:req.user.username}) 
    const posts=await Image.find({_id:user.posts})
    res.status(200).json(posts)
})

router.post('/upload', jwtAuthenticate, upload.single('file'), async (req, res)=>{
    const description=req.headers.description
    const user=await User.findOne({username:req.user.username})
    const profileImage=await ProfileImage.findOne({username:user.username})
    const post=new Image({
        image: req.file.filename,
        description: description
    })
    const publicPost=new Posts({
        username:user.username,
        fullName:user.fullName,
        profileImage:profileImage.image,
        image:req.file.filename,
        description:description
    })
    await post.save()
    await publicPost.save()
    user.posts.push(post)
    await user.save()
    res.status(201).json({message:"Post created successfully"})
})
router.get('/getImage', async (req, res)=>{
    Image.find({}).then((image)=>{
        res.json(image)
    }).catch((err)=>{
        res.json(err)
    })
})

router.post('/signup', async (req, res)=>{
    const {fullName, email, username, password}=req.body
    const emailExist=await User.findOne({email})
    const usernameExist=await User.findOne({username})
    if (emailExist){
        res.status(409).json({message:'Email already exists.'})
        return
    }
    else if (usernameExist){
        res.status(409).json({message:'Username already exists.'})
        return
    }
    else{
        const user=new User({fullName, email, username, password})
        const profileImage=new ProfileImage({username:username, image:'default.png'})
        const newUser=new AllUsers({username:username})
        await profileImage.save()
        await user.save()
        await newUser.save()
        res.status(201).json({message:'User created successfully.'})
    }
})

router.post('/signin', async (req, res)=>{
    const {emailOrUsername, password}=req.body
    const userExist=await User.findOne({$or:[{email:emailOrUsername}, {username:emailOrUsername}]})
    if (userExist){
        if (userExist.password==password){
            const token=jwtGenerate(userExist.username)
            res.status(201).json({message:'User logged in successfully.', token:token})
        }
        else{
            res.status(401).json({message:'Password is incorrect.'})
        }
    }
    else{
        res.status(409).json({message:'User does not exist.'})
    }
})

router.get('/getUserDetails', jwtAuthenticate, async (req, res)=>{
    const username=req.user.username
    const userExist=await User.findOne({username})
    if (userExist){
        res.status(200).json({
            username:userExist.username,
            fullName:userExist.fullName,
            email:userExist.email
        })
    }
    else{
        res.status(409).json({message:'User does not exist.'})
    }
})

module.exports=router