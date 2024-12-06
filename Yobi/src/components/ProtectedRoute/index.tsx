import { useEffect, ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/hooks/ctx';

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { nickname } = useAuth(); // Verifica se o usuário está logado
  const router = useRouter();

  useEffect(() => {
    // Se o usuário não estiver logado, redireciona para a tela de autenticação
    if (!nickname) {
      router.push('/auth/auth');
    }
  }, [nickname]);

  if (!nickname) {
    return null;
  }

  return <>{children}</>;
}
