import React, { useState, useEffect } from 'react'
// import UseAxios from '../commonComponents/UseAxios'
import axios from 'axios'
import Auth from '../../lib/auth'
import CommentForm from '../commonComponents/CommentForm'



const SingleMusic = (props) => {
  const [data, setData] = useState( { comments: [] })


  useEffect(() => {
    fetch(`/api/culture-music/${props.match.params.id}`)
      .then(res => res.json())
      .then(res => setData(res))
  },[])


  function handleDelete(e) {
    axios.delete(`/api/culture-music/${props.match.params.id}/comments/${e.target.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
  }

  // render() {
  //   console.log(this.state.musicAlbum)
  //   if (this.state.err === 404) {
  //     return <h1>404</h1>
  //   }
  return <div className="section">
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-half-tablet">
          <p className="title">
            {this.state.musicAlbum.album}
          </p>
          <p className="subtitle">
            {this.state.musicAlbum.artist}
          </p>
          <p>
            {this.state.musicAlbum.year}
          </p>
          <p>
            {this.state.musicAlbum.summary}
          </p>
          <p> Vault Rating: {this.state.musicAlbum.rating}
          </p>
        </div>
        <div className="column is-half-tablet">
          <img src={this.state.musicAlbum.image} />
        </div>
      </div>
      <div className="column is-half-tablet">
        <img src={data.image} />
      </div>

      <CommentForm 
        url={`/api/culture-music/${props.match.params.id}/comments`}
      />

      <div className='columns'>
        <div className='column'>
          {data.comments.map((comment) => 
            <div className="is-half" 
              key={comment._id} > 
              <div>{comment.content}</div>
              <br />
              <div>from {`${Auth.getUser().username}`}</div>
              <button className="delete" id={comment._id} onClick={(e) => handleDelete(e)}></button> 
            </div>
          )}
          <div className='column'>
          </div>
        </div>
      </div> 
    </div>
  </div>


}


export default SingleMusic