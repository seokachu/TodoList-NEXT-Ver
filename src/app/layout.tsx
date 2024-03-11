import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TodoContainer from '@/components/todos/TodoContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My TodoList',
  description: '투두리스트, my todo list',
};

export default function RootLayout() {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <TodoContainer />
        <Footer />
      </body>
    </html>
  );
}
