import React, { useState } from 'react'
import { FiPhoneCall } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        subject:"",
        message: "",
      });
      console.log(form)
    const [loading,setLoading]=useState(false)

    const handleChange=(e)=>{
        setForm({...form, [e.target.id]:e.target.value})
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        emailjs
          .send(
            "service_6f85opg",
            "template_mzy8pp8",
            {
              from_name: form.username,
              to_name: "Tanmaya Sahoo",
              from_email: form.email,
              to_email: "tanmayasahoo426813@gmail.com",
              message: form.message,
              subject:form.subject
            },
            "2jXLZvL48pbH8UtLS"
          )
          .then(
            () => {
              setLoading(false);
              alert("Thank You! I will get back to you as soon as possible");
              setForm({
                username: "",
                email: "",
                subject:"",
                message: "",
              });
            },
            (error) => {
              setLoading(false);
              console.error(error);
    
              alert("Ahh, something went wrong. Please try again.");
            }
          );
      };
    

  return (
    <div className='flex gap-10 flex-col'>
        <div 
        className='w-full h-[200px] text-white font-bold text-5xl text-center pt-14 '
        style={{backgroundImage:"url('https://www.pureco.shop/web/image/912119/contact%20uis.jpg')",
        backgroundColor:'rgba(0,0,0,0.4)',
        backgroundBlendMode:'darken'
        }}>CONTACT US</div>
        <div className='text-center '>
            <div className='text-4xl'>Get In Touch</div>
            <div className='text-sm pt-4 text-slate-600'>Get Fresh Food From The Market by Contacting Us</div>
        </div>
        <div className=' flex justify-around'>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <div><FiPhoneCall className='text-yellow-600 text-3xl font-semibold'/></div>
                <div className='font-semibold'>+91 8144362638</div>
                <div className='text-sm'>Call Us between 8AM and 11PM</div>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div ><LuMail  className='text-yellow-600 text-3xl font-semibold'/></div>
                <div className='font-semibold'>tanmayasahoo42681@gmail.com</div>
                <div className='text-sm'>Mail Us</div>
            </div>
        </div>
        <div className='flex justify-center flex-col items-center mb-5 gap-10'>
            <div>
                <div className='text-3xl text-center'>Write to Us</div>
                <div className='text-sm pt-4 text-slate-600'>Have you got any queries or feedback please write to us</div>
            </div>
            <form className='flex flex-col justify-center items-start  gap-5 w-1/2' onSubmit={handleSubmit}>
            <label>Enter your user name</label>
                <input
                  type="text"
                  id='username'
                  onChange={handleChange}
                  value={form.username}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Enter your Email</label>
                <input
                  type="text"
                  id='email'
                  onChange={handleChange}
                  value={form.email}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Topic of feedback you want to share with us</label>
                <input
                  type="text"
                  id='subject'
                  onChange={handleChange}
                  value={form.subject}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                />
                <label>Your Meaasge</label>
                <textarea
                  type="textarea"
                  id='message'
                  onChange={handleChange}
                  value={form.message}
                  className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                > </textarea>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-600 text-white text-center w-[150px] h-10  "
                >
                  Send Message
                </button>
            </form>
        </div>
    </div>
  )
}
