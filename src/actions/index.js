import db, { auth, provider, storage } from "../firebase";
import { store } from "../store";
import { setArticles, setLoadingStatus } from "../store/articleSlice";
import { setUser } from "../store/userSlice";
export const signInAPI = () => {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        console.log(payload);
        store.dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        store.dispatch(setUser());
      }
    });
  };
};
export const signOutAPI = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        console.log();
        store.dispatch(setUser(null));
      })
      .catch((error) => alert(error.message));
  };
};

export const postArticleAPI = (payload) => {
  return (dispath) => {
    store.dispatch(setLoadingStatus(true));
    if (payload.image !== "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress: ${progress}`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          console.log("sa")
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,
          });
          store.dispatch(setLoadingStatus(false));
        }
      );
    } else if (payload.video) {
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      store.dispatch(setLoadingStatus(false));
    }else{
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      store.dispatch(setLoadingStatus(false));

    }
  };
};

export function getArticlesAPI(){
  return(dispatch)=>{
    let payload;
    db.collection("articles").orderBy("actor.date","desc").onSnapshot((snapshot)=>{

      payload = snapshot.docs.map((doc)=>doc.data())
      store.dispatch(setArticles(payload))
    })
  }
}
