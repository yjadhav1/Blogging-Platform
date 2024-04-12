import React from 'react'
import { useParams } from 'react-router-dom'
import { post } from '../Data/post.js'
import { useNavigate } from 'react-router-dom'
import './CurrentPost.css'

const CurrentPost = () => {
    const params = useParams()
    const data = post.find((postData) => parseInt(postData.id) === parseInt(params.id))
    console.log(data);
    const navigate = useNavigate();
    function handleBack() {

        navigate('/Displaypost')
    }
  return (
       <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={data.img}
          alt=""
        />
        <h1 className="singlePostTitle">
          {data.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              {data.author}
            </b>
          </span>
                  <span>{ data.date}</span>
        </div>
        <p className="singlePostDesc">
          {data.content}
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
          quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
          eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
          error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
          impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
          odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos! Lorem, ipsum dolor sit amet consectetur.
              </p>
              <button onClick={handleBack}>Back</button>
      </div>
    </div>
  )
}

export default CurrentPost
