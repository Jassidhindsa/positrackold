import { db } from '../../firebase/initFirebase'
import { doc, getDoc } from "firebase/firestore"; 

const ReadToCloudFirestore = () => {

    const readData = async () => {
        const docRef = doc(db, "posiitrack", "tasksList");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log(docSnap.data().name);
          localStorage.setItem("taskName",docSnap.data().name);
        } else {
          // doc.data() will be undefined in this case
          alert("No such document!");
        }
    }

    return (
        <div onLoad={readData}>Read</div>
    )
}





export default ReadToCloudFirestore;