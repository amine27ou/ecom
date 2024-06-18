import React from 'react'
import about from '../../assets/about.webp'
export default function About() {
  return (
    <div className='flex items-center h-[540px] flex-col md:flex-row w-full'>
      <div className='bg-gray-800 text-white p-10 w-2/3 '>
        <h1>The Story of Giovanni Menswear</h1>
        <p className='my-10'>
The Story of Giovanni Menswear
I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p>
<p className='my-10'>This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.</p>
      </div>
      <div className='w-1/3  hidden md:block'>
        <img src={about} />
      </div>
    </div>
  )
}
