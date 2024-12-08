import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { WorkerProps } from '@/src/@types/worker';

export const fetchWorkers = async (): Promise<WorkerProps[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'workers'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as WorkerProps[];
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    return [];
  }
};

