import { useState } from 'react'
import './App.css'
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Button from '@mui/material/Button';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
export default function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });
  const initialValues = {
    fullName: '',
    email: '',
  };
  const handleSubmit = (values) => {
    // Handle form submission here, e.g., send data to the server
    console.log('Form submitted with values:', values);
    setOpen(true)
  };
  const click=()=>{
    console.log(fileContent[0].JSON)
  }
  const [fileContent, setFileContent] = useState(null);
  const [json,setjson]=useState(true)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileName = selectedFile.name.toLowerCase();
    if (fileName.endsWith('.json')) {
      // It's likely a JSON file
      setjson(true)
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        setFileContent(JSON.parse(fileContent)); // Assuming it's a JSON file
      };

      reader.readAsText(selectedFile);
      console.log('File is a JSON file.');
    } else {
      setjson(false)
      console.log('File is not a JSON file.');
    }
      
      
    }
    
  }
  return(
    
    <div className='page'>
<div  className='main'>
<Stack direction={'row'} spacing={2} alignItems={'center'}>
<ArrowBackIcon/>
<p onClick={click} style={{fontSize:"3.5vh",fontWeight:"bold"}}>Submit form</p>
</Stack>
    <Formik
    initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={true} // Display errors on mount
      onSubmit={handleSubmit}>
    <Form>
    <Stack direction={"column"} spacing={4}>

        
        <label>Full Name</label>
          <Field
          placeholder="Full Name"
            type="text"
            label="Full Name"
            name="fullName"
            variant="outlined"
          />
                      <ErrorMessage name="fullName" component="div" className="error" />
        

                      <label>Full Name</label>

          <Field
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            placeholder="Email"
          />
                      <ErrorMessage name="email" component="div" className="error" />
        


                      <label>Upload JSON files</label>

    <div className='uploadbox'>
      <input onChange={handleFileChange} type='file' placeholder='Browse file'></input>
      
    </div>
    </Stack>
    <Stack direction={"column"} spacing={4}>

    {!json && <p style={{alignSelf:"center",color:"red"}}>Please select a JSON File</p>}
    <p style={{marginTop:"4vh"}}>File contents</p>
    <div className='filecontent'>{fileContent!==null && <p>{JSON.stringify(fileContent[0])}</p>}</div>
    <Button style={{ alignSelf:"center", width:"80%",bottom:"2vh",position:'absolute'}}  type="submit" variant="contained" color="primary">
          Submit
        </Button>
        </Stack>
      </Form>
    </Formik>
    
  
</div>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:'100%'}}>
          <div className='modal'>
            
              <CheckCircleOutlineRoundedIcon style={{height:"20vh",width:"30vw"}}/>
              <p style={{color:"dodgerblue"}}>Success</p>
              <p>524 entries successfully uploaded</p>
              <Button onClick={handleClose} variant='outlined'>Go to my entries</Button>
              <Button onClick={handleClose} variant='outlined'>Cancel</Button>

            
            </div>
          </div>
      </Modal>
</div>
  )
}
