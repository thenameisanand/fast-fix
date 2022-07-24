import React,{useState,useEffect} from 'react'
import {storage,db} from './firebase'
import { useParams } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
export const AdminAddService = () => {
  const history = useHistory();
  const { categoryId } = useParams();    const [title, setTitle]=useState('');
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription]=useState('');
    const [price, setPrice]=useState('');
    const [image, setImage]=useState(null);

    const [imageError, setImageError]=useState('');
    
    const [successMsg, setSuccessMsg]=useState('');
    const [uploadError, setUploadError]=useState('');

    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    
    useEffect(() => {
      if (categoryId) {
        db.collection("categories")
          .doc(categoryId)
          .onSnapshot((snapshot) => setCategoryName(snapshot.data()));
      }
    });
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }
    const viewService = (categoryId) => {
      if (categoryId) {
        history.push(`/adminviewservice/${categoryId}`);
      }
    };
    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(src=>{
              if (categoryId) {
                db.collection('services')
                .add({
                  title,
                  description,
                  price: Number(price),
                  src
                })
              db.collection('categories')
              .doc(categoryId)
              .collection('services')
              .add({
                    title,
                    description,
                    price: Number(price),
                    src,
                    category: categoryId,
                }).then(()=>{
                    setSuccessMsg('Product added successfully');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },20)
                }).catch(error=>setUploadError(error.message));
         } })
        })
    }
  
    return (
      <div className="addService">
      <div className="adminPage__container">
        <AdminSidebar />
        <div className="adminPage__Right">
          <div className="Right__above">
            <h4>
              <input type="text" placeholder="Search"></input>
            </h4>
            <h4>Sign In</h4>
          </div>
          <div className="adminCategoryRight__below">
            <div className="Right__belowOneCategory">
              <div className="belowOneCategory__heading">
                <h4>Add Service </h4>
              </div>
              <div className="belowOneCategory__inputs">
                <div className="inputs__details">
                  <h1> {categoryName?.name}</h1>
                  {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
<form>
              <input type="text" placeholder='Enter service name' className='form-control' required
                onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                    
 
                    <input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input>                 
                  {imageError&&<>
                    <br></br>
                    <div className='error-msg' style={{color: 'red',marginLeft: '20px',marginTop: '10px', fontFamily: 'monospace'}}>{imageError}</div>
                   
                </>}
                  </form>
                  <div className="inputs__detailsTwo">
                    <form>
                     
                      <input type="text" placeholder='Enter service description' className='form-control' required
                onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                    </form>
                    {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>}
                  </div>
                  <Button type="submit" className='btn btn-success btn-md' onClick={handleAddProducts}>
                        ADD SERVICE
                    </Button>                
                  <Button
                    onClick={() => {
                      viewService(categoryId);
                    }}
                  >
                    View All Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default AdminAddService;
