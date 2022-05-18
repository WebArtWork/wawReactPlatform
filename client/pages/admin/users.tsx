import type { NextPage } from 'next'
import Navbar from '../../components/Navbar/Navbar'

const Home: NextPage = () => {
  return (
    <div className='w-card _pd'>
      <Navbar />
      <h1>Admin Users</h1>
    </div>

  )
}

export default Home
