import React from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router';
import moment from 'moment'
import './singlearticle.css'


function Singlearticle({id}) {


    const params = useParams()
    const PublicFilder = 'http://localhost:5000/images/'

    const {user} = useSelector(state=>state.auth)
    const {Articles} = useSelector(state=>state.article)
    const singlearticle = Articles.find(Article=>Article._id === id)
    const {title,location,description,tags,likecount,date,articleImage} = singlearticle
    
  return (
    <>
    <section className='singlearticlecontainer1'>
       <div className='singlearticlecontainer2'>
            <div className='singlearticleDiv2'>
                  <div className='side1'>
                      <h2 className='location'>{title}<span>located at     {location}</span></h2>
                      <h4 className='descr' dangerouslySetInnerHTML={{__html: description}}></h4>
                      <p>Fugiat qui ipsum duis excepteur amet veniam ut laborum enim nisi exercitation cupidatat Lorem. Reprehenderit ipsum elit laborum cupidatat fugiat ex Lorem consectetur sunt cillum consectetur velit. Duis laborum enim ex Lorem est laboris. Commodo nostrud proident incididunt ullamco fugiat laboris adipisicing excepteur reprehenderit ipsum ad consequat. Culpa id nisi dolore cillum aliqua ea tempor do quis. Aliqua nisi reprehenderit nostrud pariatur aliqua magna ullamco sint eiusmod exercitation sunt. Velit ex est ipsum laboris non. Ullamco nisi sit consectetur tempor adipisicing eu ex ad irure et.</p>
                  </div>
                  <div className='side2'>
                      <p className='tags' >Tags:{tags}</p>
                      <p className='date' >Posted by {user.name},{moment(date).startOf('day').fromNow()}</p>
                  </div>
            </div>
            <div className='imagecontainer2'>
                <img className='articleimage2' src={PublicFilder + articleImage} alt='articleimage'/>
            </div>
       </div>
    </section>
    </>
  )
}

export default Singlearticle