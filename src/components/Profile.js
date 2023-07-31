import React, {useState} from 'react'
import { Dialog } from 'primereact/dialog';
import {InputText} from "primereact/inputtext"
import img from "../images/dp.jpeg"
import Avatar from "react-avatar-edit";
import {Button} from "primereact/button"

const Profile = () => {
    const [imagecrop,setimagecrop] = useState (false);
    const [image,setimage] = useState("");
    const [src,setsrc] = useState (false);
    const [profile,setprofile] = useState([]);
    const [pview,setpview] = useState(false);

    const profileFinal = profile.map((item) => item.pview);

    const onClose =() => {
        setpview(null);
    };

    const onCrop = (view) => {
        setpview(view);
    };

    const saveCropImage =() => {
        setprofile([...profile, {pview}]);
        setimagecrop(false);
    };
    return (
        <div>
            <div className='profile_img text-left p-4'>
                <div className='flex flex-column justify-content-left align-items left'>

                    <img 

                        style={{
                            margin:"20px",
                            width:"80px",
                            height:"80px",
                            borderRadius:"50%",
                            objectFit:"cover",
                            border:"2px solid black",
                        }}
                        onClick={() => setimagecrop(true)}
                        src={profileFinal.length ? profileFinal : img} alt=""
                    />
                    <label htmlFor='' className='mt-3 font-semibold text-5xl'></label>
                    <Dialog
                    visible={imagecrop}
                    header={() => (
                        <p htmlFor="" className='text-2xl font-semibold textColor'>
                            Update Profile
                        </p>
                    )}
                    onHide={() => setimagecrop(false)}

                    >
                    <div className='confirmation-content flex flex-column align-items-left'>
                        <Avatar 
                            width ={500}
                            height ={400}
                            onCrop={onCrop}
                            onClose ={onClose}
                            src = {src}
                            shadingColor={"#474649"}
                            backgroundColor={"#474649"}
                        />
                        <div className='flex flex-column align-items-center mt-5 w-12'>
                            <div className='flex jsutify-content-around w-12 mt-4'>
                                <Button
                                    onClick={saveCropImage}
                                    label='Save'
                                    icon="pi pi-check"
                                />
                            </div>
                        </div>
                    </div>
                    </Dialog>
                        <InputText 
                            type="file"
                            accept = '/image/*'
                            style={{display:"none"}}

                            onChange={(event) => {
                                const file = event.target.files[0];
                                if(file && file.type.substring(0.5) === "image") {
                                    setimage(file)
                                    }else {
                                        setimage(null)
                                    }
                                }}
                            />

                    </div>
                </div>
            </div>
    );
};

export default Profile