import type { NextPage } from 'next'
import '../styles/MainPageStyle.module.css'

const Home: NextPage = () => {

  const uploadImage = (files) => {
    const formData = new FormData()
    formData.append('file' ,files[0])
    formData.append('upload_preset', 'ml_default')
    fetch('http://192.168.1.242:3001/sendImage',{
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
      body: formData})
  }
//'https://api.cloudinary.com/v1_1/imperatorofintellectualism/image/upload'
 return (
    <div>
  <img className="logo" src="https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1634738839/output-onlinepngtools_vck1vc.png" />
  <div className="mainPart">
    <div className="description">
      <span>Chanapp is an image board for GigaCHADS</span>
      <input type="file" onChange={(event)=>{uploadImage(event.target.files)}}/>
    </div>
    <div className="boardPicker">
      <table style={{width: '100%'}}>
        <tbody><tr>
            <th>Culture</th>
            <th>Hobbies</th>
            <th>Other</th>
          </tr>
          <tr>
            <td><a href="/Boards/anime">Anime</a></td>
            <td>Video Games</td>
            <td>Politics</td>
          </tr>
          <tr>
            <td>...</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </tbody></table>
    </div>
  </div>
</div>

 )
}

export default Home
