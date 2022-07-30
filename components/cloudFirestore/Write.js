import { db } from '../../firebase/initFirebase'
import { collection, doc, setDoc } from "firebase/firestore"; 


const WriteToCloudFirestore = () => {
    const sendData = async () => {
        try {
            const posiitrack = collection(db, "posiitrack");
            await setDoc(doc(posiitrack, "a"), {
                day: 25,
                tasksCompleted: 15,
                totalTasks: 25
            })
            .then(alert('Data was successfully sent to cloud firestore!'))

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
<button onClick={sendData}>Send to Database</button>
    )
    
}


export default WriteToCloudFirestore;




