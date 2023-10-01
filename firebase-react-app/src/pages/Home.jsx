import { useRef } from 'react';
import { firestore } from '../Firebase';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';
import { useState, useEffect } from 'react';


const Home = () => {

    const messageRef = useRef();

    const [messages, setMessages] = useState([]);

    const moviesCollectionRef = collection(firestore, 'messages');

    useEffect(() => {                
        const unsub = onSnapshot(moviesCollectionRef, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                id: doc.id,
            });
            });
            setMessages(data);
        });
        return () => {
            unsub();
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            message: messageRef.current.value,
        }

        try {
            addDoc(moviesCollectionRef, data);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSave} className='form-control'>
                <label><h2>Enter Message</h2></label>
                <input type='text' ref={messageRef} placeholder='Enter Message...'/>
                <button type='submit'>Send</button>
            </form>
            <br></br>
            <div className='messages'>
                {messages.map((message) => (
                    <p>{message.id} : {message.message}</p>
                ))}
            </div>
        </div>
    );
};

export default Home