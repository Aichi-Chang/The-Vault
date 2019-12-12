import React, { useState, useEffect } from 'react'
// import UseAxios from '../commonComponents/UseAxios'
import axios from 'axios'
import Auth from '../../lib/auth'
import CommentForm from '../commonComponents/CommentForm'



const SingleCommunity = (props) => {
  const [data, setData] = useState( { comments: [] })


  useEffect(() => {
    fetch(`/api/communities/${props.match.params.id}`)
      .then(res => res.json())
      .then(res => setData(res))
  },[])


  function handleDelete(e) {
    axios.delete(`/api/communities/${props.match.params.id}/comments/${e.target.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
  }

 
  return <div className="section">
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-half-tablet">
          <p className="title">
            {data.title}
          </p>
          <p className="subtitle">
            {data.address}
          </p>
          <p>
            {data.text}
          </p>
        </div>
        <div className="column is-half-tablet">
          <img src={data.image} />
        </div>

        <CommentForm 
          url={`/api/communities/${props.match.params.id}/comments`}
        />

        <div className='columns'>
          <div className='column'>
            {data.comments.map((comment) => 
              <div className="is-half" 
                key={comment._id} > 
                <div>{comment.content}</div>
                <br />
                {/* <div>from {`${Auth.getUser().username}`}</div> */}
                <button className="delete" id={comment._id} onClick={(e) => handleDelete(e)}></button> 
              </div>
            )}
            <div className='column'>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div> 

}


export default SingleCommunity