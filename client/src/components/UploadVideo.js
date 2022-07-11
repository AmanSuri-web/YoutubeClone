import React, { useEffect ,useState} from 'react';
import { useHistory } from "react-router-dom";
import '../index.css'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';



const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label:'Private'},
    { value: 1, label:'Public'}
]

const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

const Upload = () => {
  
  const history = useHistory();
  
  const [id,setId]= useState({
   
  name:"",
  email:"",
  address:"",
  picture:"",
  
})
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

 
    
  const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration,setDuration]=useState("")
    const [Thumbnail,setThumbnail]=useState("")

    const handleChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
    }

    const onSubmit = (event) => {

        event.preventDefault();


        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "" ||
            Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: id,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        axios.post('/upload-video', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    history.push('/videos')
                } else {
                    alert('Failed to upload video')
                }
            })

    }

    const onDrop = ( files ) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('/uploadvideo', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    //gerenate thumbnail with this filepath ! 

                    axios.post('/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })


    }

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(Thumbnail)
    return (
        <>
           <div style={{background:'#151b1d',backgroundSize:'cover',height:'900px',position:'relative'}}>
            <div style={{ maxWidth: '700px',marginLeft:'auto',marginRight:'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} style={{color:'white'}}> Upload Video</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <AddIcon style={{fontSize:'100px',color:'white'}}/>

                            </div>
                        )}
                    </Dropzone>
                
                {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="..." />
                        </div>
                    }
                
            </div>

            <br /><br />
            <div style={{display:'grid'}}>
            <label style={{color:'white'}}>Title</label>
             <Input
                 onChange={handleChangeTitle}
                 value={title}
            /> 
            </div>
            <br /><br />
            <div style={{display:'grid'}}>
            <label style={{color:'white'}}>Description</label>
            <TextArea
                 onChange={handleChangeDecsription}
                 value={Description}
            /> 
            </div>
            <br /><br />

             <select onChange={handleChangeOne}>
                {Private.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select> 
            <br /><br />

             <select onChange={handleChangeTwo}>
                {Catogory.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select> 
            <br /><br />

             <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button> 

        </Form>
    </div>
                        
    </div>

        
        </>
    );
    
}

export default Upload;
