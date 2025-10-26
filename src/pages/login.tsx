import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import supabase  from '../helper/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/fonzoLogo.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Login successful!');
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="bg-[#0A0A0A]">
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="flex flex-row items-center mb-6 gap-4">
              <img src={Logo} width={100} alt="Fonzo Logo" className='rounded-full'/>
              <h3 className='text-white'>FONZO CLIBRATION</h3>
            </div>
            <form onSubmit={handleLogin}>
              <div className='flex flex-col gap-4'>
               <div>
                 <Label htmlFor="email" className="text-white">Email</Label>
                  <Input type="email" placeholder="Email" className="text-white" required
                  onChange={(e) => setEmail(e.target.value)} value={email} />
               </div>
               <div>
                 <Label htmlFor="password" className="text-white">Password</Label>
                  <Input type="password" placeholder="Password" className="text-white" required
                  onChange={(e) => setPassword(e.target.value)} value={password} />
               </div>
                <Button type="submit" className='hover:cursor-pointer'>Login</Button>
              </div>
            </form>
            {message && <p className="text-red-400 mt-2 ">{message}</p>}
      </section>
    </div>
  );
}
