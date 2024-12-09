import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import {AlertBox, AlertContainer, AlertMessage} from './styles';

interface TemporaryAlertProps {
  visible: boolean;
  message: string;
  duration?: number;
  onClose: () => void;
}

const TemporaryAlert: React.FC<TemporaryAlertProps> = ({
  visible,
  message,
  duration = 2000,
  onClose,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <AlertContainer>
        <AlertBox>
          <AlertMessage>{message}</AlertMessage>
        </AlertBox>
      </AlertContainer>
    </Modal>
  );
};

export default TemporaryAlert;
