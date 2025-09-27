import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const ref = useRef()
    const passref = useRef();
    const [data, setdata] = useState([])
    const [form, setform] = useState({ url: '', username: '', password: '' })
    let passwords
    const showpassword = () => {

        if (ref.current.src.includes("/eye.png")) {
            ref.current.src = "/hidden.png"
            passref.current.type = "password"
        }
        else {
            passref.current.type = "text"
            ref.current.src = "/eye.png"
        }
    }
    const handlechange = (e) => {
        const v = e.target.value

        setform({ ...form, [e.target.name]: v })

    }
    const save = () => {
        if (form.url.trim() !== "" && form.username.trim() !== "" && form.password.trim() !== "") {
            console.log("not null")
            setdata([...data, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...data, { ...form, id: uuidv4() }]))
            setform({ url: '', username: '', password: '' })
        }
        else alert("All the fields are required")

    }
    useEffect(() => {
        passwords = localStorage.getItem("passwords")
        if (passwords) {
            setdata(JSON.parse(passwords))
        }
    }, [])
    const deleteall = () => {
        if (confirm(`Alert! click "Ok" if you want to delete all your saved passwords.`)) {
            setdata([])
            localStorage.removeItem("passwords")
        }

    }
    const copythis = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }
    const deleteone = (item) => {

        if (confirm("Are you sure to delete this entry?")) {
            const temp = []
            data.forEach(element => {
                if (element.id !== item.id) {
                    temp.push(element)
                    console.log(element.id)
                }
            });
            setdata(temp)
            localStorage.removeItem("passwords")
            localStorage.setItem("passwords", JSON.stringify(temp))

        }
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='flex flex-col items-center'>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className='flex flex-col items-center w-[50vw]  gap-[20px] my-4'>
                    <div className='font-[600] md:text-3xl text-[1.4rem] text-gray-700 flex '>
                        <p className=''>&lt;</p>
                        <p className='whitespace-nowrap '>Your own Password Manager</p>
                        <p className='text-green-400'>/&gt;</p>
                    </div>
                    <input type="text" required="true" spellCheck="false" className='text-[15px]  border border-green-200 py-[3px] px-[10px] rounded-[5px] bg-gray-100 w-[80vw] md:w-[35vw]' placeholder='Website name or URL' name="url" value={form.url} onChange={handlechange} />
                    <div className='flex md:flex-row flex-col justify-center items-center md:w-[50vw] w-[80vw] gap-[20px] text-[15px] '>
                        <input type="text" spellCheck="false" className='border border-green-200 py-[3px] px-[10px] rounded-[5px] bg-gray-100 md:w-[16vw] w-[80vw]' placeholder='Username or email' name="username" value={form.username} onChange={handlechange} />
                        <div>
                            <input type="password" ref={passref} spellCheck="false" className='relative border border-green-200 py-[3px] px-[10px] rounded-[5px] bg-gray-100 md:w-[16vw] w-[80vw]' placeholder='Password' name="password" value={form.password} onChange={handlechange} />
                            <div className='absolute md:right-[519px] right-[50px] md:top-[229px] top-[230px]'><img src="./hidden.png" ref={ref} onClick={showpassword} className='w-[20px] cursor-pointer' alt="" /></div>
                        </div>
                    </div>
                    <button className='bg-green-400 flex items-center ggap-[3px] px-[15px] py-[2px] rounded-[5px] hover:cursor-pointer hover:bg-green-500 ring-1 ring-black'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                        <p className='text-[12px] font-[600] ml-[7px] text-black' onClick={save}>Save</p>
                    </button>
                </div>
                {data.length === 0 && <div className='text-gray-400 font-[400] flex flex-col items-center'><p className='font-bold text-gray-400 text-[35px]'>Oops, Panda's empty</p>
                    <p>Time to let Panda save your passwords</p></div>}
                {data.length != 0 && <div className="list  flex flex-col items-center">
                    <div className='flex items-center relative'>
                        <p className='my-[15px] md:text-[30px] text-[20px] font-[600] text-gray-700'>Your Passwords</p>
                        <button onClick={deleteall} className='bg-white h-[25px] px-[7px] text-[12px] font-[600] text-red-500 rounded-[5px] absolute md:right-[-250px] right-[-90px] ring-1 ring-red-400 cursor-pointer'>Delete All</button>
                    </div>
                    <div className='max-w-[98vw] md:max-h-[40vh] max-h-[50vh] overflow-y-auto overflow-x-hidden w-fit'>
                        <table className="table-auto rounded-[5px] overflow-hidden md:min-w-[50vw] min-w-[98vw]">
                            <thead className='bg-gray-700 text-white '>
                                <tr className='h-[30px] md:text-[18px] text-[12px]'>
                                    <th className='px-4 py-2'>Website</th>
                                    <th className='px-4 py-2'>Username</th>
                                    <th className='px-4 py-2'>Password</th>
                                </tr>
                            </thead>
                            <tbody className='text-center text-gray-700 '>
                                {data.map(item => <tr className='bg-green-100 md:text-[14px] text-[0.5rem] md:font-[400] font-[600]  h-auto  border-x-2   border-b-2 border-white'>
                                    <td className='px-4 py-2 flex items-center justify-between gap-3.5 '><a href={item.url} target='_blank'><p className='text-center break-words md:max-w-[40vw] max-w-[17vw]'>{item.url}</p></a>

                                        <button className='ml-[-5px] cursor-pointer' onClick={() => copythis(item.url)}>
                                            <lord-icon
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </button>
                                    </td>
                                    <td className='px-4 py-2  '>
                                        <div className='flex justify-between items-center gap-3.5 '>
                                            <p className='text-center break-words md:max-w-[40vw] max-w-[17vw]'>{item.username}</p>
                                            <button className='ml-[-5px] cursor-pointer' onClick={() => copythis(item.username)}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </button>
                                        </div>
                                    </td>
                                    <td className='px-4 py-2 flex justify-between items-center gap-[15px]  '>
                                        <p className='text-center break-words md:max-w-[40vw] max-w-[10vw]'>{item.password}</p>
                                        <div className='flex gap-6'>
                                            <button className='cursor-pointer' onClick={(e) => deleteone(item)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/sxhqklqh.json"
                                                trigger="hover"
                                                stroke="light"
                                                colors="primary:#000000,secondary:#e83a30,tertiary:#16c72e"
                                                style={{ "width": "20px", "height": "20px" }}
                                            >
                                            </lord-icon>
                                        </button>
                                        <button className='ml-[-5px] cursor-pointer' onClick={() => copythis(item.password)}>
                                            <lord-icon
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </button>
                                        </div>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>}

            </div>
        </>
    )
}

export default Manager
