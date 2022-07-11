import React, { useEffect, useState } from 'react'
 import { Tooltip, Icon } from 'antd';
 import axios from 'axios';
 import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
 import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
 import ThumbUpIcon from '@material-ui/icons/ThumbUp';
 import ThumbDownIcon from '@material-ui/icons/ThumbDown';
 function LikeDislikes(props) {

     const [Likes, setLikes] = useState(0)
     const [Dislikes, setDislikes] = useState(0)
     const [LikeAction, setLikeAction] = useState('grey')
     const [DislikeAction, setDislikeAction] = useState('grey')
     let variable = {};

     
    variable = { videoId: props.videoId, userId: props.userId }
     


     useEffect(() => {
        console.log(variable)
         axios.post('/getLikes', variable)
             .then(response => {
                 if (response.data) {
                     //How many likes does this video have
                     console.log(response.data)
                     setLikes(response.data.likes.length)

                     //if I already click this like button or not 
                     response.data.likes.map(like => {
                         console.log(response.data.likes)
                         if (like.userId === variable.userId) {
                             setLikeAction('white')
                         }
                     })
                 } else {
                     alert('Failed to get likes')
                 }
             })

         axios.post('/getDislikes', variable)
             .then(response => {
                 if (response.data) {
                     //How many likes does this video or comment have 
                     setDislikes(response.data.dislikes.length)

                     //if I already click this like button or not 
                     response.data.dislikes.map(dislike => {
                         if (dislike.userId === variable.userId) {
                             setDislikeAction('white')
                         }
                     })
                 } else {
                     alert('Failed to get dislikes')
                 }
             })

     })

     const onLike = () =>{
        console.log(variable)
        if(LikeAction === 'grey'){
            axios.post('/uplike',variable)
            .then(response=>{
                console.log(response.data)
                if(response.data.success){

                    setLikes(Likes+1)
                    setLikeAction('white')
                    if(DislikeAction!=='grey'){
                        setDislikeAction('grey')
                    
                    setDislikes(Dislikes-1)
                    }
                    
                }else{
                    alert('failed to like')
                }
            })
        } else {
            axios.post('/unlike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes-1)
                    setLikeAction('grey')
                    
                }else{
                    alert('failed to dislike')
                }
            })
        }
     }

     const onDislike = () =>{

        if(DislikeAction !== 'grey'){
            axios.post('/unDislike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikes(Dislikes-1)
                    setDislikeAction('grey')
                }else{
                    alert('failed to decrease dislike')
                }
            })
        } else {
            axios.post('/upDislike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikes(Dislikes+1)
                    setDislikeAction('white')
                    if(LikeAction!=='grey'){
                    setLikeAction('grey')
                    
                    setLikes(Likes-1)
                    }
                    
                }else{
                    alert('failed to increase dislike')
                }
            })
        }
     }
     console.log(LikeAction)
     let LikeStyle = {
        fill:'grey'
      };
      if(LikeAction==='white'){
        LikeStyle = {
            fill:'white'
          }
      }
      let DislikeStyle = {
        fill:'grey'
      };
      if(DislikeAction==='white'){
        DislikeStyle = {
            fill:'white'
          }
      }
     return (
         <React.Fragment>
             <span key="comment-basic-like">
                 <Tooltip title="Like">
                     < ThumbUpIcon
                     
                         
                         style={LikeStyle}
                         onClick={onLike} />
                 </Tooltip>
                 <span style={{ paddingLeft: '8px', cursor: 'auto',color:'white' }}>{Likes}</span>
             </span>&nbsp;&nbsp;
             <span key="comment-basic-dislike">
                 <Tooltip title="Dislike">
                     <ThumbDownIcon
                         
                         style={DislikeStyle}
                         onClick={onDislike}
                     />
                 </Tooltip>
                 <span style={{ paddingLeft: '8px', cursor: 'auto',color:'white' }}>{Dislikes}</span>
             </span>
         </React.Fragment>
     )
 }

 export default LikeDislikes