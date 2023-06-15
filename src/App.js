import {useState} from 'react';
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {auth, provider} from './FirebaseConfig';
import axios from 'axios'

function App() {

  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFacebookLogin=()=>{
    signInWithPopup(auth, provider).then((result)=>{
      setUser(result.user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      // fetch facebook graph api to get user actual profile picture
      fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
      .then((response)=>response.blob())
      .then((blob)=>{
        setProfilePicture(URL.createObjectURL(blob));
      })
      const user = result.user;

        if (user) {
          user
            .getIdToken()
            .then((idToken) => {
              const url = 'http://localhost:8080/home';
              const headers = { 'Content-Type': 'application/json' };
              const data = {
                query: `
                  mutation Mutation($data: IdToken) {
                    signInWithFacebook(data: $data) {
                      accessToken
                    }
                  }
                `,
                variables: {
                  data: {
                    idToken: idToken,
                  },
                },
              };

              axios
                .post(url, data, { headers })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
    }).catch((err)=>{
      console.log(err);
    })
  }

  const handleLogout=()=>{
    setUser(null);
  }

  return (
    <div className="wrapper">
      <div className='box'>
        {user?(
              <>
                <button className='btn btn-secondary btn-md'
                  onClick={handleLogout}>
                  LOGOUT
                </button>
                <h3>Welcome {user.displayName}</h3>
                <p>{user.email}</p>
                <div className='photo'>
                  <img src={profilePicture} alt="dp" referrerPolicy='no-referrer'/>
                </div>
              </>
            ):(
              <button className="btn btn-primary btn-md"
                onClick={handleFacebookLogin}>
                  Sign In With Facebook
              </button>
           )} 
      </div>
    </div>
  );
}

export default App;