import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './SideVideo';
import LikeDislike from './LikeDislike';

function DetailVideoPage(props) {

    const history=useHistory()
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [id,setId]=useState({
        name:"",
    email:"",
    address:"",
    picture:"",
    })
    const videoVariable = {
        videoId: videoId
    }
    const callAboutPage = async () => {
        try {
          const res = await fetch("/video-upload", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data = await res.json();
          
          setId(data)
          
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      };
    useEffect(() => {
        callAboutPage()
        
        axios.post('/getVideo', videoVariable)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.video)
                setVideo(response.data.video)
            } else {
                alert('Failed to get video Info')
            }
        })
    }, [])


    return (
        <div style={{background:'#151b1d',backgroundSize:'cover',height:'1200px',position:'relative'}}>
        <Row>
                <Col lg={18} xs={24}>
                
        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            <video style={{ width: '100%',height:'500px',width:'1000px' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

            <List.Item
                actions={[]}
            >
                <List.Item.Meta

                    avatar={<img src={Video.writer && `/upload/${Video.writer.picture}`} style={{height:'70px',width:'70px'}}/>}
                    
                />
               <LikeDislike videoId={videoId} userId={id.name}/>
            </List.Item>
            
            <h5 style={{color:'white'}}>{Video.title} </h5><br />
            <span style={{color:'white'}}>{Video.views} views</span><br />
            <span style={{color:'white'}}>{Video.description} </span><br />
        </div>
       
       
        </Col>
                <Col lg={6} xs={24}>
    
                    <SideVideo views={Video.views} id={videoId}/>
    
                </Col>
            </Row>
            </div>
    )
}

export default DetailVideoPage