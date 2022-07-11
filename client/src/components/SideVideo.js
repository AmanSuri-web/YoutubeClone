import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { NavLink ,useHistory} from "react-router-dom";
import '../index.css'
function SideVideo(props) {

    const [SideVideos, setSideVideos] = useState([])
    const [views,setViews]=useState(0)
    useEffect(() => {
        axios.get('/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setSideVideos(response.data.videos)
                    
                } else {
                    alert('Failed to get Videos')
                }
            })
        

    }, [])

    const sideVideoItem = SideVideos.map(( video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);
        
       return <div className="sidevideo" style={{ display: 'flex'}}>
        <div style={{ width:'40%', marginRight:'1rem' ,position:'relative'}}>
            <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
                <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                <div className=" duration"
                    style={{ bottom: 30, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
            </a>
        </div>

        <div style={{ width:'50%' }}>
            <a href={`/video/${video._id}`} style={{ color:'gray',textDecoration:'none' }}>
                <span style={{ fontSize: '1rem', color: 'white' }}>{video.title}  </span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views} views</span><br />
               
            </a>
        </div>
        <hr/>
    </div>
    
    })

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem',borderStyle:' solid',borderColor:'white',borderBottom:'none',borderTop:'none',borderRight:'none' }}>
            {sideVideoItem}

            </div>
        </React.Fragment>
        
       
    )
}

export default SideVideo