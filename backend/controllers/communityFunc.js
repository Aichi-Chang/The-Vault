const Community = require('../models/Community')


// GET all 
function index(req, res) {
  Community
    .find()
    .populate('user')
    .then(communities => res.status(200).json(communities))
    .catch(err => console.log(err))
}


//GET single 
function show(req, res) {
  Community
    .findById(req.params.id)
    .then(community => {
      if (!community) res.status(404).json({ message: ' Article Not Found' })
      else res.status(200).json(community)
    })
    .catch(err => console.log(err))
}



//PUT user likes articles
// function updateLikes(req, res) {
//   req.body.user = req.currentUser
//   console.log(req.currentUser)
//   Community
//     .findById(req.params.id)
//     .then(community => {
//       if (!community) res.status(404).json({ message: ' Article Not Found' })

//       return res.json(community._id)
//     })
//     .catch(err => console.log(err))
// }



//DELETE user likes articles
// function removeLikes(req, res) {
//   req.body.user = req.currentUser
//   Community
//     .findById(req.params.id)
//     .then(community => {
//       if (!community) return res.status(404).json({ message: 'Article Not Found' })
      
//       const likeById = community.likes.id(req.params.likeId)
//       likeById.remove()

//       res.status(410).json(community)
//       return community.save()
//     })
//     .catch(err => console.log(err))
// }



//POST comment
function createComment(req, res) {
  req.body.user = req.currentUser
  Community
    .findById(req.params.id)
    .populate('comment.user')
    .then(community => {
      if (!community) return res.status(404).json({ message: 'Item Not Found' })
      
      community.comments.push(req.body)
      
      res.status(201).json({ message: 'Comment Added' })
      return community.save()
    })
    .catch(err => console.log(err))
}


//DELETE comment
function removeComment(req, res) {
  req.body.user = req.currentUser
  Community
    .findById(req.params.id)
    .then(community => {
      if (!community) return res.status(404).json({ message: 'Item Not Found' })
      
      const commentById = community.comments.id(req.params.commentsId)
      commentById.remove()

      res.status(200).json({ message: 'Comment Deleted' })
      return community.save()
    })
    .catch(err => console.log(err))
}




module.exports = {
  index,
  show,
  createComment,
  removeComment
}