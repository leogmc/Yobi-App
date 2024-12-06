import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';

export async function fetchUserDetails(userId: string) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('User data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No User data found!');
      return null; // Sem dados
    }
  } catch (error) {
    console.error('Error fetching User details:', error);
    throw error; // Propaga erro se necessário
  }
}