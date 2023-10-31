import { useState } from 'react';
import './App.css';
import axios from 'axios';



function App() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  })

  const {name, email, password, passwordConfirm} = form;

  const {title, content} = postForm;

  const onChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }
  const handleChangePost = (e) => {
    const {name, value} = e.target;
    setPostForm({
      ...postForm,
      [name]: value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:3001/user/signup', {
      name,
      email,
      password,
      passwordConfirm
    });

    if(res.data.success){
      console.log('성공')
    } else {
      console.log('이미 존재하는 이메일')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:3001/user/login', {
      email,
      password
    })
    console.log(res);

    if(res.data.success){
      console.log('성공')
    } else {
      console.log('이미 존재하는 이메일')
    }
  }

  const handlePostUpload = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:3001/post', {
      title,
      content
    })
    console.log(res);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <div>이름 
        <input 
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
      </div>
      <div>이메일 
        <input 
          type="text"
          name="email"
          value={email}
          onChange={onChange}
        />
      </div>
      <div>비번 
        <input 
          type="text"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <div>비번 
        <input 
          type="text"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={onChange}
        />
      </div>
      <button type="submit">등록</button>
      </form>

      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input type="password" name='password' value={password} onChange={onChange}/>
        <button type="submit">로그인</button>
        </form>

        <h2>게시글</h2>
        <form onSubmit={handlePostUpload}>
          <input type="text" name='title'  value={title} onChange={handleChangePost}/>
          <input type="text" name='content' value={content} onChange={handleChangePost}/>
          <button type="submit">등록</button>
        </form>
    </div>

  );
}

export default App;
