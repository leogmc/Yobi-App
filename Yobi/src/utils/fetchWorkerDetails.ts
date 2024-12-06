import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';

export async function fetchWorkerDetails(userId: string) {
  try {
    const docRef = doc(db, 'workers', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Worker data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No worker data found!');
      return null; // Sem dados
    }
  } catch (error) {
    console.error('Error fetching worker details:', error);
    throw error; // Propaga erro se necessário
  }
}
