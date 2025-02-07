import React, { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import  {UserInputContext }from '@/app/_context/UserInputContext'

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value
    }))
  }
  return (
    <div className='mx-20 lg:mx-44 justify-center'>
      <div className='mt-5'>
        <label>💡Write the topic for which you want to generate the Course</label>
        <Input
          onChange={(e) => handleInputChange('topic', e.target.value)}
          className='h-14 text-xl'
          defaultValue={userCourseInput?.topic}
          placeholder={'Topic'} />
      </div>

      <div className='mt-5'>
        <label>🔥Tell us more about your Course ,What do you want to include in the course</label>
        <Textarea
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className='h-24 text-xl'
          placeholder="About your Course" />
      </div>
    </div>
  )
}

export default TopicDescription
