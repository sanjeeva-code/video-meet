import { apiPost } from '@/lib/api_service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { registerFormSchema } from '@/schemas/register_form';

const bookingForm = {
  post: '/api/booking'
};

export const useBookingForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      number: '',
      location: '',
      message: ''
    },
    resolver: zodResolver(registerFormSchema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: any) => apiPost(bookingForm.post, data),
    onSuccess: () => {
      toast.success('Successfully register');
      queryClient.invalidateQueries({ queryKey: ['register'] });
      reset();
    },
    onError: () => {
      toast.error('Register failed');
      reset();
    }
  });

  return {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    mutateAsync,
    isPending,
    control
  };
};
