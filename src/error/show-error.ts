import { toast } from 'react-toastify';

export const showError = () => {
  toast.error('Файл не найден!', {
    autoClose: 5000,
    closeButton: true,
  });
};
